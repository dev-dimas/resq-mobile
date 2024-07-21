import BackButton from "@/components/back-button";
import SubscribeButton from "@/components/customer/subscribe-button";
import ImageViewer from "@/components/image-viewer";
import { priceToRupiah } from "@/lib/utils";
import { icons } from "constants/";
import { products } from "data/product.data";
import { seller } from "data/seller.data";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetail() {
  let { id } = useLocalSearchParams();
  id = id as string;

  const [isImageViewerVisible, setIsImageViewerVisible] = useState<boolean>(false);

  const product = products.find((product) => product.id === id);

  if (!product)
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Detail Not Found!",
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
              Produk tidak ditemukan!
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
          headerTitle: "Detail",
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
          <ImageViewer
            title="Foto Produk"
            images={[{ uri: product.images[0] }]}
            isVisible={isImageViewerVisible}
            setIsVisible={setIsImageViewerVisible}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsImageViewerVisible(true)}
          >
            <Image
              source={product.images[0]}
              className="w-[254px] h-[254px] rounded-full"
            />
          </TouchableOpacity>
          <View className="w-full mt-[14px] px-6 rounded-t-[20px] pt-5 bg-white flex-1 border border-slate-200 border-opacity-50">
            <View>
              <Text className="text-2xl font-pjs-bold">{product.name}</Text>

              {/* Seller information */}
              <View className="flex flex-row items-center py-3">
                <Image
                  source={seller.account.avatar}
                  className="w-12 h-12 rounded-full"
                />
                <View className="flex justify-center flex-1 ml-3 mr-5">
                  <Text
                    className="text-base font-pjs-bold"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {seller.account.name}
                  </Text>
                  <View className="flex flex-row items-center">
                    <Image
                      source={icons.location}
                      tintColor="#757575"
                      className="w-3 h-3"
                    />
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

              {/* Product description */}
              <Text className="mb-2 text-base font-pjs-bold">Deskripsi</Text>
            </View>

            <ScrollView
              className="flex-1 mx-[-24px]"
              contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 12 }}
            >
              <Text className="text-sm font-pjs-regular">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum minima
                eaque dicta labore dolorum animi voluptates deserunt accusantium, beatae
                aut, quidem delectus illo recusandae. Omnis aut et quod laborum dolorem
                nesciunt beatae, accusamus quae quasi ipsam dicta molestias vero,
                consequuntur distinctio rerum recusandae delectus eaque similique est unde
                voluptatem! Eius consequatur voluptates minima autem recusandae inventore,
                asperiores facilis, ab est soluta dicta sunt nemo. Magni, eius! Deserunt
                iste impedit quisquam aspernatur quae? Eveniet minus, harum, eaque maiores
                amet quo ullam sequi maxime saepe consequuntur, quisquam hic vel quia
                voluptate facilis culpa nemo. Libero debitis commodi odit possimus
                consequatur quaerat temporibus nobis aliquid in reprehenderit delectus
                nulla nisi provident minus, a alias? Qui quibusdam eius placeat ducimus
                beatae nam molestias, aliquam quas quaerat minus vitae, delectus debitis
                explicabo? Reiciendis consequuntur perspiciatis doloribus nulla quis qui
                assumenda non similique aut quaerat facilis eligendi, quibusdam deleniti
                sequi excepturi. Facilis magnam numquam enim repellendus! End of line.
              </Text>
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
                {priceToRupiah(product.price)}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              className="px-4 py-3 rounded-lg bg-[#FF3B30]"
              onPress={() => console.log("Should get maps app")}
            >
              <Text className="text-sm text-white font-pjs-bold">Buka di Maps</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
