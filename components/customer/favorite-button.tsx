import { cn } from "@/lib/utils";
import { icons } from "constants/";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";

type Props = {
  buttonClassname?: string;
  imageClassname?: string;
};

export default function FavoriteButton({ buttonClassname, imageClassname }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(buttonClassname)}
      onPress={() => console.log("Fav")}
    >
      <Image
        source={icons.heartFill}
        contentFit="contain"
        className={cn(imageClassname)}
        tintColor="#FF3B30"
      />
    </TouchableOpacity>
  );
}
