import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Icons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, FONTS, SIZES } from './styles';
import PageHeader from '../components/PageHeader';

export default function Email() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const user = <Icons name="user" size={20} color="#888" />;

    const handleEmailChange = (text) => {
        setEmail(text);
        setErrorMessage('');
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleContinue = async () => {
        if (validateEmail(email)) {
            try {
                // Email'i AsyncStorage'a kaydet
                await AsyncStorage.setItem('email', email);
                setErrorMessage('');
                router.push('/name');
            } catch (error) {
                setErrorMessage('Email kaydedilirken bir hata oluştu.');
                console.error('Storage error:', error);
            }
        } else {
            setErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
        }
    };

    return (
        <SafeAreaView style={commonStyles.containerRegister}>
            <PageHeader headerText="E-postanızı girin" progressIndicatorState="progressIndicator25" />

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
                {errorMessage ? (
                    <Text style={{ color: 'red', marginTop: 5 }}>{errorMessage}</Text>
                ) : null}
            </View>

            <View>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={handleContinue}
                >
                    <Text style={commonStyles.buttonText}>Üye ol</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", fontSize: 14, marginBottom: SIZES.base }}>
                    Zaten bir hesabınız var mı?
                </Text>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => router.push('/login')}
                >
                    <Text style={commonStyles.buttonText}>Giriş sayfası</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}