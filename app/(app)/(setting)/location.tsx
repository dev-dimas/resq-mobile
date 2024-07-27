import { updateLocation } from "@/api/account";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import icons from "constants/icons";
import { Image } from "expo-image";
import * as ExpoLocation from "expo-location";
import { router } from "expo-router";
import { createRef, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import Toast from "react-native-toast-message";

export default function Location() {
  const { token } = useToken();
  const queryClient = useQueryClient();
  const { user } = useSession();
  const [location, setLocation] = useState<LatLng | null>(null);
  const updateAvatarRequest = useMutation({
    mutationFn: (data: { latitude: number; longitude: number }) =>
      updateLocation(data, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Berhasil memperbarui lokasi!",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui lokasi. Coba lagi!",
      });
    },
  });
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>({
    latitude: parseFloat(user?.data.latitude || "0"),
    longitude: parseFloat(user?.data.longitude || "0"),
  });
  const mapRef = createRef<MapView>();

  useEffect(() => {
    (async () => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Akses Lokasi", "Aktifkan akses lokasi terlebih dahulu!", [
          { text: "OKE", onPress: () => router.back() },
        ]);
        return;
      }

      const currentLocation = await ExpoLocation.getCurrentPositionAsync();
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const moveToCurrentLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        { ...location, latitudeDelta: 0.001, longitudeDelta: 0.001 },
        1000
      );
    }
  };

  if (location === null) return null;

  const INITIAL_REGION: Region = {
    latitude: parseFloat(user?.data.latitude || "0") || location.latitude,
    longitude: parseFloat(user?.data.longitude || "0") || location.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const handleUpdateLocation = async () => {
    if (!selectedLocation) return;
    await updateAvatarRequest.mutateAsync({
      latitude: selectedLocation?.latitude,
      longitude: selectedLocation?.longitude,
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton={false}
        onPress={({ nativeEvent }) => {
          setSelectedLocation(nativeEvent.coordinate);
        }}
      >
        <Marker
          draggable
          coordinate={{
            latitude: selectedLocation?.latitude || location.latitude,
            longitude: selectedLocation?.longitude || location.longitude,
          }}
        />
      </MapView>

      {/* Back button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.back()}
        className="absolute top-12 left-[3%] bg-white p-2 rounded-lg border border-slate-700/30"
      >
        <Image source={icons.chevronLeft} className="w-6 h-6" contentFit="contain" />
      </TouchableOpacity>

      {/* Shows my location */}
      <TouchableOpacity
        activeOpacity={0.7}
        className="absolute p-2 bg-white border rounded-lg bottom-28 right-[5%] border-slate-700/30"
        onPress={moveToCurrentLocation}
      >
        <Image source={icons.currentLocation} className="w-8 h-8" tintColor="#FF3B30" />
      </TouchableOpacity>

      {/* Save my location */}
      <TouchableOpacity
        activeOpacity={0.9}
        className="absolute px-2 py-4 w-[90%] mx-auto bg-[#FF3B30] rounded-lg bottom-10 left-[5%] items-center"
        onPress={handleUpdateLocation}
      >
        <Text className="text-sm text-white font-pjs-bold">Simpan Lokasi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
