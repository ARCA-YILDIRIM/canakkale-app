// app/_layout.js
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                animation: 'fade',
                animationDuration: 5000,
                headerShown: false,
                contentStyle: { backgroundColor: 'white' },
            }}
        />
    );
}