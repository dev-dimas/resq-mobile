import MapView, { LatLng, Marker, Region } from "react-native-maps";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ExpoLocation from "expo-location";
import { LegacyRef, createRef, useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { Image } from "expo-image";
import icons from "constants/icons";
import BackButton from "@/components/back-button";

type Props = {
  selectedCoordinate?: LatLng;
};

export default function Location({ selectedCoordinate }: Props) {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(
    selectedCoordinate || null
  );
  const mapRef = createRef<MapView>();

  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Akses Lokasi", "Aktifkan akses lokasi terlebih dahulu!", [
          { text: "OKE", onPress: () => router.back() },
        ]);
        return;
      }

      let currentLocation = await ExpoLocation.getCurrentPositionAsync();
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
    latitude: selectedLocation?.latitude || location.latitude,
    longitude: selectedLocation?.longitude || location.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  console.log(location);

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
          coordinate={
            selectedLocation || {
              latitude: location.latitude,
              longitude: location.longitude,
            }
          }
        />
      </MapView>

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
        className="absolute px-2 py-4 w-[90%] mx-auto bg-[#FF3B30] rounded-lg bottom-10 left-[5%] items-center"
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
