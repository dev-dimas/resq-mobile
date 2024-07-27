import ProductCard from "@/components/customer/product-card";
import Header from "@/components/header";
import UserLayout from "@/components/layout/user-layout";
import NotFound from "@/components/not-found";
import { useSession } from "@/store/useSession";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function CategoryName() {
  const { user } = useSession();
  let { categoryName } = useLocalSearchParams();
  categoryName = categoryName as string;

  const categoryNameAvailable = ["makanan", "minuman", "salad", "dessert"];

  if (!categoryNameAvailable.includes(categoryName)) {
    return <NotFound withHeader>Kategori {categoryName} tidak ditemukan!</NotFound>;
  }

  const products = user?.data.products.filter(
    (product) =>
      product.categoryName === categoryName.replace(/^./, (match) => match.toUpperCase())
  );

  return (
    <>
      <Header
        title={categoryName.replace(/^./, (match) => match.toUpperCase())}
        withBackButton
      />
      <UserLayout scrollViewClassname="mt-[-15px]">
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
      </UserLayout>
    </>
  );
}
