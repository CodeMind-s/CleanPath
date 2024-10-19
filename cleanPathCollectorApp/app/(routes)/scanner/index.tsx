import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import {
    AppState,
    Linking,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
} from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const qrLock = useRef(false);
    const appState = useRef(AppState.currentState);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                qrLock.current = false;
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <Stack.Screen
                options={{
                    title: "Overview",
                    headerShown: false,
                }}
            />
            {Platform.OS === "android" ? <StatusBar hidden /> : null}
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={({ data }) => {
                    if (data && !qrLock.current) {
                        qrLock.current = true;
                        setBookingId(data);  // Store the scanned booking ID
                        setTimeout(() => {
                            // Navigate to viewbooking/index and pass the booking ID
                            router.push({
                                pathname: "/updategarbage",
                                params: { id: data },
                            });
                        }, 500);
                    }
                }}
            />
            <Overlay />
        </SafeAreaView>
    );
}