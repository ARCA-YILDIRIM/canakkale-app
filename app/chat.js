import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icons2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, FONTS } from './styles';
import ButtonTab from '../components/ButtonTab';
import axios from 'axios';
import { tabStyles } from './stylesTab';

// Gemini API için arayüz
const geminiApi = {
    apiKey: 'AIzaSyA-hzjRwvYoWqQabRtOKM-LhWsURlb7OYw', // Gerçek bir API anahtarı ile değiştirilmeli
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    
    generateContent: async (prompt, context = []) => {
        try {
            const response = await axios.post(
                `${geminiApi.baseUrl}?key=${geminiApi.apiKey}`,
                {
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                }
            );
            
            if (response.data && 
                response.data.candidates && 
                response.data.candidates[0] && 
                response.data.candidates[0].content && 
                response.data.candidates[0].content.parts && 
                response.data.candidates[0].content.parts[0]) {
                return response.data.candidates[0].content.parts[0].text;
            }
            
            return "Üzgünüm, yanıt oluşturulamadı. Lütfen tekrar deneyin.";
        } catch (error) {
            console.error('Gemini API Error:', error.response?.data || error.message);
            throw new Error("API ile iletişim kurulurken bir hata oluştu.");
        }
    }
};

// Çanakkale rehberi için sistem talimatları
const SYSTEM_INSTRUCTIONS = `
Sen bir Çanakkale şehir rehberi yapay zeka asistanısın. Adın "ÇanakkaleGPT".
Görevin kullanıcılara Çanakkale'nin tarihi, kültürel ve turistik değerleri hakkında bilgi vermek.

Bilmen gerekenler:
1. Çanakkale'nin tarihi: Troya, Gelibolu, Çanakkale Savaşları, Anadolu uygarlıkları
2. Turistik yerler: Truva Antik Kenti, Gelibolu Yarımadası Tarihi Milli Parkı, Çanakkale Şehitliği, Kilitbahir Kalesi, Asos
3. Adalar: Bozcaada, Gökçeada
4. Yerel mutfak: Peynir helvası, Ezine peyniri, çırpma, Bozcaada şarapları
5. Ulaşım bilgileri, konaklama önerileri, etkinlikler

Yanıtlarında daima nazik, bilgilendirici ve özlü ol.
Çanakkale dışındaki konularda soru sorulursa, kibarca konuyu Çanakkale'ye bağlamaya çalış.
`;

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const flatListRef = useRef(null);

    // Sık sorulan sorular listesi
    const frequentQuestions = [
        { id: '1', text: 'Çanakkale\'de gezilecek yerler', icon: 'place' },
        { id: '2', text: 'Truva Antik Kenti hakkında bilgi', icon: 'museum' },
        { id: '3', text: 'Bozcaada\'ya nasıl gidilir?', icon: 'terrain' },
        { id: '4', text: 'Çanakkale\'nin meşhur yemekleri', icon: 'restaurant' },
    ];

    // Uygulama başladığında karşılama mesajı
    useEffect(() => {
        const welcomeMessage = {
            id: Date.now(),
            text: "Merhaba! Ben ÇanakkaleGPT, Çanakkale'nin tarihini, kültürünü ve gezilecek yerlerini keşfetmenize yardımcı olmak için buradayım. Bana istediğiniz soruyu sorabilirsiniz!",
            sender: 'ai'
        };
        setMessages([welcomeMessage]);
    }, []);

    const handleQuestionPress = (question) => {
        const newMessage = {
            id: Date.now(),
            text: question.text,
            sender: 'user'
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        sendMessageToAI(question.text);
    };

    // Gemini API'ye mesaj gönderme fonksiyonu
    const sendMessageToAI = async (message) => {
        setIsLoading(true);
        try {
            // Önceki mesajları topla
            const messageHistory = messages
                .map(msg => `${msg.sender === 'user' ? 'Kullanıcı' : 'ÇanakkaleGPT'}: ${msg.text}`)
                .join('\n');
            
            // Sistem talimatları + geçmiş + yeni soru ile birlikte prompt oluştur
            const fullPrompt = `${SYSTEM_INSTRUCTIONS}\n\nKONUŞMA GEÇMİŞİ:\n${messageHistory}\n\nKullanıcı: ${message}\n\nÇanakkaleGPT:`;
            
            // Gemini API'ye gönder
            const response = await geminiApi.generateContent(fullPrompt);
            
            // Yanıtı mesajlara ekle
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: Date.now() + 1,
                    text: response,
                    sender: 'ai'
                }
            ]);
        } catch (error) {
            console.error('AI Error:', error);
            
            // Hata durumunda kullanıcıya bildir
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: Date.now() + 1,
                    text: "Üzgünüm, bir sorun oluştu. Lütfen tekrar deneyin veya internet bağlantınızı kontrol edin.",
                    sender: 'ai'
                }
            ]);
            
            Alert.alert(
                "Bağlantı Hatası", 
                "Yapay zeka servisine bağlanırken bir hata oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        if (inputText.trim() === '') return;
        const newMessage = {
            id: Date.now(),
            text: inputText.trim(),
            sender: 'user'
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputText('');
        sendMessageToAI(inputText.trim());
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        // Burada gerçek ses kaydı entegrasyonu yapılabilir
        if (isRecording) {
            Alert.alert(
                "Ses Tanıma",
                "Ses tanıma özelliği yakında eklenecek!"
            );
        }
    };

    const handleAttachment = () => {
        Alert.alert(
            "Görsel Tanıma",
            "Fotoğraf ile soru sorma özelliği yakında eklenecek!"
        );
    };

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.messageContainer,
                item.sender === 'user' ? styles.userMessage : styles.aiMessage
            ]}
        >
            {item.sender === 'ai' && (
                <View style={styles.aiAvatar}>
                    <Icons2 name="robot" size={24} color={COLORS.primary} />
                </View>
            )}
            <View
                style={[
                    styles.messageBubble,
                    item.sender === 'user' ? styles.userBubble : styles.aiBubble
                ]}
            >
                <Text style={[
                    styles.messageText,
                    item.sender === 'user' && styles.userMessageText
                ]}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <View style={tabStyles.container}>
            <View style={styles.mainContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.aiLogoContainer}>
                            <Icons2 name="robot" size={32} color={COLORS.primary} />
                        </View>
                        <Text style={styles.headerTitle}>ÇanakkaleGPT</Text>
                        <TouchableOpacity style={styles.settingsButton}>
                            <Icons name="settings" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Sık Sorulan Sorular */}
                <ScrollView horizontal style={styles.questionsContainer} showsHorizontalScrollIndicator={false}>
                    {frequentQuestions.map(question => (
                        <TouchableOpacity
                            key={question.id}
                            style={styles.questionButton}
                            onPress={() => handleQuestionPress(question)}
                        >
                            <Icons name={question.icon} size={20} color={COLORS.primary} />
                            <Text style={styles.questionText}>{question.text}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Chat Mesajları */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.messagesList}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                />

                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={COLORS.primary} />
                        <Text style={styles.loadingText}>ÇanakkaleGPT düşünüyor...</Text>
                    </View>
                )}

                {/* Input Alanı */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachButton} onPress={handleAttachment}>
                        <Icons name="photo-camera" size={24} color={COLORS.text} />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Çanakkale hakkında bir şey sorun..."
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />

                    {inputText.length > 0 ? (
                        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                            <Icons name="send" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.sendButton, isRecording && styles.recordingButton]}
                            onPress={toggleRecording}
                        >
                            <Icons name={isRecording ? "stop" : "mic"} size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Bottom Tab */}
            <View style={styles.bottomTabContainer}>
                <View style={styles.bottomTabContent}>
                    <ButtonTab icon="home" address="home" />
                    <ButtonTab icon="explore" address="explore" iconType='Icons' />
                    <ButtonTab icon="chat" address="chat" />
                    <ButtonTab icon="map" address="map" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingBottom: 60, // Bottom tab için alan bırakıyoruz
    },
    header: {
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingTop: Platform.OS === 'ios' ? 40 : 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
    },
    aiLogoContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        ...FONTS.h2,
        color: COLORS.text,
    },
    settingsButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionsContainer: {
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        flexGrow: 0,
    },
    questionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: SIZES.base,
        borderRadius: SIZES.radius,
        marginRight: SIZES.base,
    },
    questionText: {
        marginLeft: 8,
        color: COLORS.text,
        fontSize: 14,
    },
    messagesList: {
        padding: SIZES.padding,
        paddingBottom: 80, // Mesajların input alanının arkasına gitmemesi için
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: SIZES.base,
        alignItems: 'flex-end',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    aiMessage: {
        justifyContent: 'flex-start',
    },
    messageBubble: {
        maxWidth: '80%',
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
    },
    userBubble: {
        backgroundColor: '#E3F2FD',
        borderBottomRightRadius: 0,
    },
    aiBubble: {
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 0,
        borderWidth: 1,
        borderColor: '#eee',
    },
    messageText: {
        fontSize: 16,
        color: COLORS.text,
        lineHeight: 22,
    },
    userMessageText: {
        color: '#000',
    },
    aiAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.base,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.base,
    },
    loadingText: {
        marginLeft: SIZES.base,
        color: COLORS.text,
    },
    inputContainer: {
        position: 'absolute',
        bottom: 70, // Bottom tab için boşluk bırakıyoruz
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        alignItems: 'center',
    },
    attachButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: SIZES.radius,
        padding: SIZES.base,
        marginHorizontal: SIZES.base,
        maxHeight: 100,
    },
    sendButton: {
        width: 44,
        height: 44,
        backgroundColor: COLORS.primary,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordingButton: {
        backgroundColor: 'red',
    },
    bottomTabContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    bottomTabContent: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        paddingVertical: 5,
    },
});