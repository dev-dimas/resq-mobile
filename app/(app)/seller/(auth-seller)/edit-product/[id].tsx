import { reActivateProduct, updateProduct } from "@/api/seller";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Header from "@/components/header";
import ImagePicker from "@/components/image-picker";
import InputField from "@/components/input-field";
import UserLayout from "@/components/layout/user-layout";
import Modal from "@/components/modal";
import NotFound from "@/components/not-found";
import PriceInput from "@/components/price-input";
import ProductCategoryPicker from "@/components/seller/product-category-picker";
import TimeInput from "@/components/seller/time-input";
import { cn, isProductAvailable } from "@/lib/utils";
import { TUpdateProductSchema, updateProductSchema } from "@/schemas/form/product";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { Category } from "@/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { memo, useCallback, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

function EditProduct() {
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Berhasil memperbarui status produk!",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui status produk. Coba lagi!",
      });
    },
  });

  const reactivateProductRequest = useMutation({
    mutationFn: () => reActivateProduct(id, token!),
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui produk. Coba lagi!",
      });
    },
  });

  const product = useMemo(
    () => seller?.data.products.find((product) => product.id === id),
    [seller, id]
  );

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
  });

  const { control, setFocus } = form;

  const onSubmit: SubmitHandler<TUpdateProductSchema> = useCallback(
    async (data) => {
      await updateProductRequest.mutateAsync(data);
      router.back();
    },
    [updateProductRequest]
  );

  const handleChangeIsActive = useCallback(async () => {
    await updateProductRequest.mutateAsync({
      isActive: !product?.isActive,
    });
  }, [updateProductRequest, product]);

  const handleReactivateProduct = useCallback(
    async ({ withToastOnSuccess = true }: { withToastOnSuccess?: boolean }) => {
      await reactivateProductRequest.mutateAsync().then(async () => {
        if (withToastOnSuccess) {
          await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
          Toast.show({
            type: "success",
            text1: "Berhasil",
            text2: `Berhasil memperbarui produk!`,
          });
        }
      });
    },
    [reactivateProductRequest, queryClient]
  );

  if (!product) return <NotFound withHeader>Produk tidak ditemukan!</NotFound>;

  const isProductTimeExpired = !isProductAvailable(product);

  return (
    <>
      <Header title="Edit Produk" withBackButton />
      <UserLayout scrollViewClassname="mt-[-15px]">
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
              returnKeyType="next"
              onSubmitEditing={() => {
                setFocus("categoryName");
                Keyboard.dismiss();
              }}
              blurOnSubmit={false}
            />
            <ProductCategoryPicker
              name="categoryName"
              control={control}
              label="Kategori"
              defaultValue={product.categoryName as Category["name"]}
              editable={!updateProductRequest.isPending}
            />
            <PriceInput
              name="price"
              control={control}
              label="Harga"
              defaultValue={product.price}
              placeholder="Masukkan harga produk"
              keyboardType="numeric"
              editable={!updateProductRequest.isPending}
              returnKeyType="next"
              onSubmitEditing={() => setFocus("description")}
              blurOnSubmit={false}
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
                disabled={
                  updateProductRequest.isPending || reactivateProductRequest.isPending
                }
              >
                <Text
                  className={cn(
                    "text-sm font-pjs-bold",
                    product.isActive ? "text-[#FF3B30]" : "text-[#49CB5C]"
                  )}
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
      </UserLayout>
      <Modal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={product.isActive ? "Hentikan Penjualan" : "Aktifkan Penjualan"}
        description={`Apakah kamu yakin ingin ${product.isActive ? "menghentikan" : "mengaktifkan"} penjualan produk ini?`}
        titleConfirm={product.isActive ? "Hentikan" : "Aktifkan"}
        onConfirm={async () => {
          // isActive - Expired = Reactivate
          // isActive - Not Expired =
          // is Not Active - Expired =
          // is Not Active - Not Expired =
          if (!isProductTimeExpired) {
            await handleChangeIsActive();
          } else if (product.isActive) {
            await handleReactivateProduct({ withToastOnSuccess: true });
          } else if (!product.isActive) {
            await handleReactivateProduct({ withToastOnSuccess: false });
            await handleChangeIsActive();
          }
          setIsModalOpen(false);
        }}
        buttonVariant={product.isActive ? "red" : "green"}
        isLoading={updateProductRequest.isPending || reactivateProductRequest.isPending}
      />
    </>
  );
}

export default memo(EditProduct);
