import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import Icons from 'react-native-vector-icons/AntDesign';
import Icons2 from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PageHeader from '../components/PageHeader';

export default function Password() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: '',
        fullName: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [registerMessage, setRegisterMessage] = useState('');

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
        match: false
    });

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            const [email, fullName] = await Promise.all([
                AsyncStorage.getItem('email'),
                AsyncStorage.getItem('fullName')
            ]);

            if (!email || !fullName) {
                Alert.alert(
                    'Eksik Bilgi',
                    'Email veya isim bilgisi eksik. Lütfen kayıt işlemini baştan başlatın.',
                    [{ text: 'Tamam', onPress: () => router.replace('/email') }]
                );
                return;
            }

            setUserInfo({
                email,
                fullName
            });
        } catch (error) {
            console.error('Kullanıcı bilgileri alınamadı:', error);
            Alert.alert('Hata', 'Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyin.');
            router.replace('/email');
        }
    };

    const validatePassword = (pass, confirmPass) => {
        const validations = {
            length: pass.length >= 8,
            lowercase: /[a-z]/.test(pass),
            uppercase: /[A-Z]/.test(pass),
            number: /[0-9]/.test(pass),
            specialChar: /[+-.,]/.test(pass),
            match: pass === confirmPass && pass.length > 0
        };
        setPasswordValidations(validations);
        return Object.values(validations).every(val => val === true);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        validatePassword(text, confirmPassword);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        validatePassword(password, text);
    };

    const handleRegister = async () => {
        if (!Object.values(passwordValidations).every(val => val === true)) {
            Alert.alert('Hata', 'Lütfen tüm şifre kurallarını karşılayın.');
            return;
        }

        if (!userInfo.email || !userInfo.fullName) {
            Alert.alert('Hata', 'Kullanıcı bilgileri eksik. Lütfen kayıt işlemini baştan başlatın.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('https://canakkale-guide-backend.vercel.app/users/register', {
                email: userInfo.email,
                fullName: userInfo.fullName,
                password: password
            });

            console.log('Register response:', response.data); // Debug için
            if (response.status === 201) {
                try {
                    // Storage işlemlerini yap
                    console.log(response.status); // Debug için
                    await Promise.all([
                        AsyncStorage.removeItem('email'),
                        AsyncStorage.removeItem('fullName')
                    ]);

                    console.log('Storage işlemleri tamamlandı'); // Debug için

                    // Loading'i kapat ve yönlendir
                    setIsLoading(false);
                    setRegisterMessage('Kayıt işlemi başarılı  ');
                    setTimeout(() => {
                        console.log('Login sayfasına yönlendiriliyor...'); // Debug için
                        console.log(registerMessage); // Debug için
                        router.replace('login');
                        // router.push('login');
                    }, 1000);
                } catch (storageError) {
                    setRegisterMessage('Kayıt işlemi başarısiz oldu. Lütfen giris sayfasindan baslayarak tekrar deneyin.');
                    console.error('Storage error:', storageError);
                    setIsLoading(false);
                }
            }
        } catch (error) {
            let errorMessage = 'Kayıt işlemi sırasında bir hata oluştu.';

            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;

                if (error.response.status === 409) {
                    errorMessage = 'Bu email adresi zaten kayıtlı.';
                } else if (error.response.status === 400) {
                    errorMessage = 'Geçersiz bilgiler. Lütfen bilgilerinizi kontrol edin.';
                }
            } else if (error.request) {
                errorMessage = 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.';
            }

            console.error('Kayıt hatası:', error);
            Alert.alert('Kayıt Hatası', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* UST KISIM Component */}
                <PageHeader headerText="Şifrenizi oluşturun" progressIndicatorState="progressIndicator75" />
                {/* Şifre girme alanları */}
                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Şifre</Text>
                    <View style={styles.passwordInputContainer}>
                        <Icons name="lock" size={20} color="#888" />
                        {/* alt satirda şifre inputu alinacak */}
                        <TextInput
                            style={styles.input}
                            placeholder="Şifrenizi girin"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            secureTextEntry={!showPassword} // şifreyi gizlemek için
                            value={password} // girilen şifre password değişkenine atanır
                            onChangeText={handlePasswordChange} // her harf girildiğinde çalışacak fonksiyon
                        />
                        {/* şifreyi göster/gizle butonu */}
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icons2
                                name={showPassword ? "eye" : "eye-off"}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.labelText}>Şifreyi Doğrula</Text>
                    <View style={styles.passwordInputContainer}>
                        <Icons name="lock" size={20} color="#888" />
                        <TextInput
                            style={styles.input}
                            placeholder="Şifrenizi tekrar girin"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={handleConfirmPasswordChange}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Icons2
                                name={showConfirmPassword ? "eye" : "eye-off"}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>

                    {registerMessage &&
                        <Text style={{ color: "green", margin: 5, fontSize: 30, textAlign: "center" }}>
                            {registerMessage}
                            <Icons name={"checkcircle"} color="#green" size={30} />
                        </Text>
                    }

                    {/* Şifre Kuralları */}
                    <View style={styles.validationContainer}>
                        <Text style={styles.validationTitle}>Şifre Kuralları:</Text>
                        <View style={styles.validationRules}>
                            <Text style={[
                                styles.validationText,
                                passwordValidations.length ? styles.validRule : styles.invalidRule
                            ]}>
                                • En az 8 karakter
                            </Text>
                            <Text style={[
                                styles.validationText,
                                passwordValidations.lowercase ? styles.validRule : styles.invalidRule
                            ]}>
                                • En az bir küçük harf
                            </Text>
                            <Text style={[
                                styles.validationText,
                                passwordValidations.uppercase ? styles.validRule : styles.invalidRule
                            ]}>
                                • En az bir büyük harf
                            </Text>
                            <Text style={[
                                styles.validationText,
                                passwordValidations.number ? styles.validRule : styles.invalidRule
                            ]}>
                                • En az bir rakam
                            </Text>
                            <Text style={[
                                styles.validationText,
                                passwordValidations.specialChar ? styles.validRule : styles.invalidRule
                            ]}>
                                • En az bir özel karakter
                            </Text>
                            <Text style={[
                                styles.validationText,
                                passwordValidations.match ? styles.validRule : styles.invalidRule
                            ]}>
                                • Şifreler eşleşiyor
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Devam et butonu */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            Object.values(passwordValidations).every(val => val === true)
                                ? styles.activeButton
                                : styles.inactiveButton
                        ]}
                        onPress={handleRegister}
                        disabled={!Object.values(passwordValidations).every(val => val === true) || isLoading}
                    >
                        <Text style={styles.buttonText}>
                            {isLoading ? 'Kayıt Yapılıyor...' : 'Hesabımı Oluştur'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    tabHeader: {
        paddingTop: 20,
        marginBottom: 40,
    },
    progressContainer: {
        marginTop: 16,
    },
    progressBar: {
        height: 10,
        backgroundColor: "#D0D5DD",
        borderRadius: 9999,
        overflow: 'hidden',
    },
    progressIndicator: {
        height: '100%',
        width: '75%',
        backgroundColor: "#3B82F6",
    },
    headerText: {
        fontSize: 32,
        fontWeight: '700',
        marginTop: 16,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    labelText: {
        marginBottom: 10,
        color: '#555',
        fontSize: 16,
    },
    passwordInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    validationContainer: {
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
    },
    validationTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    validationRules: {
        flexDirection: 'column',
    },
    validationText: {
        marginBottom: 5,
        fontSize: 14,
    },
    validRule: {
        color: '#28a745',
    },
    invalidRule: {
        color: '#dc3545',
    },
    buttonContainer: {
        marginTop: 20,
    },
    continueButton: {
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#3B82F6',
    },
    inactiveButton: {
        backgroundColor: '#D1D5DB',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});