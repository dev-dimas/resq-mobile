import BackButton from "@/components/back-button";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import {
  TChangePasswordSchema,
  changePasswordSchema,
} from "@/schemas/form/change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TChangePasswordSchema> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Ubah Kata Sandi",
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
            <View className="w-full mt-2">
              <FormProvider {...form}>
                <View style={{ rowGap: 8 }}>
                  <InputField
                    name="currentPassword"
                    control={control}
                    label="Kata Sandi Saat Ini"
                    placeholder="Masukkan kata sandi saat ini"
                    type="password"
                    // editable
                  />
                  <InputField
                    name="newPassword"
                    control={control}
                    label="Kata Sandi Baru"
                    placeholder="Masukkan kata sandi baru"
                    type="password"
                    // editable
                  />
                  <InputField
                    name="confirmPassword"
                    control={control}
                    label="Konfirmasi Kata Sandi Baru"
                    placeholder="Masukkan konfirmasi kata sandi baru"
                    type="password"
                    // editable
                  />
                </View>
                <Button
                  onSubmit={onSubmit}
                  containerStyles="bg-[#FF3B30] w-full mt-7"
                  // isLoading={signInRequest.isPending}
                >
                  Ubah Kata Sandi
                </Button>
              </FormProvider>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
