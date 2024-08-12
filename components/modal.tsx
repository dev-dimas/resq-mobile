import { cn } from "@/lib/utils";
import { icons } from "@/constants";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Modal as RNModal, Text, TouchableOpacity, View } from "react-native";
import { ReactNode } from "react";

type Props = {
  isVisible: boolean;
  title: string;
  description?: string;
  titleConfirm?: string;
  titleCancel?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  buttonVariant?: "red" | "green";
  isLoading?: boolean;
  children?: ReactNode;
};

export default function Modal({
  isVisible,
  title,
  description,
  titleConfirm,
  titleCancel = "Batal",
  onClose,
  onConfirm,
  buttonVariant = "red",
  isLoading = false,
  children,
}: Props) {
  return (
    <>
      <StatusBar backgroundColor={isVisible ? "#00000066" : undefined} animated={false} />
      <RNModal animationType="fade" transparent={true} visible={isVisible}>
        <View className="flex items-center justify-center w-full h-full bg-black/40">
          <View className="w-[90%] mt-[-50%]">
            <View className="flex-row items-center justify-between px-5 py-3 bg-white rounded-t-xl">
              <Text
                className="text-base font-pjs-bold"
                style={{ includeFontPadding: false }}
              >
                {title}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
                <Image source={icons.close} className="w-6 h-6" />
              </TouchableOpacity>
            </View>
            <View className="flex px-5 py-3 bg-white">
              {children ? (
                children
              ) : (
                <Text className="text-[#1B1717] font-pjs-medium">{description}</Text>
              )}
            </View>
            <View
              className="flex-row justify-end px-5 py-3 bg-white rounded-b-xl"
              style={{ columnGap: 15 }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                className="px-3 py-2 border rounded-lg border-slate-800/20 bg-slate-800/20"
                onPress={onClose}
              >
                <Text
                  className="text-sm font-pjs-medium text-slate-800/80"
                  style={{ includeFontPadding: false }}
                >
                  {titleCancel}
                </Text>
              </TouchableOpacity>
              {titleConfirm && onConfirm && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  className={cn(
                    "px-3 py-2 rounded-lg",
                    buttonVariant === "red" ? "bg-[#FF3B30]" : "bg-[#49CB5C]"
                  )}
                  onPress={onConfirm}
                  disabled={isLoading}
                >
                  <Text
                    className="text-sm text-white font-pjs-medium"
                    style={{ includeFontPadding: false }}
                  >
                    {isLoading ? "Loading..." : titleConfirm}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </RNModal>
    </>
  );
}
