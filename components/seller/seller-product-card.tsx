import { priceToRupiah } from "@/lib/utils";
import { icons } from "@/constants";
import env from "@/env";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Product } from "@/types/product.type";

type Props = {
  product: Product;
  setIsModalDeleteOpen: Dispatch<SetStateAction<boolean>>;
  setProductToBeDelete: Dispatch<SetStateAction<Product | null>>;
};

export default function SellerProductCard({
  product,
  setIsModalDeleteOpen,
  setProductToBeDelete,
}: Props) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        className="w-full p-4 my-1 overflow-hidden bg-white border border-opacity-50 rounded-lg border-slate-200 h-[113px]"
      >
        <View className="flex flex-row items-center gap-3">
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
              </View>
              <Text className="text-base font-pjs-bold text-[#FF3B30]">
                {priceToRupiah(product.price)}
              </Text>
            </View>
            <View className="justify-between h-full ml-5">
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-2 bg-[#FDBF43] rounded-lg w-[30px] h-[30px]"
                onPress={() => router.navigate(`/seller/edit-product/${product.id}`)}
              >
                <Image
                  source={icons.pencil}
                  className="w-[13px] h-[13px]"
                  tintColor="white"
                  contentFit="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-2 bg-[#FF3B30] rounded-lg w-[30px] h-[30px]"
                onPress={() => {
                  setProductToBeDelete(product);
                  setIsModalDeleteOpen(true);
                }}
              >
                <Image
                  source={icons.trashFill}
                  className="w-[13px] h-[13px]"
                  tintColor="white"
                  contentFit="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
