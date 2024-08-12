import { cn } from "@/lib/utils";
import { icons } from "@/constants";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Modal as RNModal, Text, TouchableOpacity, View } from "react-native";

type Props = {
  isVisible: boolean;
  selectList: {
    title: string;
    onPress: () => void;
    isAvatarDeleteMenu?: boolean;
    icon?: string;
    color?: string;
  }[];
  onClose: () => void;
  isUserAvatar?: boolean;
};

export default function ModalSelect({
  isVisible,
  selectList,
  onClose,
  isUserAvatar = false,
}: Props) {
  return (
    <>
      <StatusBar backgroundColor={isVisible ? "#00000066" : undefined} animated={false} />
      <RNModal animationType="fade" transparent={true} visible={isVisible}>
        <View className="flex items-center justify-center w-full h-full bg-black/40">
          <View className="w-[90%] mt-[-50%]">
            <View className="flex-row items-center justify-end py-3 bg-white rounded-t-xl">
              <Text className="absolute w-full text-base text-center font-pjs-bold">
                {isUserAvatar ? "Foto Profile" : "Foto Produk"}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={onClose} className="px-5">
                <Image source={icons.close} className="w-6 h-6" />
              </TouchableOpacity>
            </View>
            <View
              className="flex-row w-full px-5 pt-3 pb-6 bg-white rounded-b-xl"
              style={{ columnGap: 10 }}
            >
              {selectList.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  className={cn(
                    "items-center px-2 py-3 rounded-md flex-1 bg-[#EFEFEF]",
                    item.isAvatarDeleteMenu && !isUserAvatar && "hidden"
                  )}
                  key={index}
                  onPress={item.onPress}
                >
                  {item.icon && (
                    <Image
                      source={item.icon}
                      className="w-6 h-6"
                      tintColor={item.color || "#1B1717"}
                    />
                  )}
                  <Text className="text-sm text-slate-800 font-pjs-semibold">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </RNModal>
    </>
  );
}
