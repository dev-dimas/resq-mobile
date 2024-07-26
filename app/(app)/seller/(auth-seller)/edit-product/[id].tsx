import { updateProduct } from "@/api/seller";
import BackButton from "@/components/back-button";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import ImagePicker from "@/components/image-picker";
import InputField from "@/components/input-field";
import Modal from "@/components/modal";
import ProductCategoryPicker from "@/components/seller/product-category-picker";
import TimeInput from "@/components/seller/time-input";
import { cn } from "@/lib/utils";
import { TUpdateProductSchema, updateProductSchema } from "@/schemas/form/product";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Category } from "types/category.type";

export default function EditProduct() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productImage, setProductImage] = useState<ImagePickerSuccessResult | null>(null);
  const { token } = useToken();
  const { user: seller } = useSession();
  let { id } = useLocalSearchParams();
  id = id as string;
  const queryClient = useQueryClient();
  const updateProductRequest = useMutation({
    mutationFn: (data: Partial<TUpdateProductSchema>) =>
      updateProduct({ productId: id, data, productImage, token: token! }),
  });

  const product = seller?.data.products.find((product) => product.id === id);

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TUpdateProductSchema> = async (data) => {
    try {
      const response = await updateProductRequest.mutateAsync(data);

      if (!response.data) throw new Error();

      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Berhasil memperbarui produk!",
      });

      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui produk. Coba lagi!",
      });
    }
  };

  const handleChangeIsActive = async () => {
    try {
      const response = await updateProductRequest.mutateAsync({
        isActive: !product?.isActive,
      });

      if (!response.data) throw new Error();

      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Berhasil memperbarui status produk!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui status produk. Coba lagi!",
      });
    }
  };

  if (!product)
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Product Not Found!",
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
            headerLeft: () => <BackButton />,
          }}
        />
        <SafeAreaView>
          <View>
            <Text className="text-base text-center text-red-500 font-pjs-extrabold">
              Produk tidak ditemukan!
            </Text>
          </View>
        </SafeAreaView>
      </>
    );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Edit Produk",
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
          headerLeft: () => <BackButton />,
        }}
      />
      <SafeAreaView className="h-full bg-[#F8F8F9]">
        <ScrollView className="mt-[-15px]">
          <View
            className="flex items-center flex-1 w-full px-6 pb-8"
            style={{
              minWidth: Dimensions.get("window").width,
            }}
          >
            <View className="items-center w-full mt-3" style={{ rowGap: 13 }}>
              <ImagePicker
                name="images"
                control={control}
                defaultValue={product.images[0]}
                setProductImage={setProductImage}
                disabled={updateProductRequest.isPending}
              />

              <FormProvider {...form}>
                <InputField
                  name="name"
                  control={control}
                  label="Nama Produk"
                  placeholder="Masukkan nama produk"
                  defaultValue={product.name}
                  editable={!updateProductRequest.isPending}
                />
                <ProductCategoryPicker
                  name="categoryName"
                  control={control}
                  label="Kategori"
                  defaultValue={product.categoryName as Category["name"]}
                  editable={!updateProductRequest.isPending}
                />
                <InputField
                  name="price"
                  control={control}
                  label="Harga"
                  defaultValue={product.price}
                  placeholder="Masukkan harga produk"
                  keyboardType="numeric"
                  editable={!updateProductRequest.isPending}
                />
                <InputField
                  name="description"
                  control={control}
                  label="Deskripsi Produk"
                  defaultValue={product.description}
                  placeholder="Masukkan deskripsi produk"
                  multiline
                  numberOfLines={4}
                  editable={!updateProductRequest.isPending}
                />
                <View className="flex-row" style={{ columnGap: 22 }}>
                  <TimeInput
                    name="startTime"
                    control={control}
                    label="Jam Mulai"
                    defaultValue={new Date(product.startTime)}
                    containerStyles="flex-1"
                    disabled={updateProductRequest.isPending}
                  />
                  <TimeInput
                    name="endTime"
                    control={control}
                    label="Jam Selesai"
                    defaultValue={new Date(product.endTime)}
                    containerStyles="flex-1"
                    disabled={updateProductRequest.isPending}
                  />
                </View>
                <Checkbox
                  name="isDaily"
                  defaultValue={product.isDaily}
                  control={control}
                  text="Jual Setiap Hari"
                  disabled={updateProductRequest.isPending}
                />

                {/* Button action */}
                <View className="w-full mt-[31px]" style={{ rowGap: 8 }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsModalOpen(true)}
                    className={cn(
                      "items-center px-2 py-3 border-2 rounded-lg",
                      product.isActive ? "border-[#FF3B30]" : "border-[#49CB5C]"
                    )}
                    disabled={updateProductRequest.isPending}
                  >
                    <Text
                      className={cn(
                        "text-sm font-pjs-bold",
                        product.isActive ? "text-[#FF3B30]" : "text-[#49CB5C]"
                      )}
                      disabled={updateProductRequest.isPending}
                    >
                      {product.isActive ? "Hentikan Penjualan" : "Aktifkan Penjualan"}
                    </Text>
                  </TouchableOpacity>
                  <Button
                    onSubmit={onSubmit}
                    containerStyles="bg-[#FDBF43] w-full"
                    isLoading={updateProductRequest.isPending}
                  >
                    Perbarui
                  </Button>
                </View>
              </FormProvider>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={product.isActive ? "Hentikan Penjualan" : "Aktifkan Penjualan"}
        description={`Apakah kamu yakin ingin ${product.isActive ? "menghentikan" : "mengaktifkan"} penjualan produk ini?`}
        titleConfirm={product.isActive ? "Hentikan" : "Aktifkan"}
        onConfirm={async () => {
          await handleChangeIsActive();
          setIsModalOpen(false);
        }}
        buttonVariant={product.isActive ? "red" : "green"}
        isLoading={updateProductRequest.isPending}
      />
    </>
  );
}
