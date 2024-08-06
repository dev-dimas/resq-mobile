import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import ProductCard from "./product-card";
import { useSession } from "@/store/useSession";

export default function NearbySales() {
  const { user } = useSession();
  const products = user?.data.products
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 4);
  return (
    <View className="mt-5">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-pjs-bold text-base text-[#1B1717]">Penjualan Terdekat</Text>
        {products?.length && products.length > 1 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.navigate("/product/nearby")}
          >
            <Text className="font-pjs-bold text-sm text-[#FF3B30] underline">
              Lihat Semua
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      <FlashList
        data={products}
        estimatedItemSize={109}
        estimatedListSize={{ width: 355, height: 115 }}
        contentContainerStyle={{
          paddingTop: 12,
        }}
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
  );
}
