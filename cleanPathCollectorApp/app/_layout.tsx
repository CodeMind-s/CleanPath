import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
// import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomHeaderProps {
  onBack: () => void;
  title: string;
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomHeader onBack={() => null} title="Login" />,
        }}
      />
      <Stack.Screen
        name="(routes)/dashboard/index"
        options={{
          header: () => <CustomHeader onBack={() => null} title="Clean Path" />,
        }}
      />
      <Stack.Screen
        name="(routes)/schedule/index"
        options={{
          header: () => <CustomHeader onBack={() => router.back()} title="Schedules" />,
        }}
      />
      <Stack.Screen
        name="(routes)/map/index"
        options={{
          header: () => <CustomHeader onBack={() => router.back()} title="Collector Tracking" />,
        }}
      />
      <Stack.Screen
        name="(routes)/updategarbage/index"
        options={{
          header: () => <CustomHeader onBack={() => router.back()} title="Update Bin Status" />,
        }}
      />
      <Stack.Screen
        name="(routes)/earnings/index"
        options={{
          header: () => <CustomHeader onBack={() => router.back()} title="Earning Summary" />,
        }}
      />
    </Stack>
  );


}


const CustomHeader: React.FC<CustomHeaderProps> = ({ onBack, title }) => (
  <View style={styles.headerContainer}>
    {title !== "Clean Path" && title !== "Login" && (
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={28} color="white" />
      </TouchableOpacity>
    )}

    {/* Apply the title prop to the header text */}
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#23252E',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 45
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    top: 10,
  },
});
