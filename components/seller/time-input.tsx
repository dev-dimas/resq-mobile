import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import RNDateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  label?: string;
  name: string;
  control: Control<FieldValues>;
  defaultValue?: Date;
  containerStyles?: ClassValue;
  disabled?: boolean;
};

const TimeInput = React.memo(
  ({ label, name, control, defaultValue, containerStyles, disabled = false }: Props) => {
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

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
              <TouchableOpacity
                activeOpacity={0.7}
                className={cn(
                  "w-full px-3 min-h-[48px] py-2 rounded-lg bg-[#EFEFEF] text-sm font-pjs-regular p-3 border border-[#EFEFEF]",
                  error && "bg-red-100 border-red-500"
                )}
                onPress={() => setShowTimePicker(true)}
                disabled={disabled}
              >
                <Text className="text-sm font-pjs-regular text-[#757575]">
                  {value === "" ? "--:--" : dayjs(value).format("HH:mm")}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <RNDateTimePicker
                  display="spinner"
                  mode="time"
                  value={value === "" ? new Date() : new Date(value)}
                  onChange={(e, selectedTime) => {
                    if (e.type === "set") {
                      onChange(selectedTime);
                    }
                    setShowTimePicker(false);
                  }}
                  is24Hour
                  themeVariant="light"
                />
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

export default TimeInput;
TimeInput.displayName = "TimeInput";
