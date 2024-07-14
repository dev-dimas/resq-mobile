import { ReactNode } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { cn } from "../lib/utils";
import { ClassValue } from "clsx";

type Props = {
  children: ReactNode;
  handlePress: () => void;
  loadingColor?: string;
  containerStyles?: ClassValue;
  textStyles?: ClassValue;
  isLoading?: boolean;
};

export default function Button({ children, handlePress, loadingColor = "#fff", containerStyles, textStyles, isLoading }: Props) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.75}
      className={cn("rounded-lg min-h-[47px] flex flex-row justify-center items-center", containerStyles, isLoading && "opacity-60")}
      disabled={isLoading}
    >
      <View className="relative">
        {isLoading && <ActivityIndicator animating={isLoading} color={loadingColor} size="small" className="absolute z-10 -left-8" />}
        <Text className={cn("font-pjs-bold text-sm text-white", textStyles)}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
