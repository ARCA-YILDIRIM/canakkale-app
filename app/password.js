import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Link } from "expo-router";
import Icons from 'react-native-vector-icons/AntDesign';
import Icons2 from 'react-native-vector-icons/Feather';

export default function PasswordRegistration() {
    // şifre
    const [password, setPassword] = useState('');
    // şifre tekrarı
    const [confirmPassword, setConfirmPassword] = useState('');
    // şifre gösterme
    const [showPassword, setShowPassword] = useState(false);
    // şifre tekrarını gösterme
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // şifre doğrulamaları
    const [passwordValidations, setPasswordValidations] = useState({
        length: false, // en az 8 karakter
        lowercase: false, // en az bir küçük harf
        uppercase: false, // en az bir büyük harf
        number: false,  // en az bir rakam
        specialChar: false,  // en az bir özel karakter
        match: false // şifre ve şifre tekrarı eşleşiyor
    });

    // sol üstte geri dön butonu
    const arrowLeft = <Icons name="arrowleft" size={24} color="#697565" />;

    // şifre doğrulama fonksiyonu
    const validatePassword = (pass, confirmPass) => { // parametre olarak şifre ve şifre tekrarını alır
        const validations = {
            length: pass.length >= 8, // en az 8 karakter
            lowercase: /[a-z]/.test(pass), // en az bir küçük harf
            uppercase: /[A-Z]/.test(pass), // en az bir büyük harf
            number: /[0-9]/.test(pass), // en az bir rakam
            specialChar: /[+-.,]/.test(pass), // en az bir özel karakter
            match: pass === confirmPass && pass.length > 0 // şifre ve şifre tekrarı eşleşiyor mu?
        };
        setPasswordValidations(validations); // şifre doğrulamalarını günceller
        return Object.values(validations).every(val => val === true); // tüm doğrulamalar doğruysa 
        
    };

    // şifre değiştiğinde bu fonksiyon calisacak
    const handlePasswordChange = (text) => { // parametre olarak girilen şifreyi alir
        setPassword(text); // password degiskenini gunceller
        validatePassword(text, confirmPassword); // şifre doğrulamalarını kontrol eden fonksiyonu da cagirir
    };

    // şifre tekrarı değiştiğinde bu fonksiyon calisacak
    const handleConfirmPasswordChange = (text) => { // parametre olarak girilen şifre tekrarını alir
        setConfirmPassword(text); // confirmPassword degiskenini gunceller
        validatePassword(password, text); // şifre doğrulamalarını kontrol eden fonksiyonu da cagirir, esas olarak şifre ve şifre tekrarını kontrol eder
    };

    return(
        <SafeAreaView style={styles.container}> 
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Geri dön, ilerleme çubuğu, şifre başlığı */}
                <View style={styles.tabHeader}>
                    <Link href="/nameSurname">{arrowLeft}</Link> {/* sol üstteki geri dön butonu */}
                    <View>
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}> {/* ilerleme çubuğu tamamı */}
                                <View style={styles.progressIndicator}></View> {/* ilerleme çubuğu dolu kısmı */}
                            </View>
                        </View>
                        <Text style={styles.headerText}>Şifreni oluştur</Text> {/* sayfa başlığı */}
                    </View>
                </View>

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
                    <Link href="/login" 
                        style={[
                            styles.continueButton, 
                            Object.values(passwordValidations).every(val => val === true) 
                                ? styles.activeButton 
                                : styles.inactiveButton
                        ]}
                        disabled={!Object.values(passwordValidations).every(val => val === true)}
                    >
                        <Text style={styles.buttonText}>Hesabımı Oluştur</Text>
                    </Link>
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