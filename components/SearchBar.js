import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons2 from 'react-native-vector-icons/AntDesign';
import { commonStyles } from '../app/styles';

const SearchBar = ({ }) => {
    const navigation = useNavigation();

    return (

        <View style={[commonStyles.inputWrapper, { backgroundColor: "#efefef", borderWidth: 0, }]}>
            <Icons2 name="search1" size={20} color="#888" />
            <TextInput
                style={commonStyles.input}
                placeholder="Yer veya etkinlik ara" s
                placeholderTextColor="#999"
                keyboardType="text"
                autoCapitalize="none"
            />
        </View>
    )
}

export default SearchBar;