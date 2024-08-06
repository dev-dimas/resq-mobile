import ProductCard from "@/components/customer/product-card";
import SellerAddress from "@/components/customer/seller-address";
import SubscribeButton from "@/components/customer/subscribe-button";
import Header from "@/components/header";
import ImageViewer from "@/components/image-viewer";
import NotFound from "@/components/not-found";
import { FlashList } from "@shopify/flash-list";
import { icons } from "@/constants";
import env from "@/env";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import useGetSellerById from "@/hooks/query/useGetSellerById";
import React, { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "@/components/skeleton";

export default function SellerId() {
  let { id } = useLocalSearchParams();
  id = id as string;
  const { data: seller, isPending } = useGetSellerById(id);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState<boolean>(false);

  if (!seller?.data && !isPending)
    return <NotFound withHeader>Penjual tidak ditemukan!</NotFound>;

  return (
    <>
      <Header title="Penjual" withBackButton isLoading={isPending} />
      <SafeAreaView className="h-full min-h-full bg-[#F8F8F9]">
        <View
          className="flex items-center h-full w-full mt-[-15px] min-h-full"
          style={{
            minWidth: Dimensions.get("window").width,
          }}
        >
          <View className="flex-row items-center px-6">
            <ImageViewer
              title="Foto Profile Penjual"
              images={[
                seller?.data?.avatar
                  ? { uri: env.EXPO_PUBLIC_API_URL + seller?.data?.avatar }
                  : icons.user,
              ]}
              isVisible={isImageViewerVisible}
              setIsVisible={setIsImageViewerVisible}
            />
            <Skeleton isLoading={isPending} borderRadius={9999} width={48} height={48}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsImageViewerVisible(true)}
              >
                <Image
                  source={
                    seller?.data?.avatar
                      ? env.EXPO_PUBLIC_API_URL + seller?.data?.avatar
                      : icons.user
                  }
                  contentFit="cover"
                  placeholder={
                    seller?.data?.avatarBlurHash ? seller.data?.avatarBlurHash : undefined
                  }
                  placeholderContentFit={
                    seller?.data?.avatarBlurHash ? "cover" : undefined
                  }
                  className="w-12 h-12 rounded-full"
                />
              </TouchableOpacity>
            </Skeleton>
            <View className="flex justify-center flex-1 ml-3 mr-5">
              <Skeleton isLoading={isPending} height={24}>
                <Text
                  className="text-base font-pjs-bold"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {seller?.data?.name}
                </Text>
              </Skeleton>

              <Skeleton isLoading={isPending} height={16}>
                <View className="flex flex-row items-center">
                  <Image
                    source={icons.location}
                    tintColor="#757575"
                    className="w-3 h-3"
                  />
                  <SellerAddress address={seller?.data?.address} />
                </View>
              </Skeleton>
              <Skeleton isLoading={isPending} height={11} width={60} marginTop={3}>
                <Text className="font-pjs-regular text-[10px]">
                  {seller?.data?.subscriber} Subscriber
                </Text>
              </Skeleton>
            </View>
            <SubscribeButton sellerId={seller?.data?.accountId || ""} />
          </View>

          {/* List Product Section */}
          <View className="w-full flex-1 rounded-t-[20px] pt-3 mt-6 bg-white">
            <Skeleton isLoading={isPending} height={24} width={100} marginLeft={24}>
              <Text className="text-base font-pjs-bold text-[#1B1717] px-6">Produk</Text>
            </Skeleton>

            <ScrollView className="flex-1 w-full h-full px-6 mt-3">
              <FlashList
                data={seller?.data?.products}
                estimatedItemSize={109}
                estimatedListSize={{ width: 364, height: 805 }}
                renderItem={({ item }) => {
                  return (
                    <ProductCard product={item as any} withFavoriteButton hideDistance />
                  );
                }}
                ListEmptyComponent={() =>
                  !isPending && (
                    <Text className="text-center font-pjs-regular">
                      Etalase penjual masih kosong!
                    </Text>
                  )
                }
                contentContainerStyle={{
                  paddingBottom: 40,
                }}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
