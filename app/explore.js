import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Modal,
    Platform,
    SafeAreaView
} from 'react-native';
import { tabStyles } from './stylesTab';
import ButtonTab from '../components/ButtonTab';
import SearchBar from '../components/SearchBar';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icons2 from 'react-native-vector-icons/Ionicons';



// Local resim importu
const localImage = require('../assets/canakkale.jpg');

export default function Explore() {

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedPlace, setSelectedPlace] = useState(null);

    const categories = [
        {
            id: 'all',
            name: 'Tümü',
            icon: 'apps',
            topPlace: {
                name: 'Truva Antik Kenti',
                image: localImage,
                location: 'Merkez, Çanakkale',
                rating: 4.8,
                visitors: '10K+',
                description: 'Truva Antik Kenti, UNESCO Dünya Mirası Listesi\'nde yer alan önemli bir arkeolojik alandır. M.Ö. 3000\'lere dayanan tarihi ile dünyaca ünlü Truva Savaşı\'nın geçtiği yer olarak bilinir. Tahta at replikası ve kazı alanları ile ziyaretçilere eşsiz bir deneyim sunar.',
                workingHours: '09:00 - 19:00',
                entranceFee: '100 TL',
                features: ['Rehberli Tur Mevcut', 'Fotoğraf Çekimine Uygun', 'Hediyelik Eşya Dükkanı', 'Otopark']
            },
            places: [
                {
                    id: '1',
                    name: 'Çanakkale Şehitliği',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.9,
                    description: 'Çanakkale Savaşları\'nda şehit düşen askerlerimizin anısına yapılmış, tarihi ve manevi değeri yüksek bir anıt mezardır.',
                    workingHours: '24 Saat Açık',
                    entranceFee: 'Ücretsiz',
                    features: ['Anıt', 'Müze', 'İbadet Alanı', 'Otopark']
                },
                {
                    id: '2',
                    name: 'Aynalı Çarşı',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.5,
                    description: 'Tarihi Çanakkale çarşısı, geleneksel el sanatları ve hediyelik eşya dükkanlarıyla ünlüdür.',
                    workingHours: '09:00 - 20:00',
                    entranceFee: 'Ücretsiz',
                    features: ['Alışveriş', 'Tarihi Yapı', 'El Sanatları', 'Kafeler']
                },
                {
                    id: '3',
                    name: 'Saat Kulesi',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.6,
                    description: 'Çanakkale\'nin simgelerinden biri olan Saat Kulesi, 1897 yılında inşa edilmiştir.',
                    workingHours: '24 Saat Görülebilir',
                    entranceFee: 'Ücretsiz',
                    features: ['Tarihi Yapı', 'Fotoğraf Noktası']
                }
            ]
        },
        {
            id: 'historic',
            name: 'Tarihi Yerler',
            icon: 'account-balance',
            topPlace: {
                name: 'Alexandria Troas Antik Kenti',
                image: localImage,
                location: 'Ezine, Çanakkale',
                rating: 4.7,
                visitors: '5K+',
                description: 'Antik dönemin önemli liman kentlerinden biri olan Alexandria Troas, görkemli kalıntıları ile ziyaretçilerini büyülüyor. Roma dönemi hamam kalıntıları ve su yolları görülmeye değer yapılar arasında.',
                workingHours: '08:30 - 17:30',
                entranceFee: '75 TL',
                features: ['Antik Tiyatro', 'Roma Hamamı', 'Su Kemerleri', 'Rehberli Tur İmkanı']
            },
            places: [
                {
                    id: '1',
                    name: 'Apollon Smitheon',
                    image: localImage,
                    location: 'Ayvacık',
                    rating: 4.4,
                    description: 'Antik dönemin önemli tapınaklarından biri olan Apollon Smitheon, etkileyici mimarisi ile dikkat çeker.',
                    workingHours: '09:00 - 18:00',
                    entranceFee: '50 TL',
                    features: ['Antik Tapınak', 'Arkeolojik Alan', 'Manzara']
                },
                {
                    id: '2',
                    name: 'Assos Antik Kenti',
                    image: localImage,
                    location: 'Ayvacık',
                    rating: 4.8,
                    description: 'Deniz manzaralı konumu ve korunagelmiş yapıları ile Assos, bölgenin en etkileyici antik kentlerinden biridir.',
                    workingHours: '08:00 - 19:00',
                    entranceFee: '80 TL',
                    features: ['Antik Tiyatro', 'Athena Tapınağı', 'Nekropol', 'Manzara Noktası']
                },
                {
                    id: '3',
                    name: 'Parion Antik Kenti',
                    image: localImage,
                    location: 'Biga',
                    rating: 4.3,
                    description: 'Roma dönemine ait kalıntıların bulunduğu Parion, önemli bir liman kenti kalıntılarını barındırır.',
                    workingHours: '09:00 - 17:00',
                    entranceFee: '45 TL',
                    features: ['Antik Tiyatro', 'Kazı Alanı', 'Tarihi Liman']
                }
            ]
        },
        {
            id: 'beach',
            name: 'Plajlar',
            icon: 'beach-access',
            topPlace: {
                name: 'Altınkum Plajı',
                image: localImage,
                location: 'Ayvacık, Çanakkale',
                rating: 4.6,
                visitors: '15K+',
                description: 'Altın renkli kumuyla ünlü plaj, berrak denizi ve doğal güzelliği ile yaz aylarının gözdesi. Çeşitli su sporları aktiviteleri ve plaj tesisleri mevcut.',
                workingHours: '24 Saat Açık',
                entranceFee: 'Ücretsiz',
                features: ['Şezlong-Şemsiye', 'Duş-WC', 'Kafeterya', 'Otopark', 'Su Sporları']
            },
            places: [
                {
                    id: '1',
                    name: 'Dardanos Plajı',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.5,
                    description: 'Şehir merkezine yakın konumuyla ideal bir plaj. Temiz denizi ve kumsal alanı ile aileler için uygun.',
                    workingHours: '24 Saat Açık',
                    entranceFee: 'Ücretsiz',
                    features: ['Şezlong-Şemsiye', 'Kafeterya', 'Otopark']
                },
                {
                    id: '2',
                    name: 'Güzelyalı Plajı',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.3,
                    description: 'Uzun sahil şeridi ve çeşitli aktivite imkanlarıyla popüler bir plaj.',
                    workingHours: '24 Saat Açık',
                    entranceFee: 'Ücretsiz',
                    features: ['Su Sporları', 'Piknik Alanı', 'Restoranlar']
                },
                {
                    id: '3',
                    name: 'Kabatepe Plajı',
                    image: localImage,
                    location: 'Eceabat',
                    rating: 4.7,
                    description: 'Gelibolu Yarımadası\'nda yer alan doğal plaj, temiz denizi ve sakin ortamıyla dikkat çeker.',
                    workingHours: '24 Saat Açık',
                    entranceFee: 'Ücretsiz',
                    features: ['Doğal Plaj', 'Kamp Alanı', 'Manzara']
                }
            ]
        },
        {
            id: 'island',
            name: 'Adalar',
            icon: 'terrain',
            topPlace: {
                name: 'Bozcaada',
                image: localImage,
                location: 'Bozcaada, Çanakkale',
                rating: 4.9,
                visitors: '20K+',
                description: 'Ege\'nin incisi Bozcaada, bağları, taş evleri, plajları ve renkli sokakları ile büyüleyici bir atmosfere sahip. Kalesi, rüzgar gülleri ve yerel şarapları ile ünlü.',
                workingHours: '24 Saat Açık',
                entranceFee: 'Feribot Ücreti: 30 TL',
                features: ['Tarihi Kale', 'Plajlar', 'Bağlar', 'Butik Oteller', 'Yerel Restoranlar']
            },
            places: [
                {
                    id: '1',
                    name: 'Gökçeada',
                    image: localImage,
                    location: 'Gökçeada',
                    rating: 4.8,
                    description: 'Türkiye\'nin en büyük adası, doğal güzellikleri ve kültürel mirası ile öne çıkar.',
                    workingHours: '24 Saat Açık',
                    entranceFee: 'Feribot Ücreti: 35 TL',
                    features: ['Organik Tarım', 'Sörf Merkezi', 'Tarihi Köyler']
                },
                {
                    id: '2',
                    name: 'Tavşan Adası',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.2,
                    description: 'Çanakkale Boğazı\'nda yer alan küçük ada, tekne turları için ideal.',
                    workingHours: 'Tekne Turları Saatlerinde',
                    entranceFee: 'Tur Ücretine Dahil',
                    features: ['Tekne Turu', 'Dalış Noktası', 'Fotoğraf Çekimi']
                },
                {
                    id: '3',
                    name: 'Yılan Adası',
                    image: localImage,
                    location: 'Bozcaada',
                    rating: 4.0,
                    description: 'Bozcaada yakınlarında bulunan ada, deniz turları rotasında yer alır.',
                    workingHours: 'Tekne Turları Saatlerinde',
                    entranceFee: 'Tur Ücretine Dahil',
                    features: ['Deniz Turu', 'Yüzme Noktası']
                }
            ]
        },
        {
            id: 'restaurant',
            name: 'Restoranlar',
            icon: 'restaurant',
            topPlace: {
                name: 'Yalova Restaurant',
                image: localImage,
                location: 'Merkez, Çanakkale',
                rating: 4.7,
                visitors: '25K+',
                description: 'Çanakkale\'nin en eski restoranlarından biri olan Yalova Restaurant, geleneksel Türk mutfağı ve deniz ürünleri ile ünlü. Boğaz manzarasına karşı yemek keyfi sunar.',
                workingHours: '11:00 - 23:00',
                entranceFee: 'Ortalama Fiyat: 150-300 TL',
                features: ['Deniz Manzarası', 'Canlı Müzik', 'Vale Parking', 'Rezervasyon']
            },
            places: [
                {
                    id: '1',
                    name: 'Aynalı Restaurant',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.6,
                    description: 'Çanakkale\'nin yerel lezzetlerini modern sunumlarla buluşturan mekan.',
                    workingHours: '12:00 - 22:00',
                    entranceFee: 'Ortalama Fiyat: 100-200 TL',
                    features: ['Teras', 'Vejetaryen Menü', 'Wi-Fi']
                },
                {
                    id: '2',
                    name: 'Sardalye Restaurant',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.5,
                    description: 'Taze deniz ürünleri ve mezeleriyle ünlü balık restoranı.',
                    workingHours: '12:00 - 23:00',
                    entranceFee: 'Ortalama Fiyat: 200-400 TL',
                    features: ['Deniz Ürünleri', 'Rakı-Balık', 'Rezervasyon']
                },
                {
                    id: '3',
                    name: 'Limani Restaurant',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.8,
                    description: 'Modern Türk mutfağı ve uluslararası lezzetler sunan şık restoran.',
                    workingHours: '12:00 - 24:00',
                    entranceFee: 'Ortalama Fiyat: 250-450 TL',
                    visitors: '12K+',
                    features: ['Deniz Manzarası', 'Dünya Mutfağı', 'VIP Bölüm', 'Vale Parking', 'Rezervasyon']
                }
            ]
        },
        {
            id: 'museum',
            name: 'Müzeler',
            icon: 'museum',
            topPlace: {
                name: 'Çanakkale Arkeoloji Müzesi',
                image: localImage,
                location: 'Merkez, Çanakkale',
                rating: 4.7,
                visitors: '8K+',
                description: 'Troya, Assos ve Apollon Smitheon kazılarından çıkan eserlerin sergilendiği müze, bölgenin zengin tarihini gözler önüne seriyor. Özellikle Troya hazineleri ve Roma dönemi eserleri dikkat çekiyor.',
                workingHours: '09:00 - 17:00',
                entranceFee: '45 TL',
                features: ['Rehberli Tur', 'Sesli Rehber', 'Hediyelik Eşya', 'Kafeterya', 'Engelli Erişimi']
            },
            places: [
                {
                    id: '1',
                    name: 'Deniz Müzesi',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.6,
                    description: 'Çanakkale Boğazı\'nın denizcilik tarihini ve savaş kalıntılarını sergileyen önemli bir müze.',
                    workingHours: '09:00 - 17:00',
                    entranceFee: '30 TL',
                    visitors: '5K+',
                    features: ['Deniz Savaşları Bölümü', 'Sualtı Arkeolojisi', 'Fotoğraf Çekim Alanı']
                },
                {
                    id: '2',
                    name: 'Kent Müzesi',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.4,
                    description: 'Çanakkale\'nin kentsel gelişimini ve sosyal yaşamını anlatan modern bir müze.',
                    workingHours: '10:00 - 18:00',
                    entranceFee: '20 TL',
                    visitors: '3K+',
                    features: ['Interaktif Sergi', 'Belgesel Gösterimi', 'Çocuk Atölyesi']
                },
                {
                    id: '3',
                    name: 'Troya Müzesi',
                    image: localImage,
                    location: 'Tevfikiye',
                    rating: 4.9,
                    description: 'Modern mimarisi ve zengin koleksiyonuyla Troya\'nın 5000 yıllık tarihini anlatan dünya standartlarında bir müze.',
                    workingHours: '08:30 - 19:30',
                    entranceFee: '100 TL',
                    visitors: '15K+',
                    features: ['Dijital Sunumlar', 'Antik Eserler', 'Sanal Gerçeklik', 'Kafe-Restoran']
                }
            ]
        },
        {
            id: 'nature',
            name: 'Doğal Alanlar',
            icon: 'forest',
            topPlace: {
                name: 'Kaz Dağları Milli Parkı',
                image: localImage,
                location: 'Bayramiç, Çanakkale',
                rating: 4.9,
                visitors: '30K+',
                description: 'Mitolojide İda Dağı olarak bilinen Kaz Dağları, zengin florası, şifalı bitkileri ve temiz havasıyla doğa tutkunlarını bekliyor. Trekking rotaları ve kamp alanlarıyla tam bir doğa cenneti.',
                workingHours: '24 Saat Açık',
                entranceFee: 'Giriş: 20 TL, Kamp: 50 TL',
                features: ['Trekking Parkurları', 'Kamp Alanları', 'Şifalı Bitkiler', 'Manzara Noktaları', 'Piknik Alanları']
            },
            places: [
                {
                    id: '1',
                    name: 'Ayazma Mesire Yeri',
                    image: localImage,
                    location: 'Bayramiç',
                    rating: 4.7,
                    description: 'Kaz Dağları\'nın eteklerinde, soğuk pınarları ve yeşil doğasıyla ünlü piknik ve kamp alanı.',
                    workingHours: '24 Saat Açık',
                    entranceFee: '10 TL',
                    visitors: '8K+',
                    features: ['Piknik Alanı', 'Doğal Kaynak Suyu', 'Yürüyüş Parkuru']
                },
                {
                    id: '2',
                    name: 'Çan Kanyonu',
                    image: localImage,
                    location: 'Çan',
                    rating: 4.5,
                    description: 'Etkileyici kanyonu ve doğal güzellikleriyle fotoğraf tutkunlarının gözdesi.',
                    workingHours: 'Gün doğumu-Gün batımı',
                    entranceFee: 'Ücretsiz',
                    visitors: '4K+',
                    features: ['Fotoğraf Noktaları', 'Trekking', 'Manzara Seyir']
                },
                {
                    id: '3',
                    name: 'Dardanos Kıyıları',
                    image: localImage,
                    location: 'Merkez',
                    rating: 4.6,
                    description: 'Doğal kıyı şeridi ve zengin deniz ekosistemiyle dikkat çeken doğal alan.',
                    workingHours: '24 Saat Açık',
                    entranceFee: 'Ücretsiz',
                    visitors: '6K+',
                    features: ['Kuş Gözlem', 'Yürüyüş Parkuru', 'Deniz Ekosistemi']
                }
            ]
        }
    ];

    const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

    return (
        <View style={tabStyles.container}>
            <View style={styles.mainContainer}>
                {/* Header ve Search Bar */}
                <View style={tabStyles.header}>
                    <Text style={tabStyles.title}>Keşfet</Text>
                </View>
                <SearchBar />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryContainer}
                    contentContainerStyle={styles.categoryContent}
                >
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.id && styles.selectedCategory
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === category.id && styles.selectedCategoryText
                            ]}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* İçerik Alanı */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* En Popüler Yer */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Öne Çıkan</Text>
                        <TouchableOpacity
                            style={styles.topPlaceCard}
                            onPress={() => setSelectedPlace(selectedCategoryData.topPlace)}
                        >
                            <Image
                                source={selectedCategoryData.topPlace.image} // localImage olarak gelecek
                                style={styles.topPlaceImage} // featuredImage yerine topPlaceImage kullanıyoruz
                                resizeMode="cover"
                            />
                            <View style={styles.topPlaceOverlay}>
                                <View style={styles.topPlaceInfo}>
                                    <Text style={styles.topPlaceName}>
                                        {selectedCategoryData.topPlace.name}
                                    </Text>
                                    <View style={styles.topPlaceDetails}>
                                        <View style={styles.ratingContainer}>
                                            <Icons name="star" size={16} color="#FFD700" />
                                            <Text style={styles.ratingText}>
                                                {selectedCategoryData.topPlace.rating}
                                            </Text>
                                        </View>
                                        <View style={styles.visitorContainer}>
                                            <Icons name="people" size={16} color="#fff" />
                                            <Text style={styles.visitorText}>
                                                {selectedCategoryData.topPlace.visitors}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.topPlaceLocation}>
                                        <Icons name="location-on" size={16} />
                                        {selectedCategoryData.topPlace.location}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Diğer Popüler Yerler */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Popüler Yerler</Text>
                        <View style={styles.placesGrid}>
                            {selectedCategoryData.places.map(place => (
                                <TouchableOpacity
                                    key={place.id}
                                    style={styles.placeCard}
                                    onPress={() => setSelectedPlace(place)}
                                >
                                    <Image
                                        source={place.image} // Direkt localImage olarak gelecek, uri kullanmıyoruz
                                        style={styles.placeImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.placeOverlay} />
                                    <View style={styles.placeInfo}>
                                        <Text style={styles.placeName}>{place.name}</Text>
                                        <View style={styles.placeDetails}>
                                            <View style={styles.ratingContainer}>
                                                <Icons name="star" size={14} color="#FFD700" />
                                                <Text style={styles.placeRating}>{place.rating}</Text>
                                            </View>
                                            <Text style={styles.placeLocation}>
                                                <Icons name="location-on" size={14} /> {place.location}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Detay Modalı */}
                <Modal
                    visible={selectedPlace !== null}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setSelectedPlace(null)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView>
                                <Image
                                    source={selectedPlace?.image} // uri yerine direkt image
                                    style={styles.modalImage}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setSelectedPlace(null)}
                                >
                                    <Icons name="close" size={24} color="#fff" />
                                </TouchableOpacity>

                                <View style={styles.modalInfo}>
                                    <Text style={styles.modalTitle}>{selectedPlace?.name}</Text>

                                    <View style={styles.modalDetailsRow}>
                                        <View style={styles.modalDetailItem}>
                                            <Icons name="star" size={20} color="#FFD700" />
                                            <Text style={styles.modalDetailText}>
                                                {selectedPlace?.rating} Puan
                                            </Text>
                                        </View>
                                        <View style={styles.modalDetailItem}>
                                            <Icons name="location-on" size={20} color="#42a5f5" />
                                            <Text style={styles.modalDetailText}>
                                                {selectedPlace?.location}
                                            </Text>
                                        </View>
                                        <View style={styles.modalDetailItem}>
                                            <Icons name="people" size={20} color="#42a5f5" />
                                            <Text style={styles.modalDetailText}>
                                                {selectedPlace?.visitors} Ziyaretçi
                                            </Text>
                                        </View>
                                    </View>

                                    {selectedPlace?.description && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalSectionTitle}>Açıklama</Text>
                                            <Text style={styles.modalDescription}>
                                                {selectedPlace.description}
                                            </Text>
                                        </View>
                                    )}

                                    {selectedPlace?.workingHours && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalSectionTitle}>Çalışma Saatleri</Text>
                                            <Text style={styles.modalInfoText}>
                                                {selectedPlace.workingHours}
                                            </Text>
                                        </View>
                                    )}

                                    {selectedPlace?.entranceFee && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalSectionTitle}>Giriş Ücreti</Text>
                                            <Text style={styles.modalInfoText}>
                                                {selectedPlace.entranceFee}
                                            </Text>
                                        </View>
                                    )}

                                    {selectedPlace?.features && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalSectionTitle}>Özellikler</Text>
                                            <View style={styles.featuresList}>
                                                {selectedPlace.features.map((feature, index) => (
                                                    <View key={index} style={styles.featureItem}>
                                                        <Icons2 name="checkmark-circle"
                                                            size={20} color="#42a5f5" />
                                                        <Text style={styles.featureText}>{feature}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>

            {/* Bottom Tab */}
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
    mainContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 60,
    },
    categoryContainer: {
        marginVertical: 12,
        height: 50, // Sabit yükseklik
    },
    categoryContent: {
        paddingHorizontal: 8,
        alignItems: 'center', // İçeriği merkeze al
    },
    categoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#f0f0f0', // Hafif gri arka plan
    },
    selectedCategory: {
        backgroundColor: '#42a5f5', // Seçili kategori rengi
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#42a5f5', // Varsayılan metin rengi
    },
    selectedCategoryText: {
        color: '#fff', // Seçili kategori metin rengi
    },

    // Öne Çıkan Bölümü
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
        paddingHorizontal: 4,
    },
    // Öne Çıkan Bölümü Stilleri
    topPlaceCard: {
        width: '100%',
        height: 220, // Yüksekliği arttırdık
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 8,
    },
    topPlaceImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    topPlaceOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)', // Opacity azaltıldı
        paddingHorizontal: 12,
        paddingVertical: 8, // Padding azaltıldı
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    topPlaceInfo: {
        gap: 4,
    },
    topPlaceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    topPlaceDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    // Popüler Yerler Grid
    placesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    placeCard: {
        width: '48%', // İki kart yan yana
        height: 140,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
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
    placeImage: {
        width: '100%',
        height: '100%',
    },
    placeOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    placeInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    placeName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    placeDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    placeRating: {
        color: '#fff',
        fontSize: 12,
    },
    placeLocation: {
        color: '#fff',
        fontSize: 12,
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
    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 60,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
    },
    modalImage: {
        width: '100%',
        height: 250,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 8,
    },
    modalInfo: {
        padding: 16,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    modalDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    modalDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    modalDetailText: {
        fontSize: 14,
        color: '#666',
    },
    modalSection: {
        marginBottom: 24,
    },
    modalSectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    modalDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    modalInfoText: {
        fontSize: 14,
        color: '#666',
    },
    featuresList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    featureText: {
        fontSize: 14,
        color: '#666',
    }
});