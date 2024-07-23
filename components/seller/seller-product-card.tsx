import { priceToRupiah } from "@/lib/utils";
import { icons } from "constants/";
import { ProductNearby } from "data/product.data";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  product: ProductNearby;
  setIsModalDeleteOpen: Dispatch<SetStateAction<boolean>>;
  setProductToBeDelete: Dispatch<SetStateAction<ProductNearby | null>>;
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
        //   onPress={() => router.push(`/product/${product.id}`)}
      >
        <View className="flex flex-row items-center gap-3">
          <Image
            source={product.images[0]}
            contentFit="cover"
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
                onPress={() => router.push(`/seller/edit-product/${product.id}`)}
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
