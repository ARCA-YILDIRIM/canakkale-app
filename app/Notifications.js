import React from 'react'
import { useRouter } from "expo-router";
import { View, Text } from 'react-native'

const Notifications = () => {
    return (
        <View>
            <TouchableOpacity style={commonStyles.button} onPress={() => router.back()}>
                <Text style={commonStyles.buttonText}>Geri Dön</Text>
            </TouchableOpacity>
            <Text style={FONTS.h1}>hazirlaniyor</Text>
        </View>
    )
}

export default Notifications