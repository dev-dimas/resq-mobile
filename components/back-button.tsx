import { icons } from "@/constants";
import { cn } from "@/lib/utils";
import { Image } from "expo-image";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackButton({ isOnSkeleton }: { isOnSkeleton?: boolean }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.back()}
      className={cn("ml-2", isOnSkeleton && "absolute left-4 bottom-[14px]")}
    >
      <Image source={icons.chevronLeft} className="w-6 h-6 mt-1" contentFit="contain" />
    </TouchableOpacity>
  );
}
