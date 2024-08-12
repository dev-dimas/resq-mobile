import { priceToRupiah, twoDecimals } from "@/lib/utils";
import { icons } from "@/constants";
import { ProductNearby } from "@/data/product.data";
import { Image } from "expo-image";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import FavoriteButton from "./favorite-button";
import env from "@/env";
import Skeleton from "../skeleton";

type Props = {
  product: ProductNearby;
  withFavoriteButton?: boolean;
  hideDistance?: boolean;
  isLoading?: boolean;
};

export default function ProductCard({
  product,
  hideDistance = false,
  withFavoriteButton = false,
  isLoading = false,
}: Props) {
  return (
    <Skeleton isLoading={isLoading} height={102} marginTop={4} marginBottom={4}>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full p-4 my-1 overflow-hidden bg-white border border-opacity-50 rounded-lg border-slate-200"
        onPress={isLoading ? undefined : () => router.navigate(`/product/${product.id}`)}
      >
        <View className="flex flex-row gap-3 ">
          <Image
            source={env.EXPO_PUBLIC_API_URL + product.images[0]}
            contentFit="cover"
            placeholder={{ blurhash: product.imageBlurHash }}
            placeholderContentFit="cover"
            className="w-[70px] h-[70px] rounded-full"
          />
          <View className="flex flex-row items-center justify-between flex-1">
            <View className="flex justify-between flex-1 h-full">
              <View>
                <Text
                  className="w-auto text-base font-pjs-bold"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {product.name}
                </Text>
                {!hideDistance && (
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
                )}
              </View>
              <Text className="text-base font-pjs-bold text-[#FF3B30]">
                {priceToRupiah(product.price)}
              </Text>
            </View>
            {withFavoriteButton && (
              <Skeleton
                width={20}
                height={20}
                borderRadius={5}
                isLoading={!product.id || isLoading}
              >
                <FavoriteButton
                  productId={product.id}
                  buttonClassname="w-5 ml-5"
                  imageClassname="w-5 h-5"
                />
              </Skeleton>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Skeleton>
  );
}
