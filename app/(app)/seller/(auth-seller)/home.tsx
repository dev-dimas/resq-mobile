import { deleteProduct } from "@/api/seller";
import UserLayout from "@/components/layout/user-layout";
import Modal from "@/components/modal";
import SellerProductCard from "@/components/seller/seller-product-card";
import UserLocation from "@/components/user-location";
import { cn, getGreeting } from "@/lib/utils";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { icons } from "@/constants";
import env from "@/env";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { Product } from "@/types/product.type";

export default function Home() {
  const { user } = useSession();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [productToBeDelete, setProductToBeDelete] = useState<Product | null>(null);
  const { token } = useToken();
  const queryClient = useQueryClient();
  const deleteProductRequest = useMutation({
    mutationFn: () => deleteProduct(productToBeDelete!.id, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Produk berhasil dihapus",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Produk gagal dihapus",
      });
    },
  });

  const handleDeleteProduct = async () => {
    if (!productToBeDelete) return;

    await deleteProductRequest.mutateAsync();
    setIsModalDeleteOpen(false);
    setProductToBeDelete(null);
  };

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
              {user?.data.name}
            </Text>
            <Text className="font-pjs-bold text-xs text-[#757575] mt-1">
              Jumlah Subscriber : {user?.data.subscriber}
            </Text>
          </View>

          <Link
            href="/setting"
            className={cn(
              "rounded-lg",
              !user?.data.avatar && "border border-[#1B1717] p-1"
            )}
          >
            <Image
              source={
                user?.data.avatar
                  ? env.EXPO_PUBLIC_API_URL + user?.data.avatar
                  : icons.user
              }
              contentFit="cover"
              placeholder={{ blurhash: user?.data.avatarBlurHash || undefined }}
              placeholderContentFit={user?.data.avatarBlurHash ? "cover" : undefined}
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
          onPress={() => router.navigate("/seller/(auth-seller)/create-product")}
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
            data={user?.data.products}
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
        onConfirm={handleDeleteProduct}
        isLoading={deleteProductRequest.isPending}
      />
    </UserLayout>
  );
}
