import FavoriteButton from "@/components/customer/favorite-button";
import SellerAddress from "@/components/customer/seller-address";
import SubscribeButton from "@/components/customer/subscribe-button";
import Header from "@/components/header";
import ImageViewer from "@/components/image-viewer";
import NotFound from "@/components/not-found";
import { priceToRupiah } from "@/lib/utils";
import { icons } from "@/constants";
import env from "@/env";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import useProductById from "@/hooks/query/useProductById";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "@/components/skeleton";

export default function ProductDetail() {
  let { id } = useLocalSearchParams();
  id = id as string;
  const { data, isPending } = useProductById(id);

  const [isImageViewerVisible, setIsImageViewerVisible] = useState<boolean>(false);
  useEffect(() => {}, [data]);

  if (!data?.data && !isPending)
    return <NotFound withHeader>Produk tidak ditemukan!</NotFound>;

  const handleOpenMaps = () => {
    const scheme = Platform.select({ ios: "maps://0,0?q=", android: "geo:0,0?q=" });
    const latLng = `${data?.data.product.seller.latitude},${data?.data.product.seller.longitude}`;
    const label = data?.data.product.seller.account.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url!);
  };

  return (
    <>
      <Header
        title="Detail"
        withBackButton
        isLoading={isPending}
        options={{
          headerRight: () => (
            <FavoriteButton
              productId={data?.data.product.id || ""}
              buttonClassname="w-5 h-5 mr-2"
              imageClassname="w-5 h-5"
            />
          ),
        }}
      />
      <SafeAreaView className="h-full min-h-full bg-[#F8F8F9]">
        <View
          className="flex items-center h-full w-full mt-[-15px] min-h-full"
          style={{
            minWidth: Dimensions.get("window").width,
          }}
        >
          <ImageViewer
            title="Foto Produk"
            images={[{ uri: env.EXPO_PUBLIC_API_URL + data?.data.product.images[0] }]}
            isVisible={isImageViewerVisible}
            setIsVisible={setIsImageViewerVisible}
          />
          <Skeleton isLoading={isPending} borderRadius={9999} width={254} height={254}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsImageViewerVisible(true)}
            >
              <Image
                source={env.EXPO_PUBLIC_API_URL + data?.data.product.images[0]}
                contentFit="cover"
                placeholder={data?.data.product.imageBlurHash}
                placeholderContentFit="cover"
                className="w-[254px] h-[254px] rounded-full"
              />
            </TouchableOpacity>
          </Skeleton>
          <View className="w-full mt-[14px] px-6 rounded-t-[20px] pt-5 bg-white flex-1 border border-slate-200 border-opacity-50">
            <View>
              <Skeleton isLoading={isPending} height={32} width={200}>
                <Text className="text-2xl font-pjs-bold">{data?.data.product.name}</Text>
              </Skeleton>

              {/* Seller information */}
              <View className="flex flex-row items-center py-3">
                <TouchableOpacity
                  className="flex-row items-center flex-1"
                  activeOpacity={0.7}
                  onPress={() =>
                    router.navigate(`/seller/${data?.data.product.sellerId}`)
                  }
                >
                  <Skeleton
                    isLoading={isPending}
                    borderRadius={9999}
                    width={48}
                    height={48}
                  >
                    <Image
                      source={
                        data?.data.product.seller.account.avatar
                          ? env.EXPO_PUBLIC_API_URL +
                            data?.data.product.seller.account.avatar
                          : icons.user
                      }
                      contentFit="cover"
                      placeholder={
                        data?.data.product.seller.account.avatarBlurHash || undefined
                      }
                      placeholderContentFit="cover"
                      className="w-12 h-12 rounded-full"
                    />
                  </Skeleton>
                  <View className="flex justify-center flex-1 ml-3 mr-5">
                    <Skeleton isLoading={isPending} height={24}>
                      <Text
                        className="text-base font-pjs-bold"
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {data?.data.product.seller.account.name}
                      </Text>
                    </Skeleton>
                    <Skeleton isLoading={isPending} height={16}>
                      <View className="flex flex-row items-center">
                        <Image
                          source={icons.location}
                          tintColor="#757575"
                          className="w-3 h-3"
                        />
                        <SellerAddress address={data?.data.product.seller.address} />
                      </View>
                    </Skeleton>
                    <Skeleton isLoading={isPending} height={12} width={60} marginTop={3}>
                      <Text className="font-pjs-regular text-[10px]">
                        {data?.data.product.seller.subscriber} Subscriber
                      </Text>
                    </Skeleton>
                  </View>
                </TouchableOpacity>
                <SubscribeButton
                  sellerId={data?.data.product.sellerId || ""}
                  productId={data?.data.product.id}
                  isLoading={isPending}
                />
              </View>

              {/* Product description */}
              <Skeleton isLoading={isPending} height={32} width={100}>
                <Text className="mb-2 text-base font-pjs-bold">Deskripsi</Text>
              </Skeleton>
            </View>

            <ScrollView
              className="flex-1 mx-[-24px]"
              contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 12 }}
            >
              {isPending ? (
                <>
                  <Skeleton
                    isLoading={isPending}
                    height={20}
                    width={"100%"}
                    marginBottom={4}
                  >
                    <></>
                  </Skeleton>
                  <Skeleton
                    isLoading={isPending}
                    height={20}
                    width={"100%"}
                    marginBottom={4}
                  >
                    <></>
                  </Skeleton>
                  <Skeleton
                    isLoading={isPending}
                    height={20}
                    width={"50%"}
                    marginBottom={4}
                  >
                    <></>
                  </Skeleton>
                </>
              ) : (
                <Text className="text-sm font-pjs-regular">
                  {data.data.product.description}
                </Text>
              )}
            </ScrollView>
          </View>

          {/* Call to action */}
          <View className="w-full h-[106px] border-t border-slate-200 border-opacity-50 flex flex-row justify-between items-center p-6 pb-9">
            <View className="flex-1">
              <Text className="text-sm font-pjs-regular">Harga</Text>
              <Text
                className="text-2xl font-pjs-bold text-[#FF3B30]"
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {!isPending && priceToRupiah(data?.data.product.price)}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              className="px-4 py-3 rounded-lg bg-[#FF3B30]"
              onPress={handleOpenMaps}
            >
              <Text className="text-sm text-white font-pjs-bold">Buka di Maps</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
