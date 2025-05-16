import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import Icons from 'react-native-vector-icons/AntDesign';
import { useRouter } from "expo-router";
import Logo from '../assets/CANAKKALE.svg';
import { COLORS, commonStyles, FONTS, SIZES } from './styles';
import axios from 'axios';
import Icons2 from 'react-native-vector-icons/FontAwesome6';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try {
            // API isteği burada yapılacak
            const response = await axios.post('https://canakkale-guide-backend.vercel.app/users/forgot-password', {
                email: email
            });
            Alert.alert(
                'Başarılı',
                'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.',
                [{ text: 'Tamam' }]
            );
        } catch (error) {
            Alert.alert(
                'Hata',
                'Bu e-posta adresi sistemde kayıtlı değil.',
                [{ text: 'Tamam' }]
            );
        }
    };

    return (
        <SafeAreaView style={commonStyles.containerRegister}>
            <ScrollView>
                {/* Şifremi Unuttum yazısı ve logo */}
                <View style={commonStyles.tabHeaderLogin2}>
                    <Icons2
                        name="face-sad-cry"
                        size={40}
                        color={COLORS.placeholder}
                    />
                    <Text style={FONTS.h1}>Şifremi unuttum</Text>

                </View>

                {/* E-posta alanı */}
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
                </View>

                {/* Şifre Sıfırlama Butonu */}
                <TouchableOpacity
                    style={[
                        commonStyles.button,
                        email ? commonStyles.activeButton : commonStyles.inactiveButton
                    ]}
                    onPress={handleResetPassword}
                    disabled={!email}
                >
                    <Text style={commonStyles.buttonText}>Şifre Sıfırlama Bağlantısı Gönder</Text>
                </TouchableOpacity>

                {/* Giriş Sayfasına Dön */}
                <TouchableOpacity style={commonStyles.button} onPress={() => router.push("/login")}>
                    <Text style={commonStyles.buttonText}>Giriş Sayfasına Dön</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}