import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icons2 from 'react-native-vector-icons/AntDesign';

const ButtonTab = ({ icon, address, iconType = 'Icons3', size = 50, color = "#344054" }) => {
    const navigation = useNavigation();

    const renderIcon = () => {
        switch (iconType) {
            case 'Icons':
                return <Icons name={icon} size={size} color={color} />;
            case 'Icons2':
                return <Icons2 name={icon} size={size} color={color} />;
            default:
                return <Icons3 name={icon} size={size} color={color} />;
        }
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate(address)}>
            {renderIcon()}
        </TouchableOpacity>
    )
}

export default ButtonTab;