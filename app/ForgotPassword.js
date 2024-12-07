import React from 'react'
import { router, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from 'react-native'
import { commonStyles, FONTS } from './Styles';

const ForgotPassword = () => {
    return (
        <View>
            <TouchableOpacity style={commonStyles.button} onPress={() => router.back()}>
                <Text style={commonStyles.buttonText}>Geri Dön</Text>
            </TouchableOpacity>
            <Text style={FONTS.h1}>hazirlaniyor</Text>
        </View>
    )
}

export default ForgotPassword