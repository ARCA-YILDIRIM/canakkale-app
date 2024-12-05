import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import Icons from 'react-native-vector-icons/AntDesign';
import PageHeader from '../components/PageHeader';

export default function Name() {
    const [name, setName] = useState('');

    const user = <Icons name="user" size={20} color="#888" />;

    const handleNameChange = (text) => {
        setName(text);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* UST KISIM Component */}
            <PageHeader headerText="Bilgilerinizi girin" progressIndicatorState="progressIndicator50" />

            {/* E-posta girme alanı */}
            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Ad soyad</Text>
                <View style={styles.emailInputContainer}>
                    {user}
                    <TextInput
                        style={styles.input}
                        placeholder="Adınızı soyadınızı girin"
                        placeholderTextColor="#999"
                        keyboardType="text"
                        autoCapitalize="none"
                        value={name}
                        onChangeText={handleNameChange}
                    />
                </View>
            </View>

            {/* Üye ol ve hesabım var linkleri */}
            <View style={styles.linkContainer}>
                <Link href="/Password" style={styles.button}>
                    <Text style={styles.buttonText}>Devam et</Text>
                </Link>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
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
        width: '50%',
        backgroundColor: "#3B82F6",
    },
    headerText: {
        fontSize: 32,
        fontWeight: '700',
        marginTop: 16,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 40,
    },
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
    button: {
        backgroundColor: "#eeeeee",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        paddingVertical: 12,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
});