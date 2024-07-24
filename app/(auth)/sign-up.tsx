import { postSignIn, postSignUp } from "@/api/auth";
import AuthLayout from "@/components/layout/auth-layout";
import SecureStore from "@/lib/secure-store";
import { TSignUpSchema, signUpSchema } from "@/schemas/form/auth";
import { useToken } from "@/store/useToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Button from "../../components/button";
import InputField from "../../components/input-field";
import RolePicker from "../../components/role-picker";

export default function SignUp() {
  const { setToken } = useToken();

  const signUpRequest = useMutation({
    mutationFn: postSignUp,
  });

  const signInRequest = useMutation({
    mutationFn: postSignIn,
  });

  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    const { confirmPassword: _confirmPassword, ...signUpData } = data;
    const signUpResponse = await signUpRequest.mutateAsync(signUpData);

    if (signUpResponse.data) {
      const signInResponse = await signInRequest.mutateAsync({
        email: data.email,
        password: data.password,
      });

      if (signInResponse.data) {
        await SecureStore.setItemAsync("token", signInResponse.data.token);
        setToken(signInResponse.data.token);
        const isCustomer = JSON.parse(data.asCustomer);
        router.replace(isCustomer ? "/customer/home" : "/seller/home");
      }
      return;
    }

    if (signUpResponse.message === "Conflict") {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Email sudah terdaftar!",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Terjadi suatu kesalahan!. Coba lagi nanti",
      });
    }
  };

  return (
    <AuthLayout>
      <Text className="pt-5 pb-[22px] text-2xl font-pjs-extrabold ">Daftar</Text>

      <FormProvider {...form}>
        <View className="flex" style={{ rowGap: 10 }}>
          <View className="flex flex-row">
            <InputField
              name="name"
              control={control}
              label="Nama"
              containerStyles="w-1/2"
              editable={!signUpRequest.isPending || !signInRequest.isPending}
            />
            <RolePicker
              name="asCustomer"
              control={control}
              label="Daftar Sebagai"
              containerStyles="w-1/2 pl-[5px]"
              editable={!signUpRequest.isPending || !signInRequest.isPending}
            />
          </View>
          <InputField
            name="email"
            control={control}
            label="Email"
            editable={!signUpRequest.isPending || !signInRequest.isPending}
            keyboardType="email-address"
          />
          <InputField
            name="password"
            control={control}
            label="Kata Sandi"
            type="password"
            editable={!signUpRequest.isPending || !signInRequest.isPending}
          />
          <InputField
            name="confirmPassword"
            control={control}
            label="Konfirmasi Kata Sandi"
            type="password"
            editable={!signUpRequest.isPending || !signInRequest.isPending}
          />
        </View>

        <Button
          onSubmit={onSubmit}
          containerStyles="bg-[#FF3B30] w-full mt-[22px]"
          isLoading={signUpRequest.isPending || signInRequest.isPending}
        >
          Daftar
        </Button>
      </FormProvider>

      <View className="flex w-full mt-3">
        <Text className="text-sm font-pjs-regular">
          Sudah memiliki akun?. Silahkan masuk{" "}
          <Link href={"/sign-in"} className="font-pjs-extrabold text-[#FF3B30] underline">
            disini
          </Link>
        </Text>
      </View>
    </AuthLayout>
  );
}
