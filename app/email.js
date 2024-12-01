import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Icons from 'react-native-vector-icons/AntDesign';
import { commonStyles, FONTS, SIZES } from './styles';

export default function Email() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const arrowLeft = <Icons name="arrowleft" size={24} color="#697565" />;
    const user = <Icons name="user" size={20} color="#888" />;

    const handleEmailChange = (text) => {
        setEmail(text); x
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleContinue = () => {
        if (validateEmail(email)) {
            // Geçerli email ise ileriye git
            router.push('/nameSurname');
        } else {
            // Hata mesajı göster ve geçişi engelle
            Alert.alert('Geçersiz Email', 'Lütfen geçerli bir email adresi girin.');
        }
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            {/* Geri dön, ilerleme çubuğu, e-postanı gir başlığı */}
            <View style={commonStyles.tabHeader}>
                <TouchableOpacity onPress={() => router.back()}>
                    {arrowLeft}
                </TouchableOpacity>
                <View>
                    <View style={commonStyles.progressContainer}>
                        <View style={commonStyles.progressBar}>
                            <View style={commonStyles.progressIndicator}></View>
                        </View>
                    </View>
                    <Text style={FONTS.h1}>E-postanızı girin</Text>
                </View>
            </View>

            {/* E-posta girme alanı */}
            <View style={commonStyles.inputContainer}>
                <Text style={styles.labelText}>Mail adresi</Text>
                <View style={styles.emailInputContainer}>
                    {user}
                    <TextInput
                        style={styles.input}
                        placeholder="E-posta adresinizi girin"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={handleEmailChange}
                    />
                </View>
            </View>
            {/* Üye ol ve hesabım var linkleri */}
            <View style={styles.linkContainer}>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={handleContinue}
                >
                    <Text style={commonStyles.buttonText}>Üye ol</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => router.push('/login')}
                >
                    <Text style={commonStyles.buttonText}>Zaten bir hesabım var</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    labelText: {
        marginBottom: 10,
        color: '#555',
        fontSize: 16,
    },
    emailInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    linkContainer: {
        gap: 16,
    },
});