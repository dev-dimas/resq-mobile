import { toastConfig } from "@/components/toast-config";
import { useToken } from "@/store/useToken";
import { useReactQueryDevTools } from "@dev-plugins/react-query/build/useReactQueryDevTools";
import NetInfo from "@react-native-community/netinfo";
import { QueryClient, QueryClientProvider, onlineManager } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  const [fontsLoaded, error] = useFonts({
    "PlusJakartaSans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "PlusJakartaSans-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "PlusJakartaSans-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });
  const { token } = useToken();

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    if (token) {
      console.log(token);
      // !! TODO: CREATE ENDPOINT TO CHECK IF TOKEN IS VALID
      // !! TODO: REDIRECT WHEN TOKEN IS VALID
      // !! TODO: REDIRECT TO SIGN-IN WHEN TOKEN IS INVALID
      // !! TODO: REMOVE TOKEN FROM STORE WHEN TOKEN IS INVALID
    }
  }, [token]);

  if (!fontsLoaded && !error) {
    return null;
  }

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="customer" />
        <Stack.Screen name="(setting)" />
        <Stack.Screen name="search" />
        <Stack.Screen name="category/[categoryName]" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="product/nearby" />
        <Stack.Screen name="seller/home" />
      </Stack>
      <Toast autoHide position="top" visibilityTime={3000} config={toastConfig} />
    </QueryClientProvider>
  );
}
