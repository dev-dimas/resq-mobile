import { priceToRupiah, twoDecimals } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { icons } from "constants/";
import { products as p } from "data/product.data";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

const products = p.sort((a, b) => a.distance - b.distance).slice(0, 4);
export default function NearbySales() {
  return (
    <View className="mt-5">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-pjs-bold text-base text-[#1B1717]">Penjualan Terdekat</Text>
        {products.length > 1 && (
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="font-pjs-bold text-sm text-[#FF3B30] underline">
              Lihat Semua
            </Text>
          </TouchableOpacity>
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
          return (
            <TouchableOpacity
              key={item.name}
              activeOpacity={0.7}
              className="p-4 my-1 bg-white border border-opacity-50 rounded-lg border-slate-200"
            >
              <View className="flex flex-row gap-3">
                <Image
                  source={item.images[0]}
                  contentFit="cover"
                  className="w-[70px] h-[70px] rounded-full"
                />
                <View className="flex justify-between">
                  <View>
                    <Text className="text-base font-pjs-bold">{item.name}</Text>
                    <View className="flex flex-row items-center gap-1">
                      <Image
                        source={icons.location}
                        className="h-3 aspect-square"
                        tintColor="#757575"
                      />
                      <Text className="text-xs font-pjs-regular text-[#757575]">
                        {twoDecimals(item.distance)} km
                      </Text>
                    </View>
                  </View>
                  <Text className="text-base font-pjs-bold text-[#FF3B30]">
                    {priceToRupiah(item.price)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
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
