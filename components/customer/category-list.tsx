import { images } from "@/constants";
import { useSession } from "@/store/useSession";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Skeleton from "../skeleton";

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
  const { user } = useSession();
  return (
    <View className="mt-4">
      <Text className="text-base font-pjs-bold text-[#1B1717]">Kategori</Text>
      <View className="flex flex-row justify-between w-full">
        {categories.map((category) => (
          <Skeleton
            isLoading={!user}
            marginTop={16}
            width={70}
            height={70}
            borderRadius={9999}
            key={category.title}
          >
            <TouchableOpacity
              key={category.title}
              activeOpacity={0.7}
              className="flex items-center gap-1 mt-4"
              onPress={() => router.navigate(`/category/${category.title.toLowerCase()}`)}
            >
              <View className="w-[70px] h-[70px] bg-[#F1F1F1] flex items-center justify-center rounded-full">
                <Image
                  source={category.image}
                  contentFit="contain"
                  className="w-12 h-12 rounded-full"
                />
              </View>
              <Text className="text-sm font-pjs-bold text-[#1B1717]">
                {category.title}
              </Text>
            </TouchableOpacity>
          </Skeleton>
        ))}
      </View>
    </View>
  );
}
