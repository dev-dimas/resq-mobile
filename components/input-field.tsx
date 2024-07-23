import { ClassValue } from "clsx";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { cn } from "../lib/utils";
import React, { useState } from "react";
import { Image } from "expo-image";
import { icons } from "@/constants";
import { Control, Controller, FieldValues } from "react-hook-form";

type Props = {
  label?: string;
  name: string;
  control: Control<FieldValues>;
  type?: "text" | "password";
  defaultValue?: string;
  containerStyles?: ClassValue;
} & TextInputProps;

const InputField = React.memo(
  ({
    label,
    name,
    control,
    type = "text",
    defaultValue,
    containerStyles,
    ...props
  }: Props) => {
    const [showText, setShowText] = useState(false);

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                value={value}
                onChangeText={
                  props.keyboardType === "numeric"
                    ? (text) => onChange(text.replace(/[^0-9]/g, ""))
                    : onChange
                }
                secureTextEntry={type === "password" && !showText}
                {...props}
              />

              {type === "password" && (
                <TouchableOpacity
                  onPress={() => setShowText(!showText)}
                  className="absolute right-3"
                >
                  <Image
                    source={!showText ? icons.eye : icons.eyeHide}
                    className="w-5 h-5"
                    contentFit="cover"
                  />
                </TouchableOpacity>
              )}
            </View>
            {error && (
              <Text className="ml-1 text-xs text-red-500 font-pjs-semibold">
                {error.message}
              </Text>
            )}
          </View>
        )}
      />
    );
  }
);

export default InputField;
InputField.displayName = "InputField";
