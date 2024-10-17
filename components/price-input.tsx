import { ClassValue } from "clsx";
import React, { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { cn, priceToRupiah } from "../lib/utils";

type Props = {
  label?: string;
  name: string;
  control: Control<FieldValues>;
  type?: "text" | "password";
  defaultValue?: string;
  containerStyles?: ClassValue;
} & TextInputProps;

const PriceInput = React.memo(
  ({
    label,
    name,
    control,
    type = "text",
    defaultValue = "",
    containerStyles,
    ...props
  }: Props) => {
    const [rawValue, setRawValue] = useState<string>(defaultValue);

    const handleChangeText = (text: string, onChange: (value: string) => void) => {
      if (Number(text) === 0) return;
      const cleanedValue = text.replace(/[^0-9]/g, "");
      setRawValue(cleanedValue);
      onChange(cleanedValue);
    };

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => {
          const formattedValue = rawValue ? priceToRupiah(rawValue) : "";
          return (
            <View className={cn(containerStyles)}>
              {label && (
                <View className="flex items-start px-3">
                  <Text className="text-sm text-black font-pjs-bold">{label}</Text>
                </View>
              )}
              <View className="flex flex-row items-center w-full mt-2">
                <TextInput
                  placeholder={props.placeholder || label}
                  placeholderTextColor={"#757575"}
                  style={{
                    includeFontPadding: false,
                    textAlignVertical: props.multiline ? "top" : "center",
                  }}
                  className={cn(
                    "w-full px-3 min-h-[48px] py-2 rounded-lg bg-[#EFEFEF] text-sm font-pjs-regular p-3 border border-[#EFEFEF]",
                    error && "bg-red-100 border-red-500"
                  )}
                  value={formattedValue}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    handleChangeText(text, onChange);
                  }}
                  ref={ref}
                  {...props}
                />
              </View>
              {error && (
                <Text className="ml-1 text-xs text-red-500 font-pjs-semibold">
                  {error.message}
                </Text>
              )}
            </View>
          );
        }}
      />
    );
  }
);

export default PriceInput;
PriceInput.displayName = "PriceInput";
