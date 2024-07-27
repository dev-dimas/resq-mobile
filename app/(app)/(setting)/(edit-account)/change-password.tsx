import { changePassword } from "@/api/account";
import Button from "@/components/button";
import Header from "@/components/header";
import InputField from "@/components/input-field";
import UserLayout from "@/components/layout/user-layout";
import {
  TChangePasswordSchema,
  changePasswordSchema,
} from "@/schemas/form/change-password";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function ChangePassword() {
  const { token } = useToken();
  const { user } = useSession();
  const changePasswordRequest = useMutation({
    mutationFn: (data: TChangePasswordSchema) => changePassword(data, token!),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Kata sandi berhasil diperbarui",
      });
    },
    onError: (error) => {
      if (error.message === "Forbidden") {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Kata sandi saat ini tidak sesuai!",
        });
      }
    },
  });

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TChangePasswordSchema> = async (data) => {
    await changePasswordRequest.mutateAsync(data);

    router.navigate(
      typeof user?.data.subscriber === "number" ? "/seller/home" : "/customer/home"
    );
  };

  return (
    <>
      <Header title="Ubah Kata Sandi" withBackButton />
      <UserLayout scrollViewClassname="mt-[-15px]">
        <View className="w-full mt-2">
          <FormProvider {...form}>
            <View style={{ rowGap: 8 }}>
              <InputField
                name="currentPassword"
                control={control}
                label="Kata Sandi Saat Ini"
                placeholder="Masukkan kata sandi saat ini"
                type="password"
                editable={!changePasswordRequest.isPending}
              />
              <InputField
                name="newPassword"
                control={control}
                label="Kata Sandi Baru"
                placeholder="Masukkan kata sandi baru"
                type="password"
                editable={!changePasswordRequest.isPending}
              />
              <InputField
                name="confirmPassword"
                control={control}
                label="Konfirmasi Kata Sandi Baru"
                placeholder="Masukkan konfirmasi kata sandi baru"
                type="password"
                editable={!changePasswordRequest.isPending}
              />
            </View>
            <Button
              onSubmit={onSubmit}
              containerStyles="bg-[#FF3B30] w-full mt-7"
              isLoading={changePasswordRequest.isPending}
            >
              Ubah Kata Sandi
            </Button>
          </FormProvider>
        </View>
      </UserLayout>
    </>
  );
}
