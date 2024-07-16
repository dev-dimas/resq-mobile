import AuthLayout from "@/components/auth/auth-layout";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import { TSignInSchema, signInSchema } from "@/schemas/form/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";

export default function SignIn() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
  });

  const {
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<TSignInSchema> = (data) => {
    console.log(data);
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
            editable={!isSubmitting}
          />
          <InputField
            name="password"
            control={control}
            label="Kata Sandi"
            type="password"
            editable={!isSubmitting}
          />
        </View>

        <Button onSubmit={onSubmit} containerStyles="bg-[#FF3B30] w-full mt-[22px]">
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
