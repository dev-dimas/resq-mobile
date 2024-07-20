import { priceToRupiah, twoDecimals } from "@/lib/utils";
import { icons } from "constants/";
import { ProductNearby } from "data/product.data";
import { Image } from "expo-image";
import { View, Text, TouchableOpacity } from "react-native";

export default function ProductCard({ product }: { product: ProductNearby }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full p-4 my-1 overflow-hidden bg-white border border-opacity-50 rounded-lg border-slate-200"
    >
      <View className="flex flex-row w-full gap-3 ">
        <Image
          source={product.images[0]}
          contentFit="cover"
          className="w-[70px] h-[70px] rounded-full"
        />
        <View className="flex justify-between flex-1">
          <View>
            <Text
              className="w-auto text-base font-pjs-bold"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {product.name}
            </Text>
            <View className="flex flex-row items-center gap-1">
              <Image
                source={icons.location}
                className="h-3 aspect-square"
                tintColor="#757575"
              />
              <Text
                className="text-xs font-pjs-regular text-[#757575]"
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {twoDecimals(product.distance)} km
              </Text>
            </View>
          </View>
          <Text className="text-base font-pjs-bold text-[#FF3B30]">
            {priceToRupiah(product.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
