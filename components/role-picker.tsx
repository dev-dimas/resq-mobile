import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { cn } from "../lib/utils";
import { ClassValue } from "clsx";

type Props = {
  label: string;
  containerStyles?: ClassValue;
};

export default function RolePicker({ label, containerStyles }: Props) {
  const [asCustomer, setAsCustomer] = useState<"true" | "false">("true");
  return (
    <View className={cn(containerStyles)}>
      <View className="flex items-start px-3">
        <Text className="text-sm text-black font-pjs-bold">{label}</Text>
      </View>
      <View className="flex flex-row w-full mt-2 overflow-hidden rounded-lg">
        <Picker
          mode="dropdown"
          selectedValue={asCustomer}
          onValueChange={(itemValue) => setAsCustomer(itemValue)}
          style={{
            width: "100%",
            minHeight: 48,
            backgroundColor: "#EFEFEF",
            fontSize: 14,
            fontFamily: "PlusJakartaSans-Regular",
          }}
        >
          <Picker.Item label="Konsumen" value="true" />
          <Picker.Item label="Penjual" value="false" />
        </Picker>
      </View>
    </View>
  );
}
