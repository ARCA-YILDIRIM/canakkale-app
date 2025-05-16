import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, Image, Platform } from "react-native";
import Icons from 'react-native-vector-icons/AntDesign';
import Icons2 from 'react-native-vector-icons/Feather';
import Icons3 from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, commonStyles, FONTS, SIZES } from './styles';
import axios from 'axios';

export default function Profile() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        profileImage: null
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userInfoString = await AsyncStorage.getItem('userInfo');
                if (userInfoString) {
                    const userInfo = JSON.parse(userInfoString);
                    setUserInfo(prev => ({
                        ...prev,
                        email: userInfo.email,
                        fullName: userInfo.fullName
                    }));
                } else {
                    console.log('userInfo bulunamadı');  // Debug için
                    // Alternatif olarak ayrı ayrı kontrol edelim
                    const email = await AsyncStorage.getItem('email');
                    const fullName = await AsyncStorage.getItem('fullName');

                    if (email && fullName) {
                        setUserInfo(prev => ({
                            ...prev,
                            email: email,
                            fullName: fullName
                        }));
                    } else {
                        console.log('email veya fullName bulunamadı');  // Debug için
                        console.log('email:', email);  // Debug için
                        console.log('fullName:', fullName);  // Debug için
                        Alert.alert(
                            'Bilgi Eksik',
                            'Kullanıcı bilgileri bulunamadı.',
                            [{
                                text: 'Tamam',
                                onPress: () => router.replace('/home')
                            }]
                        );
                    }
                }
            } catch (error) {
                console.error('Veri çekme hatası:', error);
                Alert.alert('Hata', 'Kullanıcı bilgileri alınırken bir hata oluştu.');
            }
        };

        getUserData();
    }, []);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Üzgünüz', 'Galeriye erişim izni gerekiyor!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            try {
                const formData = new FormData();
                formData.append('profileImage', {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg',
                    name: 'profile-image.jpg',
                });

                await axios.post('https://canakkale-guide-backend.vercel.app/users/profile/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                Alert.alert('Başarılı', 'Profil fotoğrafı güncellendi.');
            } catch (error) {
                Alert.alert('Hata', 'Profil fotoğrafı yüklenirken bir hata oluştu.');
            }
        }
    };

    const handleLogout = async () => {
        try {
            // Tüm kullanıcı verilerini temizle
            await Promise.all([
                AsyncStorage.removeItem('email'),
                AsyncStorage.removeItem('fullName'),
                AsyncStorage.removeItem('userInfo')
            ]);
            router.replace('/login');
        } catch (error) {
            console.error('Çıkış yapma hatası:', error);
            Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
        }
    };

    const settingsOptions = [
        {
            icon: 'notifications-outline',
            title: 'Bildirim Ayarları',
            onPress: () => console.log('Bildirimler')
        },
        {
            icon: 'moon-outline',
            title: 'Karanlık Mod',
            onPress: () => console.log('Karanlık Mod')
        },
        {
            icon: 'language-outline',
            title: 'Dil Seçimi',
            onPress: () => console.log('Dil')
        },
        {
            icon: 'help-circle-outline',
            title: 'Yardım',
            onPress: () => console.log('Yardım')
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Mavi Header Bölümü */}
            <View style={styles.headerSection}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Icons name="arrowleft" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profil</Text>
                    <Icons2 name="settings" size={24} color="#000" />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profil Bilgileri Bölümü */}
                <View style={styles.profileSection}>
                    {/* Profil Fotoğrafı */}
                    <View style={styles.profileImageContainer}>
                        <TouchableOpacity onPress={pickImage}>
                            {userInfo.profileImage ? (
                                <Image
                                    source={{ uri: userInfo.profileImage }}
                                    style={styles.profileImage}
                                />
                            ) : (
                                <View style={styles.profileImagePlaceholder}>
                                    <Icons name="user" size={40} color={COLORS.primary} />
                                </View>
                            )}
                            <View style={styles.editIconContainer}>
                                <Icons name="camera" size={20} color={COLORS.background} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Kullanıcı Bilgileri */}
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.userName}>{userInfo.fullName}</Text>
                        <Text style={styles.userEmail}>{userInfo.email}</Text>
                    </View>
                </View>

                {/* Ayarlar Bölümü */}
                <View style={styles.settingsSection}>
                    {settingsOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.settingOption,
                                index === settingsOptions.length - 1 && { borderBottomWidth: 0 }
                            ]}
                            onPress={option.onPress}
                        >
                            <View style={styles.settingIconTitle}>
                                <Icons3 name={option.icon} size={24} color={COLORS.text} />
                                <Text style={styles.settingText}>{option.title}</Text>
                            </View>
                            <Icons name="right" size={20} color={COLORS.text} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Çıkış Yap Butonu */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    headerSection: {
        backgroundColor: '#42a5f5',
        paddingTop: Platform.OS === 'android' ? 15 : 0,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        gap: 8
    },
    headerTitle: {
        ...FONTS.h1,
        color: COLORS.text,
        fontSize: 32,
    },
    profileSection: {
        backgroundColor: '#42a5f5',
        padding: SIZES.padding,
        paddingTop: SIZES.padding / 2,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginVertical: SIZES.base
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.background
    },
    profileImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.primary
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        padding: 6,
        borderWidth: 2,
        borderColor: COLORS.background
    },
    userInfoContainer: {
        alignItems: 'center',
        marginTop: SIZES.base
    },
    userName: {
        ...FONTS.h2,
        color: COLORS.text
    },
    userEmail: {
        ...FONTS.body,
        color: COLORS.text,
        marginTop: 4
    },
    settingsSection: {
        backgroundColor: COLORS.background,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.padding,
        marginTop: SIZES.padding,
        paddingVertical: SIZES.base,
        ...(Platform.OS === 'ios'
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            }
            : {
                elevation: 3,
            }
        )
    },
    settingOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    settingIconTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    settingText: {
        ...FONTS.body,
        marginLeft: SIZES.base * 1.5,
        color: COLORS.text
    },
    logoutButton: {
        backgroundColor: '#FF4444',
        margin: SIZES.padding,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        alignItems: 'center'
    },
    logoutText: {
        ...FONTS.body,
        color: COLORS.background,
        fontWeight: '600'
    }
};