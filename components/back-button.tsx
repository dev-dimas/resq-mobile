import { icons } from "constants/";
import { Image } from "expo-image";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} className="ml-2">
      <Image source={icons.chevronLeft} className="w-6 h-6 mt-1" contentFit="contain" />
    </TouchableOpacity>
  );
}
