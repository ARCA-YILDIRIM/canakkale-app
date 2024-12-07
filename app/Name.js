import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { router } from "expo-router";
import Icons from 'react-native-vector-icons/AntDesign';
import PageHeader from '../components/PageHeader';
import { commonStyles } from './Styles';

export default function Name() {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const user = <Icons name="user" size={20} color="#888" />;

    const handleNameChange = (text) => {
        setName(text);
        setErrorMessage(''); // Kullanıcı yazarken hata gösterme
    };

    const isNameValid = (name) => {
        const parts = name.trim().split(" ").filter(part => part.length > 0); // Boş elemanları çıkar
        const isAlpha = /^[a-zA-ZğüşöçİĞÜŞÖÇı]+$/; // Türkçe karakterler için regex
        return (
            name.length <= 50 && // Maksimum 50 karakter kontrolü
            parts.length >= 2 && // En az 2 kelime olmalı
            parts.every(part => part.length >= 2 && isAlpha.test(part)) // Her kelime en az 2 harf ve sadece harf içermeli
        );
    };

    const handleContinue = () => {
        if (isNameValid(name)) {
            router.push('/Password');
        } else {
            setErrorMessage('Lütfen geçerli bir ad ve soyad girin (ad ve soyad arasında boşluk olmalı, maksimum 50 harften oluşmalı).');
        }
    };



    return (
        <SafeAreaView style={commonStyles.containerRegister}>
            {/* UST KISIM Component */}
            <PageHeader headerText="Bilgilerinizi girin" progressIndicatorState="progressIndicator50" />

            {/* ad soyad girme alanı */}
            <View style={commonStyles.inputContainer}>
                <Text style={commonStyles.labelText}>Ad soyad</Text>
                <View style={commonStyles.inputWrapper}>
                    {user}
                    <TextInput
                        style={commonStyles.input}
                        placeholder="Adınızı soyadınızı girin"
                        placeholderTextColor="#999"
                        keyboardType="text"
                        value={name}
                        onChangeText={handleNameChange}
                    />
                </View>
                {errorMessage ? <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text> : null}
            </View>

            {/* Üye ol ve hesabım var linkleri */}
            <View>
                <TouchableOpacity onPress={handleContinue} style={commonStyles.button}>
                    <Text style={commonStyles.buttonText}>Devam et</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}