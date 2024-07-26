import { updateLocation } from "@/api/account";
import { toastConfig } from "@/components/toast-config";
import { useFontState } from "@/store/useFontState";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Location from "expo-location";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";
import Toast from "react-native-toast-message";

export default function AppLayout() {
  const { token } = useToken();
  const { user } = useSession();
  const queryClient = useQueryClient();
  const updateLocationRequest = useMutation({
    mutationFn: (data: { latitude: number; longitude: number }) =>
      updateLocation(data, token!),
  });

  useEffect(() => {
    (async () => {
      if (!token || !user) return;

      if (user?.data.latitude && user?.data.longitude) return;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Akses Lokasi", "Aktifkan akses lokasi terlebih dahulu!", [
          { text: "OKE", onPress: () => BackHandler.exitApp() },
        ]);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: 4,
      });
      await updateLocationRequest.mutateAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  if (!token && !user?.data) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast autoHide position="top" visibilityTime={3000} config={toastConfig} />
    </>
  );
}
