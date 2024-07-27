import ButtonDeleteFavorites from "@/components/customer/button-delete-favorites";
import ProductCard from "@/components/customer/product-card";
import Header from "@/components/header";
import UserLayout from "@/components/layout/user-layout";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { FlashList } from "@shopify/flash-list";
import { Text } from "react-native";

export default function Favorite() {
  const { favorite } = useFavoriteStore();

  return (
    <>
      <Header
        title="Favorit"
        options={{
          headerRight: favorite?.data?.length
            ? () => <ButtonDeleteFavorites />
            : undefined,
        }}
      />
      <UserLayout scrollViewClassname="mt-[-10px]">
        <FlashList
          data={favorite?.data}
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
