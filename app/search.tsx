import BackButton from "@/components/back-button";
import ProductCard from "@/components/customer/product-card";
import { cn } from "@/lib/utils";
import { useToken } from "@/store/useToken";
import { FlashList } from "@shopify/flash-list";
import { icons } from "constants/";
import { ProductNearby, products as dataProduct } from "data/product.data";
import { Image } from "expo-image";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { token } = useToken();
  const [keyword, setKeyword] = useState<string>("");
  const [products, setProducts] = useState<ProductNearby[]>();

  useEffect(() => {
    if (keyword) {
      setProducts(
        dataProduct.filter((product) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }, [keyword]);

  if (!token) return <Redirect href={"/"} />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Cari",
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
      <SafeAreaView className="h-full bg-[#F8F8F9]">
        <ScrollView className="mt-[-15px]">
          <View
            className="flex items-center flex-1 w-full px-6 pb-8"
            style={{
              minWidth: Dimensions.get("window").width,
            }}
          >
            {/* Search input */}
            <View
              className="flex flex-row items-center px-[10px] py-3 bg-[#EFEFEF] rounded-lg h-12"
              style={{ columnGap: 8 }}
            >
              <Image
                source={icons.search}
                className="w-6 h-6"
                tintColor={keyword ? "#1B1717" : "#ACACAC"}
              />
              <TextInput
                placeholder="Mau makan apa hari ini?"
                placeholderTextColor="#ACACAC"
                className={cn(
                  "font-pjs-regular text-sm flex-1",
                  keyword ? "text-[#1B1717]" : "text-[#ACACAC]"
                )}
                style={{ includeFontPadding: false }}
                value={keyword}
                onChangeText={(text) => setKeyword(text)}
                autoFocus
              />
            </View>

            <View className="w-full mt-5 min-h-[115px]">
              <FlashList
                data={products}
                estimatedItemSize={109}
                estimatedListSize={{ width: 363, height: 805 }}
                renderItem={({ item }) => {
                  return <ProductCard product={item} />;
                }}
                ListEmptyComponent={
                  <Text
                    className={cn("text-center font-pjs-regular", !keyword && "hidden")}
                  >
                    {keyword && `Tidak dapat menemukan ${keyword}`}
                  </Text>
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
