import React from 'react';
import { View, Text } from 'react-native';

export const tabStyles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
};

// Add this default export to fix the warning
export default function StylesTabComponent() {
    return (
        <View>
            <Text>StylesTab Component</Text>
        </View>
    );
}