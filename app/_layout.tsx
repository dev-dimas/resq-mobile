import { useFontState } from "@/store/useFontState";
import { useReactQueryDevTools } from "@dev-plugins/react-query/build/useReactQueryDevTools";
import NetInfo from "@react-native-community/netinfo";
import { QueryClient, QueryClientProvider, onlineManager } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import SessionProvider from "providers/session-provider";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function Root() {
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
  const { setIsFontsLoaded } = useFontState();

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  useEffect(() => {
    if (fontsError) throw fontsError;
    setIsFontsLoaded(fontsLoaded);
  }, [fontsLoaded, fontsError]);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </QueryClientProvider>
  );
}
