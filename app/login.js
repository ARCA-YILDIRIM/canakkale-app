import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Link } from "expo-router";
import Icons from 'react-native-vector-icons/AntDesign';
import Icons2 from 'react-native-vector-icons/Feather';
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();
    const userInfo = {
        email: 'ahmet@gmail.com',
        password: 123456,
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const arrowLeft = <Icons name="arrowleft" size={24} color="#697565" />;

    const handleLogin = () => {
        if (email === userInfo.email && parseInt(password) === userInfo.password) {
            router.push('./mainPage');
        } else {
            alert('kullanici adi veya sifre yanlis');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Geri dön, ilerleme çubuğu, giriş başlığı */}
                <View style={styles.tabHeader}>
                    <Link href="/password">{arrowLeft}</Link>
                    <View>
                        <Text style={styles.headerText}>Giriş Yap</Text>
                    </View>
                </View>

                {/* Giriş bilgileri alanları */}
                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>E-posta</Text>
                    <View style={styles.inputWrapper}>
                        <Icons name="user" size={20} color="#888" />
                        <TextInput
                            style={styles.input}
                            placeholder="E-posta adresinizi girin"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <Text style={styles.labelText}>Şifre</Text>
                    <View style={styles.inputWrapper}>
                        <Icons name="lock" size={20} color="#888" />
                        <TextInput
                            style={styles.input}
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
                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
                    </TouchableOpacity>
                </View>

                {/* Giriş Yap Butonu */}
                <TouchableOpacity
                    style={[
                        styles.loginButton,
                        (email && password) ? styles.activeButton : styles.inactiveButton
                    ]}
                    onPress={handleLogin}
                    disabled={!(email && password)}
                >
                    <Text style={styles.loginButtonText}>Giriş Yap</Text>
                </TouchableOpacity>

                {/* Kayıt Ol Bölümü */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Hesabın yok mu?</Text>
                    <Link href="/email" style={styles.registerLink}>
                        <Text style={styles.registerLinkText}>Kayıt Ol</Text>
                    </Link>
                </View>

                {/* Sosyal Medya Girişi */}
                <View style={styles.socialLoginContainer}>
                    <Text style={styles.socialLoginText}>Veya ile giriş yap</Text>
                    <View style={styles.socialButtonContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Icons name="google" size={24} color="#DB4437" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Icons name="facebook-square" size={24} color="#4267B2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Icons name="apple1" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
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
        height: 6,
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
    inputWrapper: {
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
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#3B82F6',
        fontSize: 14,
    },
    loginButton: {
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    activeButton: {
        backgroundColor: '#3B82F6',
    },
    inactiveButton: {
        backgroundColor: '#D1D5DB',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    registerText: {
        color: '#666',
        marginRight: 5,
    },
    registerLink: {
        marginLeft: 5,
    },
    registerLinkText: {
        color: '#3B82F6',
        fontWeight: '600',
    },
    socialLoginContainer: {
        alignItems: 'center',
    },
    socialLoginText: {
        color: '#666',
        marginBottom: 15,
    },
    socialButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    socialButton: {
        padding: 10,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
    },
});