import { Image, ImageSource } from "expo-image";
import { View } from "react-native";

type Props = {
  icon: string | ImageSource;
  focusedIcon?: string | ImageSource | null;
  color: string;
  focused: boolean;
};
export default function TabIcon({ icon, focusedIcon = null, color, focused }: Props) {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={(focused && focusedIcon) || icon}
        contentFit="contain"
        tintColor={color}
        className="w-6 h-6"
      />
    </View>
  );
}
