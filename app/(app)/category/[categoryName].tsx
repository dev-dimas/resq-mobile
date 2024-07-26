import BackButton from "@/components/back-button";
import ProductCard from "@/components/customer/product-card";
import { useSession } from "@/store/useSession";
import { FlashList } from "@shopify/flash-list";
import { Stack, useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryName() {
  const { user } = useSession();
  let { categoryName } = useLocalSearchParams();
  categoryName = (categoryName as string) || "";

  const categoryNameAvailable = ["makanan", "minuman", "salad", "dessert"];

  if (!categoryNameAvailable.includes(categoryName)) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Not Found!",
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
              Kategori {categoryName} tidak ditemukan!
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  const products = user?.data.products.filter(
    (product) =>
      product.categoryName === categoryName.replace(/^./, (match) => match.toUpperCase())
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: categoryName.replace(/^./, (match) => match.toUpperCase()),
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
              data={products}
              estimatedItemSize={109}
              estimatedListSize={{ width: 355, height: 805 }}
              renderItem={({ item }) => {
                return <ProductCard product={item} />;
              }}
              ListEmptyComponent={
                <Text className="text-center font-pjs-regular">
                  Kategori {categoryName.replace(/^./, (match) => match.toUpperCase())}{" "}
                  kosong!.
                </Text>
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
