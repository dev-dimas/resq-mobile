import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { images } from "constants/";
import { Image } from "expo-image";
import * as ExpoImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import ModalSelect from "./modal-select";
import ImageViewer from "./image-viewer";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState<boolean>(false);

  const pickImage = async (onChange: (...event: any[]) => void) => {
    // No permissions request is necessary for launching the image library
    const result = await ExpoImagePicker.launchImageLibraryAsync({
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
            onPress={() => {
              if (!value) {
                pickImage(onChange);
                return;
              }
              setIsModalOpen(true);
            }}
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
          <ImageViewer
            images={[{ uri: value }]}
            isVisible={isImageViewerOpen}
            setIsVisible={setIsImageViewerOpen}
            title="Foto Produk"
          />
          <ModalSelect
            isVisible={isModalOpen}
            selectList={[
              {
                title: "Lihat foto",
                onPress: () => {
                  setIsModalOpen(false);
                  setIsImageViewerOpen(true);
                },
              },
              {
                title: "Ganti foto",
                onPress: () => {
                  setIsModalOpen(false);
                  pickImage(onChange);
                },
              },
            ]}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
    />
  );
}
