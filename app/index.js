import React, { useEffect, useRef } from 'react';
import { View, Dimensions, Animated } from "react-native";
import { useRouter } from "expo-router";
import { commonStyles } from './Styles';
import Logo from '../assets/CANAKKALE.svg';
const { width, height } = Dimensions.get('window');


export default function Main() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Giriş animasyonu
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start();

        // Çıkış animasyonu ve sayfa geçişi
        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                })
            ]).start(() => {
                router.replace('/Login');
            });
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={commonStyles.container}>
            <Animated.View style={{
                opacity: fadeAnim,
                transform: [
                    { scale: scaleAnim }
                ]
            }}>
                <Logo
                    width={width * 1.2}
                    height={height * 0.6}
                />
            </Animated.View>
        </View>
    );
}
