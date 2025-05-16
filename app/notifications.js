import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Platform, Modal } from "react-native";
import Icons from 'react-native-vector-icons/AntDesign';
import Icons2 from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { COLORS, commonStyles, FONTS, SIZES } from './styles';

export default function Notifications() {
    const router = useRouter();
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Örnek bildirimler - gerçek verilerle değiştirilecek
    const notifications = [
        {
            id: 1,
            title: 'Hoş Geldiniz!',
            message: 'Çanakkale Rehber uygulamasına hoş geldiniz.',
            time: '2 saat önce',
            isRead: false,
            fullText: 'Çanakkale Rehber uygulamasına hoş geldiniz. Uygulamamız size Çanakkale\'nin tarihi ve turistik yerlerini keşfetmenizde yardımcı olacak. Şehrin eşsiz güzelliklerini, tarihi mekanlarını ve lezzetli yemeklerini keşfetmeye hazır mısınız? Hemen gezmeye başlayın!'
        },
        {
            id: 2,
            title: 'Yeni Güncelleme',
            message: 'Yeni özellikler eklendi. Keşfetmek için tıklayın.',
            time: '1 gün önce',
            isRead: true,
            fullText: 'Uygulamamıza birçok yeni özellik eklendi! \n\n- Geliştirilmiş harita özellikleri\n- Yeni turistik mekanlar\n- Kullanıcı yorumları\n- Favori mekanları kaydetme\n- Geliştirilmiş rota planlama\n\nTüm bu özellikleri keşfetmek için uygulamayı kullanmaya devam edin.'
        },
        {
            id: 3,
            title: 'Önemli Bilgilendirme',
            message: 'Çanakkale Boğazı\'nda bakım çalışmaları devam ediyor.',
            time: '2 gün önce',
            isRead: true,
            fullText: 'Çanakkale Boğazı\'nda devam eden bakım çalışmaları hakkında önemli bilgilendirme.\n\nÇalışma Saatleri: 09:00-17:00\nEtkilenen Bölgeler: Kilitbahir-Çanakkale arası\nTahmini Bitiş Tarihi: 15 Ocak 2025\n\nLütfen seyahatlerinizi planlarken bu durumu göz önünde bulundurun.'
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerSection}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Icons name="arrowleft" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Bildirimler</Text>
                    <Icons2 name="notifications" size={24} color="#000" />
                </View>
            </View>

            {/* Bildirimler Listesi */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.notificationsContainer}
            >
                {notifications.map((notification) => (
                    <TouchableOpacity
                        key={notification.id}
                        style={[
                            styles.notificationItem,
                            !notification.isRead && styles.unreadNotification
                        ]}
                        onPress={() => setSelectedNotification(notification)}
                    >
                        <View style={styles.notificationContent}>
                            <View style={styles.notificationHeader}>
                                <Text style={styles.notificationTitle}>
                                    {notification.title}
                                </Text>
                                <Text style={styles.notificationTime}>
                                    {notification.time}
                                </Text>
                            </View>
                            <Text style={styles.notificationMessage} numberOfLines={2}>
                                {notification.message}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {notifications.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <Icons name="notification" size={50} color={COLORS.primary} />
                        <Text style={styles.emptyText}>Henüz bildiriminiz yok</Text>
                    </View>
                )}
            </ScrollView>

            {/* Bildirim Detay Modalı */}
            <Modal
                visible={selectedNotification !== null}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSelectedNotification(null)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {selectedNotification?.title}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setSelectedNotification(null)}
                                style={styles.closeButton}
                            >
                                <Icons name="close" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalTime}>
                            {selectedNotification?.time}
                        </Text>
                        <ScrollView style={styles.modalBody}>
                            <Text style={styles.modalText}>
                                {selectedNotification?.fullText}
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    headerSection: {
        paddingTop: Platform.OS === 'android' ? 15 : 0,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    headerTitle: {
        ...FONTS.h1,
        color: COLORS.text,
        fontSize: 32,
    },
    notificationsContainer: {
        padding: SIZES.padding,
    },
    notificationItem: {
        backgroundColor: COLORS.background,
        borderRadius: SIZES.radius,
        marginBottom: SIZES.padding,
        padding: SIZES.padding,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    unreadNotification: {
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    notificationContent: {
        gap: 8,
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationTitle: {
        ...FONTS.body,
        fontWeight: '600',
        color: COLORS.text,
    },
    notificationTime: {
        ...FONTS.smallBody,
        color: '#666',
    },
    notificationMessage: {
        ...FONTS.smallBody,
        color: COLORS.text,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.padding * 4,
    },
    emptyText: {
        ...FONTS.body,
        color: '#666',
        marginTop: SIZES.padding,
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: SIZES.padding,
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    modalTitle: {
        ...FONTS.h2,
        color: COLORS.text,
        flex: 1,
    },
    closeButton: {
        padding: 4,
    },
    modalTime: {
        ...FONTS.smallBody,
        color: '#666',
        marginBottom: SIZES.padding,
    },
    modalBody: {
        maxHeight: '80%',
    },
    modalText: {
        ...FONTS.body,
        color: COLORS.text,
        lineHeight: 24,
    },
};