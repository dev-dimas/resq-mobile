import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { cn } from "../lib/utils";
import { ClassValue } from "clsx";
import { Control, Controller, FieldValues } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  control: Control<FieldValues>;
  containerStyles?: ClassValue;
};

export default function RolePicker({ label, name, control, containerStyles }: Props) {
  const [asCustomer, setAsCustomer] = useState<"true" | "false">("true");
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={"true"}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className={cn(containerStyles)}>
          <View className="flex items-start px-3">
            <Text className="text-sm text-black font-pjs-bold">{label}</Text>
          </View>
          <View className="flex flex-row w-full mt-2 overflow-hidden rounded-lg">
            <Picker
              mode="dropdown"
              selectedValue={value}
              onValueChange={onChange}
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
          {error && <Text className="ml-1 text-xs text-red-500">{error.message}</Text>}
        </View>
      )}
    />
  );
}
