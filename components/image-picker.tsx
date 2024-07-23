import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { images } from "constants/";
import { Image } from "expo-image";
import * as ExpoImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

type Props = {
  label?: string;
  name: string;
  control: Control<FieldValues>;
  type?: "text" | "password";
  defaultValue?: string | null;
  buttonStyles?: ClassValue;
  imageStyles?: ClassValue;
};

export default function ImagePicker({
  name,
  control,
  defaultValue = null,
  buttonStyles,
  imageStyles,
}: Props) {
  const pickImage = async (onChange: (...event: any[]) => void) => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  useEffect(() => {
    (async () => {
      if (Constants.platform?.ios) {
        const cameraRollStatus =
          await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraRollStatus.status !== "granted") {
          alert("Izinkan akses ke galeri untuk dapat memilih foto");
        }
      }
    })();
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            className={cn("w-24 h-24 rounded-full", buttonStyles)}
            onPress={() => pickImage(onChange)}
          >
            <Image
              source={value ? { uri: value } : images.camera}
              className={cn("w-24 h-24 rounded-full", imageStyles)}
              contentFit="cover"
            />
          </TouchableOpacity>
          {error && (
            <Text className="ml-1 text-xs text-red-500 font-pjs-semibold">
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
}
