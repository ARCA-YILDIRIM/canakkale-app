import { View, Text } from "react-native"
import { Link } from "expo-router"

export default function Detail() {
    return(
        <View>
            <Text>routing islemi basarili</Text>
            <Link href="/">geri dön</Link>
        </View>
    );
}