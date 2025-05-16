import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { router } from "expo-router";
import Icons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageHeader from '../components/PageHeader';
import { commonStyles } from './styles';

export default function Name() {
    const [fullName, setFullName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const user = <Icons name="user" size={20} color="#888" />;

    useEffect(() => {
        const getStoredEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                if (!storedEmail) {
                    Alert.alert(
                        'Eksik Bilgi',
                        'Email bilgisi bulunamadı. Lütfen kayıt işlemini baştan başlatın.',
                        [{
                            text: 'Tamam',
                            onPress: () => router.replace('/email')
                        }]
                    );
                    return;
                }
                setEmail(storedEmail);
            } catch (error) {
                console.error('Email okuma hatası:', error);
                Alert.alert('Hata', 'Email bilgisi alınamadı. Lütfen tekrar deneyin.');
                router.replace('/email');
            }
        };

        getStoredEmail();
    }, []);

    const handleFullNameChange = (text) => {
        setFullName(text);
        setErrorMessage('');
    };

    const isFullNameValid = (fullName) => {
        const parts = fullName.trim().split(" ").filter(part => part.length > 0);
        const isAlpha = /^[a-zA-ZğüşöçİĞÜŞÖÇı]+$/;
        return (
            fullName.length <= 50 &&
            parts.length >= 2 &&
            parts.every(part => part.length >= 2 && isAlpha.test(part))
        );
    };

    const handleContinue = async () => {
        if (isFullNameValid(fullName)) {
            try {
                await AsyncStorage.setItem('fullName', fullName);

                const userInfo = {
                    email: email,
                    fullName: fullName
                };
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

                router.push('/password');
            } catch (error) {
                console.error('Veri kaydetme hatası:', error);
                setErrorMessage('Bilgiler kaydedilirken bir hata oluştu.');
            }
        } else {
            setErrorMessage('Lütfen geçerli bir ad ve soyad girin (ad ve soyad arasında boşluk olmalı, maksimum 50 harften oluşmalı).');
        }
    };

    return (
        <SafeAreaView style={commonStyles.containerRegister}>
            <PageHeader headerText="Bilgilerinizi girin" progressIndicatorState="progressIndicator50" />

            <View style={commonStyles.inputContainer}>
                <Text style={commonStyles.labelText}>Ad soyad</Text>
                <View style={commonStyles.inputWrapper}>
                    {user}
                    <TextInput
                        style={commonStyles.input}
                        placeholder="Adınızı soyadınızı girin"
                        placeholderTextColor="#999"
                        keyboardType="default"
                        value={fullName}
                        onChangeText={handleFullNameChange}
                    />
                </View>
                {errorMessage ? <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text> : null}
            </View>

            <View>
                <TouchableOpacity onPress={handleContinue} style={commonStyles.button}>
                    <Text style={commonStyles.buttonText}>Devam et</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}