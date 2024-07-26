import { cn, getAddress } from "@/lib/utils";
import { useSession } from "@/store/useSession";
import { icons } from "constants/";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { useState } from "react";
import { Text, View } from "react-native";

export default function UserLocation() {
  const [location, setLocation] = useState("-------");
  const { user } = useSession();

  if (user?.data.latitude && user?.data.longitude) {
    Location.reverseGeocodeAsync({
      latitude: parseFloat(user.data.latitude),
      longitude: parseFloat(user.data.longitude),
    }).then((res) => {
      const geoLocation = res[0];
      setLocation(getAddress(geoLocation.formattedAddress!));
    });
  }

  return (
    <>
      <View className="flex flex-row items-center w-full gap-2">
        <Image source={icons.location} contentFit="contain" className={cn("w-6 h-6")} />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="font-pjs-bold text-base text-[#1B1717] w-[70%]"
        >
          {location}
        </Text>
      </View>
      <Image source={icons.chevronDown} contentFit="contain" className={cn("w-6 h-6")} />
    </>
  );
}
