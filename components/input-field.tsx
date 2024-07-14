import { ClassValue } from "clsx";
import { Text, TextInput, View } from "react-native";
import { cn } from "../lib/utils";

type Props = {
  label: string;
  placeholder?: string;
  containerStyles?: ClassValue;
};

export default function InputField({ label, placeholder = label, containerStyles }: Props) {
  return (
    <View className={cn(containerStyles)}>
      <View className="flex items-start px-3">
        <Text className="text-sm text-black font-pjs-bold">{label}</Text>
      </View>
      <View className="flex flex-row w-full mt-2">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#757575"}
          className="w-full px-3 min-h-[48px] py-2 rounded-lg bg-[#EFEFEF] text-sm font-pjs-regular p-3"
        />
      </View>
    </View>
  );
}
