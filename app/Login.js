import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import Icons from 'react-native-vector-icons/AntDesign';
import Icons2 from 'react-native-vector-icons/Feather';
import { useRouter } from "expo-router";
import Logo from '../assets/CANAKKALE.svg';
import { COLORS, commonStyles, FONTS, SIZES } from './Styles';


export default function Login() {
    const router = useRouter();
    // Kullanıcı bilgileri (örnek)
    const userInfo = {
        email: 'ahmet@gmail.com',
        password: 123456,
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Giriş yap fonksiyonu
    const handleLogin = () => {
        // Kullanıcı bilgileri doğruysa anasayfaya yönlendirme
        if (email === userInfo.email && parseInt(password) === userInfo.password) {
            router.push('/Home');
            // Eğer bilgiler yanlışsa hata mesajı gösterme
        } else {
            Alert.alert('Oops', 'E-posta veya şifre hatalı!',
                [{ text: 'Tamam' },
                {
                    // Şifremi unuttum kismi
                    text: 'Şifremi Unuttum',
                    onPress: () => router.push('./ForgotPassword'), // sifremi unuttum sayfasina yonlendirme
                }]
            );
        }
    };

    return (

        <SafeAreaView style={commonStyles.containerRegister}>
            <ScrollView >
                {/* giriş yap yazısı ve logo */}
                <View style={commonStyles.tabHeaderLogin}>
                    <Text style={FONTS.h1}>Giriş Yap</Text>
                    <Logo width={100} height={100} />
                </View>

                {/* Giriş bilgileri alanları */}
                <View style={commonStyles.inputContainer}>
                    <Text style={[commonStyles.labelText, FONTS.body]}>E-posta</Text>
                    <View style={commonStyles.inputWrapper}>
                        <Icons name="user" size={20} color="#888" />
                        <TextInput
                            style={commonStyles.input}
                            placeholder="E-posta adresinizi girin"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <Text style={[commonStyles.labelText, FONTS.body]}>Şifre</Text>
                    <View style={commonStyles.inputWrapper}>
                        <Icons name="lock" size={20} color="#888" />
                        <TextInput
                            style={commonStyles.input}
                            placeholder="Şifrenizi girin"
                            placeholderTextColor="#999"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icons2
                                name={showPassword ? "eye" : "eye-off"}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Şifremi Unuttum Linki */}
                    <TouchableOpacity style={commonStyles.alignRight} onPress={() => router.push('./ForgotPassword')}>
                        <Text style={[FONTS.smallBody, { color: COLORS.primary }]}>Şifremi Unuttum</Text>
                    </TouchableOpacity>
                </View>

                {/* Giriş Yap Butonu */}
                <TouchableOpacity
                    style={[
                        commonStyles.button,
                        (email && password) ? commonStyles.activeButton : commonStyles.inactiveButton
                    ]}
                    onPress={handleLogin}
                    disabled={!(email && password)}
                >
                    <Text style={commonStyles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>

                {/* Kayıt Ol Linki */}
                <Text style={{ textAlign: "center", fontSize: 14, marginBottom: SIZES.base }}>Henüz bir hesabın yok mu?</Text>
                <TouchableOpacity style={commonStyles.button} onPress={() => router.push("/Email")}>
                    <Text style={commonStyles.buttonText}> Kayıt Ol</Text>
                </TouchableOpacity>

                {/* gmail ile giris eklenecek */}

            </ScrollView>
        </SafeAreaView>
    );
}