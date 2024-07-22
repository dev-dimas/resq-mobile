import BackButton from "@/components/back-button";
import ButtonDeleteFavorites from "@/components/customer/button-delete-favorites";
import ProductCard from "@/components/customer/product-card";
import UserLayout from "@/components/layout/user-layout";
import { FlashList } from "@shopify/flash-list";
import { FavoriteProduct, favoritesProduct } from "data/favorite.data";
import { Stack } from "expo-router";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebResponse } from "types/web-response.type";

export default function Favorite() {
  const favoriteResponse: WebResponse<FavoriteProduct> = {
    message: "success",
    data: favoritesProduct,
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Favorit",
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
          headerRight: () =>
            favoriteResponse.data?.product.length ? <ButtonDeleteFavorites /> : undefined,
        }}
      />
      <UserLayout scrollViewClassname="mt-[-10px]">
        <FlashList
          data={favoriteResponse.data?.product}
          estimatedItemSize={109}
          estimatedListSize={{ width: 355, height: 805 }}
          renderItem={({ item }) => {
            return <ProductCard product={item} withFavoriteButton={true} />;
          }}
          ListEmptyComponent={
            <Text className="text-center font-pjs-regular">
              Kamu belum memiliki produk favorit
            </Text>
          }
        />
      </UserLayout>
    </>
  );
}
