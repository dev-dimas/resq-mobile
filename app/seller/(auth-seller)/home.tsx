import UserLayout from "@/components/layout/user-layout";
import Modal from "@/components/modal";
import SellerProductCard from "@/components/seller/seller-product-card";
import UserLocation from "@/components/user-location";
import { cn, getGreeting } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { icons } from "constants/";
import env from "env";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import useDashboard from "hooks/query/useDashboard";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Product } from "types/product.type";

export default function Home() {
  const { data } = useDashboard();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [productToBeDelete, setProductToBeDelete] = useState<Product | null>(null);

  return (
    <UserLayout containerClassname="pt-5">
      <View className="w-full">
        {/* Greeting and button account menu */}
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text className="text-base font-pjs-bold">Selamat {getGreeting()}</Text>
            <Text
              className="text-base font-pjs-bold"
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ includeFontPadding: false }}
            >
              {data?.data.name}
            </Text>
            <Text className="font-pjs-bold text-xs text-[#757575] mt-1">
              Jumlah Subscriber : {data?.data.subscriber}
            </Text>
          </View>

          <Link
            href="/setting"
            className={cn(
              "rounded-lg",
              !data?.data.avatar && "border border-[#1B1717] p-1"
            )}
          >
            <Image
              source={
                data?.data.avatar
                  ? env.EXPO_PUBLIC_API_URL + data?.data.avatar
                  : icons.user
              }
              contentFit="cover"
              className={cn("w-8 h-8 rounded-lg")}
            />
          </Link>
        </View>

        {/* Location */}
        <View className="flex gap-2 mt-4">
          <Text className="uppercase text-[#FF3B30] font-pjs-bold text-sm">
            Lokasi penjualan kamu
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row items-center justify-between w-[82%]"
            onPress={() => router.navigate("/location")}
          >
            <UserLocation />
          </TouchableOpacity>
        </View>

        {/* Button add product */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-[47px] bg-[#49CB5C] rounded-lg flex-row items-center justify-center mt-4"
          style={{
            columnGap: 10,
          }}
          onPress={() => router.push("/seller/(auth-seller)/create-product")}
        >
          <Image
            source={icons.plus}
            className="w-[13px] h-[13px]"
            contentFit="contain"
            tintColor="white"
          />
          <Text className="text-sm text-white font-pjs-bold">Tambah Produk</Text>
        </TouchableOpacity>

        {/* Seller's products list */}
        <View className="flex-1 mt-4">
          <Text className="font-pjs-bold text-base text-[#1B1717]">Produk Kamu</Text>
          <FlashList
            data={data?.data.products}
            estimatedItemSize={109}
            estimatedListSize={{ width: 364, height: 805 }}
            renderItem={({ item }) => {
              return (
                <SellerProductCard
                  product={item}
                  setIsModalDeleteOpen={setIsModalDeleteOpen}
                  setProductToBeDelete={setProductToBeDelete}
                />
              );
            }}
            ListEmptyComponent={
              <Text className="text-center font-pjs-regular">
                Etalase penjualan kamu masih kosong!
              </Text>
            }
            contentContainerStyle={{
              paddingTop: 16,
            }}
          />
        </View>
      </View>
      <Modal
        title="Hapus Produk"
        description={`Apakah kamu yakin ingin menghapus produk ${productToBeDelete?.name}?`}
        titleConfirm="Hapus"
        isVisible={isModalDeleteOpen}
        onClose={() => {
          setIsModalDeleteOpen(false);
          setProductToBeDelete(null);
        }}
        onConfirm={() => {}}
      />
    </UserLayout>
  );
}
