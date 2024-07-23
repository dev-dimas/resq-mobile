import BackButton from "@/components/back-button";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import ImagePicker from "@/components/image-picker";
import InputField from "@/components/input-field";
import ProductCategoryPicker from "@/components/seller/product-category-picker";
import TimeInput from "@/components/seller/time-input";
import { cn, fetchImageFromUri } from "@/lib/utils";
import { TUpdateProductSchema, updateProductSchema } from "@/schemas/form/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductNearby, products } from "data/product.data";
import dayjs from "dayjs";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category } from "types/category.type";
import { Product } from "types/product.type";

export default function EditProduct() {
  let { id } = useLocalSearchParams();
  id = id as string;
  const product: (ProductNearby & Partial<Pick<Product, "isActive">>) | undefined =
    products.find((product) => product.id === id);

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TUpdateProductSchema> = async (data) => {
    console.log(data);
    return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("categoryName", data.categoryName);
    formData.append("images", await fetchImageFromUri(data.images));
    formData.append("startTime", dayjs(data.startTime).format("HH:mm"));
    formData.append("endTime", dayjs(data.endTime).format("HH:mm"));
    formData.append("isDaily", JSON.stringify(data.isDaily));
  };

  const handleChangeIsActive = async () => {};

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

  product.isActive = true;

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
              />

              <FormProvider {...form}>
                <InputField
                  name="name"
                  control={control}
                  label="Nama Produk"
                  placeholder="Masukkan nama produk"
                  defaultValue={product.name}
                  // editable
                />
                <ProductCategoryPicker
                  name="categoryName"
                  control={control}
                  label="Kategori"
                  defaultValue={product.categoryName as Category["name"]}
                  //   editable
                />
                <InputField
                  name="price"
                  control={control}
                  label="Harga"
                  defaultValue={product.price}
                  placeholder="Masukkan harga produk"
                  keyboardType="numeric"
                  // editable
                />
                <InputField
                  name="description"
                  control={control}
                  label="Deskripsi Produk"
                  defaultValue={product.description}
                  placeholder="Masukkan deskripsi produk"
                  multiline
                  numberOfLines={4}
                  // editable
                />
                <View className="flex-row" style={{ columnGap: 22 }}>
                  <TimeInput
                    name="startTime"
                    control={control}
                    label="Jam Mulai"
                    defaultValue={new Date()}
                    containerStyles="flex-1"
                  />
                  <TimeInput
                    name="endTime"
                    control={control}
                    label="Jam Selesai"
                    defaultValue={new Date()}
                    containerStyles="flex-1"
                  />
                </View>
                <Checkbox name="isDaily" control={control} text="Jual Setiap Hari" />

                {/* Button action */}
                <View className="w-full mt-[31px]" style={{ rowGap: 8 }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleChangeIsActive}
                    className={cn(
                      "items-center px-2 py-3 border-2 rounded-lg",
                      product.isActive ? "border-[#FF3B30]" : "border-[#49CB5C]"
                    )}
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
                    //   isLoading={}
                  >
                    Perbarui
                  </Button>
                </View>
              </FormProvider>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
