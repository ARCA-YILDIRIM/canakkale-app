import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Keyboard,
  Linking,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Icons from "react-native-vector-icons/MaterialIcons";
import Icons2 from "react-native-vector-icons/AntDesign";
import { COLORS, SIZES } from "./styles";
import ButtonTab from "../components/ButtonTab";

// Placeholder image for testing without network
const placeholderImage = require("../assets/canakkale.jpg");

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const mapRef = useRef(null);

  // Çanakkale bölgesindeki popüler yerler
  const popularPlaces = [
    {
      id: "truva",
      name: "Truva Antik Kenti",
      latitude: 39.9576,
      longitude: 26.2402,
      description:
        "UNESCO Dünya Mirası Listesi'nde yer alan önemli bir arkeolojik alan.",
      image: placeholderImage,
      rating: 4.8,
      workingHours: "09:00 - 19:00",
      entranceFee: "100 TL",
    },
    {
      id: "sehitlik",
      name: "Çanakkale Şehitliği",
      latitude: 40.0833,
      longitude: 26.2833,
      description:
        "Çanakkale Savaşları'nda şehit düşen askerlerimizin anısına yapılmış anıt mezar.",
      image: placeholderImage,
      rating: 4.9,
      workingHours: "24 Saat Açık",
      entranceFee: "Ücretsiz",
    },
    {
      id: "bozcaada",
      name: "Bozcaada",
      latitude: 39.8333,
      longitude: 26.2667,
      description:
        "Ege'nin incisi Bozcaada, bağları, taş evleri ve renkli sokakları ile büyüleyici bir atmosfere sahip.",
      image: placeholderImage,
      rating: 4.7,
      workingHours: "24 Saat Açık",
      entranceFee: "Feribot Ücreti: 30 TL",
    },
    {
      id: "aynali_carsi",
      name: "Aynalı Çarşı",
      latitude: 40.1552,
      longitude: 26.4086,
      description:
        "Tarihi Çanakkale çarşısı, geleneksel el sanatları ve hediyelik eşya dükkanlarıyla ünlüdür.",
      image: placeholderImage,
      rating: 4.5,
      workingHours: "09:00 - 20:00",
      entranceFee: "Ücretsiz",
    },
    {
      id: "saat_kulesi",
      name: "Saat Kulesi",
      latitude: 40.1548,
      longitude: 26.4079,
      description:
        "Çanakkale'nin simgelerinden biri olan Saat Kulesi, 1897 yılında inşa edilmiştir.",
      image: placeholderImage,
      rating: 4.6,
      workingHours: "24 Saat Görülebilir",
      entranceFee: "Ücretsiz",
    },
    {
      id: "assos",
      name: "Assos Antik Kenti",
      latitude: 39.4888,
      longitude: 26.3373,
      description:
        "Deniz manzaralı konumu ve korunagelmiş yapıları ile Assos, bölgenin en etkileyici antik kentlerinden biridir.",
      image: placeholderImage,
      rating: 4.8,
      workingHours: "08:00 - 19:00",
      entranceFee: "80 TL",
    },
    {
      id: "gokceada",
      name: "Gökçeada",
      latitude: 40.1999,
      longitude: 25.9075,
      description:
        "Türkiye'nin en büyük adası, doğal güzellikleri ve kültürel mirası ile öne çıkar.",
      image: placeholderImage,
      rating: 4.8,
      workingHours: "24 Saat Açık",
      entranceFee: "Feribot Ücreti: 35 TL",
    },
  ];

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Konum izni reddedildi");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (err) {
        setError("Konum alınamadı: " + err.message);
        console.error("Konum alınırken hata oluştu:", err);
      }
    };

    getLocation();
  }, []);

  // Arama işlevi
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filteredPlaces = popularPlaces.filter((place) =>
      place.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredPlaces);
    setShowSearchResults(true);
  };

  // Arama sonucuna göre konumu değiştir
  const handleSelectSearchResult = (place) => {
    setSelectedPlace(place);
    setShowSearchResults(false);
    Keyboard.dismiss();

    // Haritayı seçilen konuma taşı
    mapRef.current?.animateToRegion(
      {
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      1000
    );
  };

  // Google Maps'te yol tarifi için fonksiyon
  const openDirections = (place) => {
    const url = Platform.select({
      ios: `maps://app?saddr=${location?.coords.latitude},${location?.coords.longitude}&daddr=${place.latitude},${place.longitude}`,
      android: `google.navigation:q=${place.latitude},${place.longitude}`,
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          const browserUrl = `https://www.google.com/maps/dir/?api=1&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${place.latitude},${place.longitude}`;
          Linking.openURL(browserUrl);
        }
      })
      .catch((err) => {
        Alert.alert(
          "Hata",
          "Harita uygulamasını açarken bir sorun oluştu: " + err.message
        );
      });
  };

  // Hata mesajını göster
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icons2 name="search1" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Yer ara..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setSearchResults([]);
                setShowSearchResults(false);
              }}
            >
              <Icons name="close" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {/* Arama Sonuçları */}
        {showSearchResults && searchResults.length > 0 && (
          <View style={styles.searchResultsContainer}>
            {searchResults.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={styles.searchResultItem}
                onPress={() => handleSelectSearchResult(place)}
              >
                <Icons name="location-on" size={20} color={COLORS.primary} />
                <Text style={styles.searchResultText}>{place.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Map yüklenene kadar loading göster */}
      {!location ? (
        <View style={styles.loadingContainer}>
          <Text>Konum yükleniyor...</Text>
        </View>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 40.1633,
            longitude: 26.41,
            latitudeDelta: 1.5,
            longitudeDelta: 1.5,
          }}
          onMapReady={() => setMapReady(true)}
        >
          {mapReady && (
            <>
              {/* Kullanıcı konumu - Kırmızı */}
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                pinColor="red"
                title="Konumunuz"
              />

              {/* Popüler yerler - Mavi */}
              {popularPlaces.map((place) => (
                <Marker
                  key={place.id}
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                  }}
                  pinColor="blue"
                  onPress={() => setSelectedPlace(place)}
                  title={place.name}
                  description="Detayları görmek için tıklayın"
                />
              ))}
            </>
          )}
        </MapView>
      )}

      {/* Yer Detayları Modalı */}
      {selectedPlace && (
        <Modal
          visible={!!selectedPlace}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedPlace(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={selectedPlace.image} style={styles.modalImage} />

              <View style={styles.modalDetails}>
                <Text style={styles.modalTitle}>{selectedPlace.name}</Text>

                <View style={styles.modalInfoRow}>
                  <Icons name="star" size={20} color="#FFD700" />
                  <Text>{selectedPlace.rating}</Text>
                </View>

                <Text style={styles.modalDescription}>
                  {selectedPlace.description}
                </Text>

                <View style={styles.modalInfoRow}>
                  <Text>Çalışma Saatleri: {selectedPlace.workingHours}</Text>
                </View>

                <View style={styles.modalInfoRow}>
                  <Text>Giriş Ücreti: {selectedPlace.entranceFee}</Text>
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.directionButton}
                    onPress={() => openDirections(selectedPlace)}
                  >
                    <Icons name="directions" size={20} color="#fff" />
                    <Text style={styles.directionButtonText}>Yol Tarifi</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedPlace(null)}
                  >
                    <Text style={styles.closeButtonText}>Kapat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Bottom Tab */}
      <View style={styles.bottomTabContainer}>
        <View style={styles.bottomTabContent}>
          <ButtonTab icon="home" address="home" />
          <ButtonTab icon="explore" address="explore" iconType="Icons" />
          <ButtonTab icon="chat" address="chat" />
          <ButtonTab icon="map" address="map" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    zIndex: 5,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    borderRadius: SIZES.radius,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  searchResultsContainer: {
    backgroundColor: "#fff",
    borderRadius: SIZES.radius,
    marginTop: 5,
    padding: 5,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchResultText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  modalImage: {
    width: "100%",
    height: 200,
  },
  modalDetails: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  modalDescription: {
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  directionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  directionButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  closeButton: {
    padding: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomTabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white || "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 8,
  },
  bottomTabContent: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-around",
  },
});
