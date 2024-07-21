import BackButton from "@/components/back-button";
import Button from "@/components/button";
import ImageViewer from "@/components/image-viewer";
import InputField from "@/components/input-field";
import { TEditAccountSchema, editAccountSchema } from "@/schemas/form/edit-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { images } from "constants/";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditAccount() {
  const [isImageViewerVisible, setIsImageViewerVisible] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(editAccountSchema),
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TEditAccountSchema> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Edit Akun",
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
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsImageViewerVisible(true)}
              >
                <Image
                  source={images.donutChocolate}
                  contentFit="cover"
                  className="w-48 rounded-full aspect-square"
                />
              </TouchableOpacity>
              <ImageViewer
                images={[images.donutChocolate]}
                title="Foto Profile"
                isVisible={isImageViewerVisible}
                setIsVisible={setIsImageViewerVisible}
              />
            </View>

            {/* Input form */}
            <View className="w-full mt-10">
              <FormProvider {...form}>
                <View style={{ rowGap: 8 }}>
                  <InputField
                    name="name"
                    control={control}
                    label="Nama"
                    defaultValue="Dimas Maulana"
                    // editable
                  />
                  <InputField
                    name="email"
                    control={control}
                    label="Email"
                    defaultValue="lLqg0@example.com"
                    // editable
                  />
                </View>
                <View className="mt-7">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.navigate("/change-password")}
                    className="bg-white border-2 border-[#FF3B30] w-full py-3 items-center rounded-lg"
                  >
                    <Text className="text-[#FF3B30] font-pjs-bold text-sm">
                      Ubah Kata Sandi
                    </Text>
                  </TouchableOpacity>
                  <Button
                    onSubmit={onSubmit}
                    containerStyles="bg-[#FF3B30] w-full mt-5"
                    // isLoading={signInRequest.isPending}
                  >
                    Simpan
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
