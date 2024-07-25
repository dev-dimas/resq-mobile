import { changePassword } from "@/api/account";
import BackButton from "@/components/back-button";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import {
  TChangePasswordSchema,
  changePasswordSchema,
} from "@/schemas/form/change-password";
import { useToken } from "@/store/useToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import useDashboard from "hooks/query/useDashboard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function ChangePassword() {
  const { token } = useToken();
  const { data: dashboardData } = useDashboard();
  const changePasswordRequest = useMutation({
    mutationFn: (data: TChangePasswordSchema) => changePassword(data, token!),
  });

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TChangePasswordSchema> = async (data) => {
    try {
      const response = await changePasswordRequest.mutateAsync(data);
      if (response.error) throw new Error(response.message);

      router.navigate(
        typeof dashboardData?.data.subscriber === "number"
          ? "/seller/home"
          : "/customer/home"
      );

      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Kata sandi berhasil diperbarui",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Forbidden") {
          Toast.show({
            type: "error",
            text1: "Gagal",
            text2: "Kata sandi saat ini tidak sesuai!",
          });
        }
      }
      return;
    }
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
