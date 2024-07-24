import { postSignIn } from "@/api/auth";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import AuthLayout from "@/components/layout/auth-layout";
import SecureStore from "@/lib/secure-store";
import { TSignInSchema, signInSchema } from "@/schemas/form/auth";
import { useToken } from "@/store/useToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function SignIn() {
  const { setToken } = useToken();

  const signInRequest = useMutation({
    mutationFn: postSignIn,
  });

  const form = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { control } = form;

  const onSubmit: SubmitHandler<TSignInSchema> = async (data) => {
    const signInResponse = await signInRequest.mutateAsync(data);

    if (signInResponse.data) {
      await SecureStore.setItemAsync("token", signInResponse.data.token);
      setToken(signInResponse.data.token);
      router.replace(signInResponse.data.isSeller ? "/seller/home" : "/customer/home");
      return;
    }

    if (signInResponse.message === "Forbidden") {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Email atau kata sandi salah!",
      });
    }
  };

  return (
    <AuthLayout>
      <Text className="pt-5 pb-[22px] text-2xl font-pjs-extrabold ">Masuk</Text>

      <FormProvider {...form}>
        <View className="flex" style={{ rowGap: 10 }}>
          <InputField
            name="email"
            control={control}
            label="Email"
            editable={!signInRequest.isPending}
          />
          <InputField
            name="password"
            control={control}
            label="Kata Sandi"
            type="password"
            editable={!signInRequest.isPending}
          />
        </View>

        <Button
          onSubmit={onSubmit}
          containerStyles="bg-[#FF3B30] w-full mt-[22px]"
          isLoading={signInRequest.isPending}
        >
          Masuk
        </Button>
      </FormProvider>

      <View className="flex w-full mt-3">
        <Text className="text-sm font-pjs-regular">
          Belum memiliki akun?. Silahkan buat{" "}
          <Link href={"/sign-up"} className="font-pjs-extrabold text-[#FF3B30] underline">
            disini
          </Link>
        </Text>
      </View>
    </AuthLayout>
  );
}
