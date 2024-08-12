import ProductCard from "@/components/customer/product-card";
import Header from "@/components/header";
import UserLayout from "@/components/layout/user-layout";
import { cn } from "@/lib/utils";
import { useSession } from "@/store/useSession";
import { FlashList } from "@shopify/flash-list";
import { icons } from "@/constants";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Product } from "@/types/product.type";

type TProduct = Product & { distance: number; latitude: string; longitude: string };

export default function Search() {
  const { user } = useSession();
  const [keyword, setKeyword] = useState<string>("");
  const [products, setProducts] = useState<TProduct[]>();

  useEffect(() => {
    if (keyword) {
      setProducts(
        user?.data.products!.filter((product) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }, [keyword, user?.data.products]);

  return (
    <>
      <Header title="Cari" withBackButton />
      <UserLayout scrollViewClassname="mt-[-15px]">
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
              <Text className={cn("text-center font-pjs-regular", !keyword && "hidden")}>
                {keyword && `Tidak dapat menemukan ${keyword}`}
              </Text>
            }
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </UserLayout>
    </>
  );
}
