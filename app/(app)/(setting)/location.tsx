import { updateLocation } from "@/api/account";
import { icons } from "@/constants";
import env from "@/env";
import { getAddress } from "@/lib/utils";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import Mapbox, { Camera, LocationPuck, PointAnnotation } from "@rnmapbox/maps";
import { CameraRef } from "@rnmapbox/maps/lib/typescript/src/components/Camera";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ExpoLocation from "expo-location";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createRef, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

Mapbox.setAccessToken(env.EXPO_PUBLIC_MAPBOX_PUBLIC);

export default function Location() {
  const cameraRef = createRef<CameraRef>();
  const { user } = useSession();
  const { token } = useToken();
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: parseFloat(user?.data.latitude || "0"),
    longitude: parseFloat(user?.data.longitude || "0"),
  });
  const queryClient = useQueryClient();
  const updateLocationRequest = useMutation({
    mutationFn: (data: { latitude: number; longitude: number; address: string }) =>
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
      setCurrentLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();

    cameraRef.current?.setCamera({
      centerCoordinate: [selectedLocation?.longitude, selectedLocation?.latitude],
    });
  }, []);

  const moveToCurrentLocation = () => {
    if (cameraRef.current && currentLocation) {
      cameraRef.current.flyTo(
        [currentLocation.longitude, currentLocation.latitude],
        1000
      );
    }
  };

  const handleUpdateLocation = async () => {
    try {
      if (!selectedLocation) return;

      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Akses Lokasi", "Aktifkan akses lokasi terlebih dahulu!", [
          { text: "OKE", onPress: () => {} },
        ]);
        return;
      }
      await ExpoLocation.reverseGeocodeAsync({
        latitude: selectedLocation?.latitude,
        longitude: selectedLocation?.longitude,
      }).then(async (res) => {
        const address = getAddress(res[0].formattedAddress!);
        await updateLocationRequest.mutateAsync({
          latitude: selectedLocation?.latitude,
          longitude: selectedLocation?.longitude,
          address,
        });
        router.back();
      });
    } catch (error) {
      return;
    }
  };

  if (
    currentLocation === null ||
    (selectedLocation.latitude === 0 && selectedLocation.longitude === 0)
  )
    return null;

  return (
    <>
      <StatusBar
        hidden
        translucent
        backgroundColor="transparent"
        hideTransitionAnimation="fade"
      />
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          zoomEnabled
          rotateEnabled
          logoEnabled={false}
          gestureSettings={{
            doubleTapToZoomInEnabled: true,
          }}
          attributionEnabled={false}
          scaleBarEnabled={false}
          onPress={(feature) =>
            setSelectedLocation({
              latitude: (feature.geometry as any).coordinates[1],
              longitude: (feature.geometry as any).coordinates[0],
            })
          }
        >
          <Camera
            centerCoordinate={[selectedLocation?.longitude, selectedLocation?.latitude]}
            zoomLevel={17}
            ref={cameraRef}
            animationDuration={1000}
          />
          <LocationPuck pulsing={{ isEnabled: true }} />
          <PointAnnotation
            id="SelectedLocation"
            coordinate={[selectedLocation?.longitude, selectedLocation?.latitude]}
          >
            <></>
          </PointAnnotation>
        </Mapbox.MapView>

        {/* Back button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          className="absolute top-8 left-[3%] bg-white p-2 rounded-lg border border-slate-700/30"
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
          className="absolute px-2 py-4 w-[90%] mb-10 mx-auto bg-[#FF3B30] rounded-lg bottom-0 left-[5%] items-center"
          onPress={handleUpdateLocation}
        >
          <Text className="text-sm text-white font-pjs-bold">Simpan Lokasi</Text>
        </TouchableOpacity>
      </View>
    </>
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
