import { Picker } from "@react-native-picker/picker";
import { ClassValue } from "clsx";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Text, View } from "react-native";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  name: string;
  control: Control<FieldValues>;
  containerStyles?: ClassValue;
  defaultValue?: "Makanan" | "Minuman" | "Salad" | "Dessert";
  editable?: boolean;
};

export default function ProductCategoryPicker({
  label,
  name,
  control,
  containerStyles,
  defaultValue = "Makanan",
  editable = true,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className={cn(containerStyles)}>
          <View className="flex items-start px-3">
            <Text className="text-sm text-black font-pjs-bold">{label}</Text>
          </View>
          <View className="flex flex-row w-full mt-2 overflow-hidden rounded-lg">
            <Picker
              mode="dropdown"
              enabled={editable}
              selectedValue={value}
              onValueChange={onChange}
              style={{
                width: "100%",
                minHeight: 48,
                backgroundColor: "#EFEFEF",
                fontSize: 14,
                fontFamily: "PlusJakartaSans-Regular",
                color: editable ? "black" : "#B1B1B1",
              }}
            >
              <Picker.Item label="Makanan" value="Makanan" />
              <Picker.Item label="Minuman" value="Minuman" />
              <Picker.Item label="Salad" value="Salad" />
              <Picker.Item label="Dessert" value="Dessert" />
            </Picker>
          </View>
          {error && <Text className="ml-1 text-xs text-red-500">{error.message}</Text>}
        </View>
      )}
    />
  );
}
