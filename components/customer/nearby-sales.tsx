import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import ProductCard from "./product-card";
import { useSession } from "@/store/useSession";
import { useMemo } from "react";

export default function NearbySales() {
  const { user } = useSession();
  const products = useMemo(() => {
    if (!user?.data.products) return [];
    return user.data.products.sort((a, b) => a.distance - b.distance);
  }, [user?.data.products]);

  return (
    <View className="mt-5">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-pjs-bold text-base text-[#1B1717]">Penjualan Terdekat</Text>
        {products?.length && products.length > 4 ? (
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
        data={products.slice(0, 4)}
        estimatedItemSize={109}
        estimatedListSize={{ width: 355, height: 115 }}
        contentContainerStyle={{
          paddingTop: 12,
        }}
        renderItem={({ item }) => {
          return <ProductCard product={item} />;
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text className="text-center font-pjs-regular">
            Belum ada penjualan di dekatmu.
          </Text>
        }
      />
    </View>
  );
}
