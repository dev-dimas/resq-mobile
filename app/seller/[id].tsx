import { View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import BackButton from "@/components/back-button";
import { SafeAreaView } from "react-native-safe-area-context";
import SubscribeButton from "@/components/customer/subscribe-button";
import { subscriptions } from "data/subscription.data";
import { Image } from "expo-image";
import icons from "constants/icons";
import { FlashList } from "@shopify/flash-list";
import ProductCard from "@/components/customer/product-card";
import ImageViewer from "@/components/image-viewer";

export default function SellerId() {
  let { id } = useLocalSearchParams();
  id = id as string;
  const [isImageViewerVisible, setIsImageViewerVisible] = useState<boolean>(false);

  const seller = subscriptions.find((subscription) => subscription.id === id);

  if (!seller)
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Seller Not Found!",
            headerTitleStyle: {
              fontFamily: "PlusJakartaSans-Bold",
              fontSize: 20,
              color: "#1B1717",
            },
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#F8F8F9",
            },
            headerShadowVisible: false,
            headerLeft: () => <BackButton />,
          }}
        />
        <SafeAreaView>
          <View>
            <Text className="text-base text-center text-red-500 font-pjs-extrabold">
              Penjual tidak ditemukan!
            </Text>
          </View>
        </SafeAreaView>
      </>
    );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Penjual",
          headerTitleStyle: {
            fontFamily: "PlusJakartaSans-Bold",
            fontSize: 20,
            color: "#1B1717",
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F8F8F9",
          },
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
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
              images={[seller.avatar]}
              isVisible={isImageViewerVisible}
              setIsVisible={setIsImageViewerVisible}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsImageViewerVisible(true)}
            >
              <Image source={seller.avatar} className="w-12 h-12 rounded-full" />
            </TouchableOpacity>
            <View className="flex justify-center flex-1 ml-3 mr-5">
              <Text
                className="text-base font-pjs-bold"
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {seller.name}
              </Text>
              <View className="flex flex-row items-center">
                <Image source={icons.location} tintColor="#757575" className="w-3 h-3" />
                <Text
                  className="text-xs font-pjs-regular"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {seller.address}
                </Text>
              </View>
              <Text className="font-pjs-regular text-[10px]">
                {seller.subscriber} Subscriber
              </Text>
            </View>
            <SubscribeButton />
          </View>

          {/* List Product Section */}
          <View className="w-full flex-1 rounded-t-[20px] pt-3 mt-6 bg-white">
            <Text className="text-base font-pjs-bold text-[#1B1717] px-6">Produk</Text>

            <ScrollView className="flex-1 w-full h-full px-6 mt-3">
              <FlashList
                data={seller.products}
                estimatedItemSize={109}
                estimatedListSize={{ width: 364, height: 805 }}
                renderItem={({ item }) => {
                  return <ProductCard product={item} withFavoriteButton hideDistance />;
                }}
                ListEmptyComponent={
                  <Text className="text-center font-pjs-regular">
                    Etalase penjual masih kosong!
                  </Text>
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
