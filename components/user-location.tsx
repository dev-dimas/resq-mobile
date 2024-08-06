import { icons } from "@/constants";
import { cn } from "@/lib/utils";
import { useSession } from "@/store/useSession";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function UserLocation() {
  const [location, setLocation] = useState("-------");
  const { user } = useSession();

  useEffect(() => {
    if (user?.data.address) {
      setLocation(user?.data.address);
    } else {
      setLocation("-------");
    }
  }, [user?.data.address]);

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
