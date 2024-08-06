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
            <View className="flex-row items-center justify-end px-5 py-3 bg-white rounded-t-xl">
              <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
                <Image source={icons.close} className="w-6 h-6" />
              </TouchableOpacity>
            </View>
            <View className="flex px-5 pb-6 bg-white rounded-b-xl" style={{ rowGap: 10 }}>
              {selectList.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  className={cn(
                    "items-center px-2 py-3 border rounded-md border-black/30",
                    item.isAvatarDeleteMenu && !isUserAvatar && "hidden"
                  )}
                  key={index}
                  onPress={item.onPress}
                >
                  <Text className="text-[#1B1717] font-pjs-semibold text-sm">
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
