import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Icons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "./styles";
import ButtonTab from "../components/ButtonTab";

// Placeholder image for testing without network
const placeholderImage = require("../assets/canakkale.jpg");

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [error, setError] = useState(null);

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
      {/* Map yüklenene kadar loading göster */}
      {!location && (
        <View style={styles.loadingContainer}>
          <Text>Konum yükleniyor...</Text>
        </View>
      )}

      {location ? (
        <MapView
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
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Konum yükleniyor...</Text>
        </View>
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

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedPlace(null)}
                >
                  <Text style={styles.closeButtonText}>Kapat</Text>
                </TouchableOpacity>
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
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: 5,
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
