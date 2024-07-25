import { updateLocation } from "@/api/account";
import { useToken } from "@/store/useToken";
import { useMutation } from "@tanstack/react-query";
import * as Location from "expo-location";
import { SplashScreen } from "expo-router";
import useDashboard from "hooks/query/useDashboard";
import React, { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

type Props = {
  children: React.ReactNode;
  fontsLoaded: boolean;
  fontsError: Error | null;
};

export default function AccountProvider({ children, fontsLoaded, fontsError }: Props) {
  const { token } = useToken();
  const { data } = useDashboard();
  const updateLocationRequest = useMutation({
    mutationFn: (data: { latitude: number; longitude: number }) =>
      updateLocation(data, token!),
  });

  useEffect(() => {
    (async () => {
      if (!token) return;

      if (data?.data.latitude && data?.data.longitude) return;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Akses Lokasi", "Aktifkan akses lokasi terlebih dahulu!", [
          { text: "OKE", onPress: () => BackHandler.exitApp() },
        ]);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync();
      await updateLocationRequest.mutateAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (fontsError) throw fontsError;

    if (fontsLoaded && ((token && data?.data) || (!token && !data))) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError, token, data]);

  if ((!fontsLoaded && !fontsError) || (token && !data)) {
    return null;
  }

  return <>{children}</>;
}
