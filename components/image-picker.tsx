import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { icons, images } from "@/constants";
import { Image } from "expo-image";
import * as ExpoImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import ModalSelect from "./modal-select";
import ImageViewer from "./image-viewer";
import env from "@/env";

type Props = {
  name: string;
  control: Control<FieldValues>;
  viewerTitle?: string;
  isUserAvatar?: boolean;
  defaultValue?: string | null;
  buttonStyles?: ClassValue;
  imageStyles?: ClassValue;
  disabled?: boolean;
  handleSave?: (
    image: ExpoImagePicker.ImagePickerSuccessResult
  ) => Promise<{ message: string }>;
  handleDelete?: () => Promise<void>;
  setProductImage?: React.Dispatch<
    React.SetStateAction<ExpoImagePicker.ImagePickerSuccessResult | null>
  >;
};

export default function ImagePicker({
  name,
  control,
  viewerTitle = "Foto Produk",
  isUserAvatar = false,
  defaultValue = null,
  buttonStyles,
  imageStyles,
  disabled = false,
  handleSave,
  handleDelete,
  setProductImage,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState<boolean>(false);
  const imagePlaceholder = isUserAvatar ? icons.user : images.camera;

  const pickImage = async (onChange: (...event: any[]) => void) => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const uri = result.assets[0].uri;

        if (isUserAvatar && handleSave) await handleSave(result);
        if (setProductImage) setProductImage(result);

        onChange(uri);
      } catch (error) {
        return;
      }
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
      defaultValue={defaultValue ? env.EXPO_PUBLIC_API_URL + defaultValue : ""}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            className={cn("w-24 h-24 rounded-full", buttonStyles)}
            disabled={disabled}
            onPress={() => {
              if (!value) {
                pickImage(onChange);
                return;
              }
              setIsModalOpen(true);
            }}
          >
            <Image
              source={value ? { uri: value } : imagePlaceholder}
              className={cn(
                "w-24 h-24 rounded-full",
                imageStyles,
                !value && "border border-slate-300"
              )}
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
            title={viewerTitle}
          />
          <ModalSelect
            isVisible={isModalOpen}
            selectList={[
              {
                title: "Lihat",
                onPress: () => {
                  setIsModalOpen(false);
                  setIsImageViewerOpen(true);
                },
                icon: icons.eyeMd,
                isAvatarDeleteMenu: false,
                color: "#49CB5C",
              },
              {
                title: "Ganti",
                onPress: () => {
                  setIsModalOpen(false);
                  pickImage(onChange);
                },
                icon: icons.image,
                isAvatarDeleteMenu: false,
                color: "#FDBF43",
              },
              {
                title: "Hapus",
                onPress: async () => {
                  if (!handleDelete) return;
                  await handleDelete().then(() => {
                    onChange(null);
                  });
                  setIsModalOpen(false);
                },
                icon: icons.trash,
                isAvatarDeleteMenu: true,
                color: "#FF3B30",
              },
            ]}
            onClose={() => setIsModalOpen(false)}
            isUserAvatar={isUserAvatar}
          />
        </>
      )}
    />
  );
}
