import BackButton from "@/components/back-button";
import ProductCard from "@/components/customer/product-card";
import { useToken } from "@/store/useToken";
import { FlashList } from "@shopify/flash-list";
import { products } from "data/product.data";
import { Redirect, Stack } from "expo-router";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Nearby() {
  const { token } = useToken();
  if (!token) return <Redirect href={"/"} />;
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Penjualan Terdekat",
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
            <FlashList
              data={products.filter((product) => product.distance <= 1)}
              estimatedItemSize={109}
              estimatedListSize={{ width: 355, height: 805 }}
              renderItem={({ item }) => {
                return <ProductCard product={item} />;
              }}
              ListEmptyComponent={
                <Text className="text-center font-pjs-regular">
                  Belum ada penjualan di dekatmu.
                </Text>
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
