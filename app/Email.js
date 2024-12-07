import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Icons from 'react-native-vector-icons/AntDesign';
import { commonStyles, FONTS, SIZES } from './Styles';
import PageHeader from '../components/PageHeader';

export default function Email() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Hata mesajını saklamak için state
    const user = <Icons name="user" size={20} color="#888" />;

    const handleEmailChange = (text) => {
        setEmail(text);
        setErrorMessage(''); // Kullanıcı her yazdığında hata mesajını sıfırla
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleContinue = () => {
        if (validateEmail(email)) {
            // Eğer e-posta geçerliyse, hata mesajını sıfırla ve ileriye git
            setErrorMessage('');
            router.push('/Name');
        } else {
            // Geçersiz e-posta için hata mesajını güncelle
            setErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
        }
    };

    return (
        <SafeAreaView style={commonStyles.containerRegister}>
            {/* Üst Kısım Component */}
            <PageHeader headerText="E-postanızı girin" progressIndicatorState="progressIndicator25" />

            {/* E-posta Girme Alanı */}
            <View style={commonStyles.inputContainer}>
                <Text style={[commonStyles.labelText, FONTS.body]}>Mail adresi</Text>
                <View style={commonStyles.inputWrapper}>
                    {user}
                    <TextInput
                        style={commonStyles.input}
                        placeholder="E-posta adresinizi girin"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={handleEmailChange}
                    />
                </View>
                {/* Hata Mesajı */}
                {errorMessage ? (
                    <Text style={{ color: 'red', marginTop: 5 }}>{errorMessage}</Text>
                ) : null}
            </View>

            {/* Üye Ol ve Hesabım Var Linkleri */}
            <View>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={handleContinue}
                >
                    <Text style={commonStyles.buttonText}>Üye ol</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", fontSize: 14, marginBottom: SIZES.base }}>Zaten bir hesabınız var mı?</Text>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => router.push('/Login')}
                >
                    <Text style={commonStyles.buttonText}>Giriş sayfası</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
