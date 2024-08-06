import { icons } from "@/constants";
import { Image } from "expo-image";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onRequestClose: () => void;
  onRequestEdit?: () => void;
  onRequestDelete?: () => void;
  title: string;
};

export default function CustomHeaderImageViewer({
  onRequestClose,
  onRequestEdit,
  onRequestDelete,
  title,
}: Props) {
  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-between w-full px-3 mt-3">
        <View className="flex-row items-center w-[60%]">
          <TouchableOpacity activeOpacity={0.7} onPress={onRequestClose}>
            <Image source={icons.arrowLeft} tintColor="white" className="w-9 h-9" />
          </TouchableOpacity>
          <Text
            className="ml-3 text-xl text-white font-pjs-semibold"
            style={{ includeFontPadding: false }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        {(onRequestEdit || onRequestDelete) && (
          <View className="flex-row items-center" style={{ columnGap: 25 }}>
            {onRequestEdit && (
              <TouchableOpacity activeOpacity={0.7} onPress={onRequestEdit}>
                <Image source={icons.pencil} className="w-5 h-5" />
              </TouchableOpacity>
            )}
            {onRequestDelete && (
              <TouchableOpacity activeOpacity={0.7} onPress={onRequestDelete}>
                <Image source={icons.trash} className="w-6 h-6" tintColor="white" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
