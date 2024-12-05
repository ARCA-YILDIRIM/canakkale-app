import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useRouter } from "expo-router";
import { commonStyles, FONTS } from '../app/Styles';

const Button = ({ wherePush, buttonText }) => {
    const router = useRouter();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleContinue = () => {
        if (validateEmail(email)) {
            // Geçerli email ise ileriye git
            router.push('/Name');
        } else {
            // Hata mesajı göster ve geçişi engelle
            Alert.alert('Geçersiz Email', 'Lütfen geçerli bir email adresi girin.');
        }
    };

    return (
        <TouchableOpacity
            style={commonStyles.button}
            onPress={() => router.push(wherePush)}
        >
            <Text style={commonStyles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default Button