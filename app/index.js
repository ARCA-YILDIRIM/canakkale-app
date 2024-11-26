import { View, Text, StyleSheet, Image, } from "react-native";
import { Link } from "expo-router"


export default function Main() {
    const loginScreen = require("../assets/giris_ekrani.png")
    return (
        <View style={styles.container}>{/*yorum satirlari koyulacak projeye*/}
            <View style={styles.welcomeContainer}>
                <Text style={styles.headerText}>ÇANAKKALE'YE</Text>
                <Image source={loginScreen} />
                <Text style={styles.headerText}> HOŞGELDİNİZ</Text>
            </View>
            <View style={styles.startContainer}>
                <Link href="/email" style={styles.button}>Keşfedin</Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // flex direction column old icin yatay eksen alignItems, dikey eksen justifyContent
        alignItems: "center",
        justifyContent: "space-between",
    },
    welcomeContainer: {
        flex:8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    startContainer: {
        flex: 1,
        width: "80%",
    },
    button: {
        textAlign: "center",
        backgroundColor: "#eeeeee",
        borderColor: "#000",
        borderWidth: 1,
        marginTop: 20,
        lineHeight: 40,
        fontSize: 18,
        fontWeight: 450,
        borderRadius: 5,
    },
    headerText: {
        fontWeight: 600,
        fontSize: 44,
        lineHeight: 60,
        letterSpacing: 5,
        paddingBottom: 20,
        paddingTop: 20,
        // font family Josephin Sans yapilacak
    },
})