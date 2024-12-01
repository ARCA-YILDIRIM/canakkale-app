import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { commonStyles, COLORS, SIZES } from './styles';

const { width, height } = Dimensions.get('window');

export default function Main() {
    const router = useRouter();
    const loginScreen = require("../assets/giris_ekrani.png")

    return (
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.headerText}>ÇANAKKALE'YE</Text>
                <Image
                    source={loginScreen}
                    style={styles.welcomeImage}
                    resizeMode="contain"
                />
                <Text style={styles.headerText}>HOŞGELDİNİZ</Text>
            </View>
            <View style={styles.startContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('./email')}
                >
                    <Text style={styles.buttonText}>BAŞLA</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: height * 0.05,
    },
    welcomeContainer: {
        flex: 7,
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.9,
    },
    welcomeImage: {
        width: width * 0.8,
        height: height * 0.4,
        marginVertical: 20,
    },
    startContainer: {
        width: width * 0.8,
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#3B82F6", // Daha modern bir mavi ton
        borderRadius: 12,
        paddingVertical: 15,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 1,
    },
    headerText: {
        fontWeight: '700',
        fontSize: 36,
        lineHeight: 50,
        letterSpacing: 2,
        color: '#333',
        textAlign: 'center',
    },
});