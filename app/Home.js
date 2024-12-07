import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icons2 from 'react-native-vector-icons/AntDesign';
import Icons3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, commonStyles, FONTS, SIZES } from './Styles';

export default function Home() {
    const router = useRouter();
    const weatherIcons = {
        sunny: <Icons3 name="weather-sunny" size={60} color="#fff" />,
        cloudy: <Icons3 name="weather-cloudy" size={60} color="#fff" />,
        rainy: <Icons3 name="weather-rainy" size={60} color="#fff" />,
        snowy: <Icons3 name="weather-snowy" size={60} color="#fff" />,
    }


    // Öne çıkan yerler için örnek veriler
    const featuredPlaces = [
        { id: '1', name: 'Truva Antik Kenti', image: 'https://via.placeholder.com/150' },
        { id: '2', name: 'Çanakkale Şehitliği', image: 'https://via.placeholder.com/150' },
        { id: '3', name: 'Bozcaada', image: 'https://via.placeholder.com/150' },
    ];

    // Kategoriler
    const categories = [
        'Tarihi Yerler',
        'Plajlar',
        'Adalar',
        'Restoranlar',
    ];

    return (
        <View style={styles.container}>
            {/* Üst Kısım */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Hoş Geldin</Text>
                    <Text style={styles.title}>Çanakkale'yi Keşfet</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => router.push('./Notifications')}>
                        <Icons name="notifications" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('./Profile')}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/40' }}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* search bar - arama */}
            <View style={commonStyles.inputContainer}>
                <View style={[commonStyles.inputWrapper, {
                    backgroundColor: "#efefef", borderWidth: 0,
                }]}>
                    <Icons2 name="search1" size={20} color="#888" />
                    <TextInput
                        style={commonStyles.input}
                        placeholder="Yer veya etkinlik ara" s
                        placeholderTextColor="#999"
                        keyboardType="text"
                        autoCapitalize="none"
                    />
                </View>
            </View>

            {/* hava durumu */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#42a5f5", borderRadius: SIZES.radius, padding: SIZES.padding, marginBottom: SIZES.base * 2 }} >
                <View>
                    <Text style={[FONTS.body, { color: COLORS.background }]} >Bugün</Text>
                    <Text style={[FONTS.h2, { color: COLORS.background }]} >22°C</Text>
                    <Text style={[FONTS.body, { color: COLORS.background }]} >Çanakkale, Merkez</Text>
                </View>
                <View>
                    {weatherIcons.cloudy}
                </View>
            </View>

            {/* Öne Çıkanlar */}
            <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
            <FlatList
                data={featuredPlaces}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.placeCard}>
                        <Image source={{ uri: item.image }} style={styles.placeImage} />
                        <Text style={styles.placeName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.placeList}
            />

            {/* Kategoriler */}
            <Text style={styles.sectionTitle}>Kategorilendir</Text>
            <View style={styles.categoryContainer}>

                {categories.map((category, index) => (

                    <TouchableOpacity key={index} style={styles.categoryButton}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </TouchableOpacity>

                ))}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    welcomeText: {
        fontSize: 18,
        color: '#555',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    placeList: {
        paddingVertical: 12,
    },
    placeCard: {
        width: "80%",
        marginRight: 16,
    },
    placeImage: {
        width: '100%',
        aspectRatio: 1.5,
        borderRadius: 8,
    },
    placeName: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 25,
    },
    categoryButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
    },
});
