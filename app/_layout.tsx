import { toastConfig } from "@/components/toast-config";
import { queryClient } from "@/lib/query-client";
import { useReactQueryDevTools } from "@dev-plugins/react-query/build/useReactQueryDevTools";
import NetInfo from "@react-native-community/netinfo";
import { QueryClientProvider, onlineManager } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import AccountProvider from "providers/account-provider";
import React from "react";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  const [fontsLoaded, fontsError] = useFonts({
    "PlusJakartaSans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "PlusJakartaSans-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "PlusJakartaSans-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AccountProvider fontsLoaded={fontsLoaded} fontsError={fontsError}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="customer" />
          <Stack.Screen name="(setting)" />
          <Stack.Screen name="search" />
          <Stack.Screen name="category/[categoryName]" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="seller/[id]" />
          <Stack.Screen name="product/nearby" />
          <Stack.Screen name="seller/(auth-seller)" />
        </Stack>
        <Toast autoHide position="top" visibilityTime={3000} config={toastConfig} />
      </AccountProvider>
    </QueryClientProvider>
  );
}
