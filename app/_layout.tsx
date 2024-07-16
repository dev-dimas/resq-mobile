import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "PlusJakartaSans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "PlusJakartaSans-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "PlusJakartaSans-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack initialRouteName="(auth)">
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
