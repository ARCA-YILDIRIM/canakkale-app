import {View, Text} from "react-native";
import { Link } from "expo-router"

export default function Main() {
    return (
        <View>
            <Text>ahmet yildirimin sayfasi</Text>
            <Link href="/detail">detay sayfasina gidin</Link>
        </View>
    );
}