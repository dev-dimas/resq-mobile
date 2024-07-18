import { FlashList } from "@shopify/flash-list";
import { images } from "constants/";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

const categories = [
  {
    title: "Makanan",
    image: images.categoryFood,
  },
  {
    title: "Minuman",
    image: images.categoryDrink,
  },
  {
    title: "Salad",
    image: images.categorySalad,
  },
  {
    title: "Dessert",
    image: images.categoryDessert,
  },
];

export default function CategoryList() {
  return (
    <View className="mt-4">
      <Text className="text-base font-pjs-bold text-[#1B1717]">Kategori</Text>
      <View className="flex flex-row justify-between w-full">
        {categories.map((category) => (
          <TouchableOpacity
            key={category.title}
            activeOpacity={0.7}
            className="flex items-center gap-1 mt-4"
            onPress={() => console.log(category.title)}
          >
            <View className="w-[70px] h-[70px] bg-[#F1F1F1] flex items-center justify-center rounded-full">
              <Image
                source={category.image}
                contentFit="contain"
                className="w-12 h-12 rounded-full"
              />
            </View>
            <Text className="text-sm font-pjs-bold text-[#1B1717]">{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
