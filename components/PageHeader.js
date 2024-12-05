import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from "expo-router";
import { commonStyles, FONTS } from '../app/Styles';
import Icons from 'react-native-vector-icons/AntDesign';

const PageHeader = ({ headerText, progressIndicatorState }) => {
    const router = useRouter();
    const arrowLeft = <Icons name="arrowleft" size={24} color="#697565" />;
    return (
        <View style={commonStyles.tabHeader}>
            <TouchableOpacity onPress={() => router.back()}>
                {arrowLeft}
            </TouchableOpacity>
            <View>
                <View style={commonStyles.progressContainer}>
                    <View style={[commonStyles.progressBar, commonStyles.marginTop]}>
                        <View style={commonStyles[progressIndicatorState]}></View>
                    </View>
                </View>
                <Text style={[FONTS.h1, commonStyles.marginTop]}>{headerText}</Text>
            </View>
        </View>
    )
}

export default PageHeader