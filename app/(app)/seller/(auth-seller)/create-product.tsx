import { createProduct } from "@/api/seller";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Header from "@/components/header";
import ImagePicker from "@/components/image-picker";
import InputField from "@/components/input-field";
import UserLayout from "@/components/layout/user-layout";
import ProductCategoryPicker from "@/components/seller/product-category-picker";
import TimeInput from "@/components/seller/time-input";
import { TCreateProductSchema, createProductSchema } from "@/schemas/form/product";
import { useToken } from "@/store/useToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function CreateProduct() {
  const { token } = useToken();
  const queryClient = useQueryClient();
  const [productImage, setProductImage] = useState<ImagePickerSuccessResult | null>(null);
  const form = useForm({
    resolver: zodResolver(createProductSchema),
  });
  const createProductRequest = useMutation({
    mutationFn: (data: TCreateProductSchema) =>
      createProduct(data, productImage!, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Produk ditambahkan",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Produk gagal ditambahkan",
      });
    },
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TCreateProductSchema> = async (data) => {
    await createProductRequest.mutateAsync(data);
    router.back();
  };

  return (
    <>
      <Header title="Tambah Produk" withBackButton />
      <UserLayout scrollViewClassname="mt-[-15px]">
        <View className="items-center w-full mt-3" style={{ rowGap: 13 }}>
          <ImagePicker
            name="images"
            control={control}
            setProductImage={setProductImage}
            disabled={createProductRequest.isPending}
          />

          <FormProvider {...form}>
            <InputField
              name="name"
              control={control}
              label="Nama Produk"
              placeholder="Masukkan nama produk"
              editable={!createProductRequest.isPending}
            />
            <ProductCategoryPicker
              name="categoryName"
              control={control}
              label="Kategori"
              editable={!createProductRequest.isPending}
            />
            <InputField
              name="price"
              control={control}
              label="Harga"
              placeholder="Masukkan harga produk"
              keyboardType="numeric"
              editable={!createProductRequest.isPending}
            />
            <InputField
              name="description"
              control={control}
              label="Deskripsi Produk"
              placeholder="Masukkan deskripsi produk"
              multiline
              numberOfLines={4}
              editable={!createProductRequest.isPending}
            />
            <View className="flex-row" style={{ columnGap: 22 }}>
              <TimeInput
                name="startTime"
                control={control}
                label="Jam Mulai"
                containerStyles="flex-1"
                disabled={createProductRequest.isPending}
              />
              <TimeInput
                name="endTime"
                control={control}
                label="Jam Selesai"
                containerStyles="flex-1"
                disabled={createProductRequest.isPending}
              />
            </View>
            <Checkbox
              name="isDaily"
              control={control}
              text="Jual Setiap Hari"
              disabled={createProductRequest.isPending}
            />
            <Button
              onSubmit={onSubmit}
              containerStyles="bg-[#49CB5C] w-full mt-[31px]"
              isLoading={createProductRequest.isPending}
            >
              Simpan
            </Button>
          </FormProvider>
        </View>
      </UserLayout>
    </>
  );
}
