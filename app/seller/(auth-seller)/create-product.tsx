import BackButton from "@/components/back-button";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import ImagePicker from "@/components/image-picker";
import InputField from "@/components/input-field";
import ProductCategoryPicker from "@/components/seller/product-category-picker";
import TimeInput from "@/components/seller/time-input";
import { fetchImageFromUri } from "@/lib/utils";
import { TCreateProductSchema, createProductSchema } from "@/schemas/form/product";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Stack } from "expo-router";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateProduct() {
  const form = useForm({
    resolver: zodResolver(createProductSchema),
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TCreateProductSchema> = async (data) => {
    console.log(data);
    return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("categoryName", data.categoryName);
    formData.append("images", await fetchImageFromUri(data.images));
    formData.append("startTime", dayjs(data.startTime).toISOString());
    formData.append("endTime", dayjs(data.endTime).toISOString());
    formData.append("isDaily", JSON.stringify(data.isDaily));
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tambah Produk",
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
              <ImagePicker name="images" control={control} />

              <FormProvider {...form}>
                <InputField
                  name="name"
                  control={control}
                  label="Nama Produk"
                  placeholder="Masukkan nama produk"
                  // editable
                />
                <ProductCategoryPicker
                  name="categoryName"
                  control={control}
                  label="Kategori"
                  //   editable
                />
                <InputField
                  name="price"
                  control={control}
                  label="Harga"
                  placeholder="Masukkan harga produk"
                  keyboardType="numeric"
                  // editable
                />
                <InputField
                  name="description"
                  control={control}
                  label="Deskripsi Produk"
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
                    containerStyles="flex-1"
                  />
                  <TimeInput
                    name="endTime"
                    control={control}
                    label="Jam Selesai"
                    containerStyles="flex-1"
                  />
                </View>
                <Checkbox name="isDaily" control={control} text="Jual Setiap Hari" />
                <Button
                  onSubmit={onSubmit}
                  containerStyles="bg-[#49CB5C] w-full mt-[31px]"
                  //   isLoading={}
                >
                  Simpan
                </Button>
              </FormProvider>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
