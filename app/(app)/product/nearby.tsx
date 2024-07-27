import ProductCard from "@/components/customer/product-card";
import Header from "@/components/header";
import UserLayout from "@/components/layout/user-layout";
import NotFound from "@/components/not-found";
import { useSession } from "@/store/useSession";
import { FlashList } from "@shopify/flash-list";
import { Text } from "react-native";

export default function Nearby() {
  const { user } = useSession();

  if (!user?.data.products) {
    return (
      <NotFound withHeader headerProps={{ title: "Penjualan Terdekat" }}>
        Tidak ada penjualan didekatmu
      </NotFound>
    );
  }

  return (
    <>
      <Header title="Penjualan Terdekat" withBackButton />
      <UserLayout scrollViewClassname="mt-[-15px]">
        <FlashList
          data={user.data.products.filter((product) => product.distance <= 1)}
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
      </UserLayout>
    </>
  );
}
