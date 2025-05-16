import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, Alert, Modal } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icons2 from 'react-native-vector-icons/AntDesign';
import Icons3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons4 from 'react-native-vector-icons/FontAwesome';
import { COLORS, commonStyles, FONTS, SIZES } from './styles';
import { useNavigation } from '@react-navigation/native';
import ButtonTab from '../components/ButtonTab';
import { tabStyles } from './stylesTab';
const localImage = require('../assets/canakkale.jpg');

export default function Home() {
    const router = useRouter();
    const [weatherModalVisible, setWeatherModalVisible] = useState(false);
    const [selectedFeaturedPlace, setSelectedFeaturedPlace] = useState(null);

    const [weather, setWeather] = useState({
        temperature: null,
        description: '',
        icon: null,
        location: ''
    });

    // Öne çıkan yerler için örnek veriler
    const featuredPlaces = [
        { id: '1', name: 'Truva Antik Kenti', image: localImage, location: 'Merkez, Çanakkale', category: "all" },
        { id: '2', name: 'Çanakkale Şehitliği', image: localImage, location: 'Merkez, Çanakkale', category: "all" },
        { id: '3', name: 'Bozcaada', image: localImage, location: 'Merkez, Çanakkale', category: "historic" },
    ];

    // Kategoriler
    const categories = [
        'Tarihi Yerler',
        'Plajlar',
        'Adalar',
        'Restoranlar',
    ];

    const weatherIcons = {
        '01d': <Icons3 name="weather-sunny" size={60} color="#fff" />,
        '01n': <Icons3 name="weather-night" size={60} color="#fff" />,
        '02d': <Icons3 name="weather-partly-cloudy" size={60} color="#fff" />,
        '02n': <Icons3 name="weather-night-partly-cloudy" size={60} color="#fff" />,
        '03d': <Icons3 name="weather-cloudy" size={60} color="#fff" />,
        '03n': <Icons3 name="weather-cloudy" size={60} color="#fff" />,
        '04d': <Icons3 name="weather-cloudy" size={60} color="#fff" />,
        '04n': <Icons3 name="weather-cloudy" size={60} color="#fff" />,
        '09d': <Icons3 name="weather-rainy" size={60} color="#fff" />,
        '09n': <Icons3 name="weather-rainy" size={60} color="#fff" />,
        '10d': <Icons3 name="weather-rain" size={60} color="#fff" />,
        '10n': <Icons3 name="weather-rain" size={60} color="#fff" />,
        '11d': <Icons3 name="weather-lightning" size={60} color="#fff" />,
        '11n': <Icons3 name="weather-lightning" size={60} color="#fff" />,
        '13d': <Icons3 name="weather-snowy" size={60} color="#fff" />,
        '13n': <Icons3 name="weather-snowy" size={60} color="#fff" />,
        '50d': <Icons3 name="weather-fog" size={60} color="#fff" />,
        '50n': <Icons3 name="weather-fog" size={60} color="#fff" />
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Konum izni al
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Konum izni gerekli', 'Hava durumu bilgilerini görüntüleyebilmek için konum izni gereklidir.');
                    return;
                }

                // Mevcut konumu al
                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                // OpenWeatherMap API çağrısı
                const API_KEY = '6d3d9e93e56c54bd4bc9a0b2df9a759e'; // API anahtarınızı buraya ekleyin
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=tr`
                );

                // Hava durumu verilerini state'e kaydet
                setWeather({
                    temperature: Math.round(response.data.main.temp),
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                    location: response.data.name
                });
            } catch (error) {
                console.error('Hava durumu alınırken hata oluştu:', error);
                Alert.alert('Hata', 'Hava durumu bilgileri alınamadı.');
            }
        };

        fetchWeather();
    }, []);

    return (
        // Ana container
        <View style={[tabStyles.container, { paddingBottom: 60 }]}>
            {/* Üst Kısım */}
            <View style={{ paddingHorizontal: 10, gap: 10, }}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Hoş Geldin</Text>
                        <Text style={tabStyles.title}>Çanakkale'yi Keşfet</Text>
                    </View>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => router.push('./notifications')}>
                            <Icons name="notifications" size={30} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('./profile')}>
                            <Icons4 name="user-circle-o" size={30} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* search bar - arama */}
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

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#42a5f5",
                    borderRadius: SIZES.radius,
                    padding: SIZES.padding,
                    marginBottom: 4
                }}
                >
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        onPress={() => setWeatherModalVisible(true)}
                    >
                        <View>
                            <Text style={[FONTS.body, { color: COLORS.background }]}>Bugün</Text>
                            <Text style={[FONTS.h2, { color: COLORS.background }]}>
                                {weather.temperature ? `${weather.temperature}°C` : 'Yükleniyor...'}
                            </Text>
                            <Text style={[FONTS.body, { color: COLORS.background, textTransform: 'capitalize' }]}>
                                {weather.location ? weather.location : 'Konum alınıyor...'}
                            </Text>
                        </View>
                        <View>
                            {weather.icon ? weatherIcons[weather.icon] : weatherIcons['01d']}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Hava Durumu Detay Modalı */}
                <Modal
                    visible={weatherModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setWeatherModalVisible(false)}
                >
                    <View style={styles.weatherModalContainer}>
                        <View style={styles.weatherModalContent}>
                            <TouchableOpacity
                                style={styles.weatherModalCloseButton}
                                onPress={() => setWeatherModalVisible(false)}
                            >
                                <Icons name="close" size={24} color="#333" />
                            </TouchableOpacity>

                            <View style={styles.weatherModalHeader}>
                                {weather.icon ? weatherIcons[weather.icon] : weatherIcons['01d']}
                                <Text style={styles.weatherModalTemperature}>
                                    {weather.temperature}°C
                                </Text>
                                <Text style={styles.weatherModalDescription}>
                                    {weather.description}
                                </Text>
                            </View>

                            <View style={styles.weatherModalDetails}>
                                <View style={styles.weatherModalDetailItem}>
                                    <Icons name="location-on" size={24} color="#42a5f5" />
                                    <Text style={styles.weatherModalDetailText}>
                                        {weather.location}
                                    </Text>
                                </View>

                                <View style={styles.weatherModalDetailItem}>
                                    <Icons3 name="weather-windy" size={24} color="#42a5f5" />
                                    <Text style={styles.weatherModalDetailText}>
                                        Rüzgar Hızı: 10 km/sa
                                    </Text>
                                </View>

                                <View style={styles.weatherModalDetailItem}>
                                    <Icons3 name="water-percent" size={24} color="#42a5f5" />
                                    <Text style={styles.weatherModalDetailText}>
                                        Nem Oranı: %65
                                    </Text>
                                </View>

                                <View style={styles.weatherModalDetailItem}>
                                    <Icons3 name="thermometer" size={24} color="#42a5f5" />
                                    <Text style={styles.weatherModalDetailText}>
                                        Hissedilen Sıcaklık: {weather.temperature - 2}°C
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Öne Çıkanlar */}
                <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
                <FlatList
                    data={featuredPlaces}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.placeCard}
                            onPress={() => setSelectedFeaturedPlace(item)}
                        >
                            <Image source={localImage} style={styles.placeImage} />
                            <Text style={styles.placeName}>{item.name}</Text>
                            <View style={{ justifyContent: "center" }}>
                                <Text style={styles.placeLocation}>
                                    <Icons name="location-on" size={20} color="#000" />
                                    {item.location}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.placeList}
                />

                {/* Featured Place Modal */}
                <Modal
                    visible={selectedFeaturedPlace !== null}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setSelectedFeaturedPlace(null)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image
                                source={localImage}
                                style={styles.modalImage}
                            />
                            <Text style={styles.modalTitle}>
                                {selectedFeaturedPlace?.name}
                            </Text>
                            <Text style={styles.modalLocation}>
                                {selectedFeaturedPlace?.location}
                            </Text>
                            <TouchableOpacity
                                style={styles.exploreButton}
                                onPress={() => {
                                    setSelectedFeaturedPlace(null);
                                    router.push('/explore');
                                }}
                            >
                                <Text style={styles.exploreButtonText}>
                                    Daha detaylı bilgi için Explore sayfasını ziyaret edin
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setSelectedFeaturedPlace(null)}
                            >
                                <Icons name="close" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Kategoriler */}
                <Text style={styles.sectionTitle}>Kategoriler</Text>
                <View style={styles.categoryContainer}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.categoryWrapper}
                        >
                            <View style={styles.iconContainer}>
                                <Icons
                                    name={
                                        category === 'Tarihi Yerler' ? 'account-balance' :
                                            category === 'Plajlar' ? 'beach-access' :
                                                category === 'Adalar' ? 'terrain' :
                                                    category === 'Restoranlar' ? 'restaurant' :
                                                        'location-on'
                                    }
                                    size={24}
                                    color="#42a5f5"
                                />
                            </View>
                            <Text style={styles.categoryText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.bottomTabContainer}>
                <View style={styles.bottomTabContent}>
                    <ButtonTab icon="home" address="home" />
                    <ButtonTab icon="explore" address="explore" iconType='Icons' />
                    <ButtonTab icon="chat" address="chat" />
                    <ButtonTab icon="map" address="map" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    welcomeText: {
        fontSize: 18,
        color: '#555',
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
    },
    placeList: {
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.padding,
    },
    placeCard: {
        width: 250,
        marginRight: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
    },
    placeImage: {
        width: '100%',
        height: 150,
        borderTopRightRadius: SIZES.radius,
        borderTopLeftRadius: SIZES.radius,
    },
    placeName: {
        marginTop: SIZES.base,
        marginBottom: SIZES.base,
        fontSize: SIZES.body,
        fontWeight: '500',
        color: COLORS.text,
        textAlign: 'center',
        paddingHorizontal: SIZES.base,
    },
    placeLocation: {
        fontSize: 12,
        textAlign: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        gap: 12,
    },
    categoryWrapper: {
        width: '47%',
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        backgroundColor: '#e6f2ff',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        flexShrink: 1,
    },
    bottomTabContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    bottomTabContent: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
    },
    weatherModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    weatherModalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    weatherModalCloseButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    weatherModalHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    weatherModalTemperature: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    weatherModalDescription: {
        fontSize: 18,
        color: '#666',
        textTransform: 'capitalize',
    },
    weatherModalDetails: {
        width: '100%',
        marginTop: 20,
    },
    weatherModalDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
    },
    weatherModalDetailText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalLocation: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    exploreButton: {
        backgroundColor: '#42a5f5',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    exploreButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
    }
});
