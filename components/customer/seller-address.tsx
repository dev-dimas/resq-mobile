import { getAddress } from "@/lib/utils";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Text } from "react-native";

export default function SellerAddress({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) {
  const [location, setLocation] = useState<string>("-------");

  Location.reverseGeocodeAsync({
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  }).then((res) => {
    const geoLocation = res[0];
    setLocation(getAddress(geoLocation.formattedAddress!));
  });

  return (
    <Text className="text-xs font-pjs-regular" ellipsizeMode="tail" numberOfLines={1}>
      {location}
    </Text>
  );
}
