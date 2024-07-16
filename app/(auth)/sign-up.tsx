import AuthLayout from "@/components/auth/auth-layout";
import { TSignUpSchema, signUpSchema } from "@/schemas/form/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Button from "../../components/button";
import InputField from "../../components/input-field";
import RolePicker from "../../components/role-picker";

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const {
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<TSignUpSchema> = (data) => {
    console.log(data);
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
              editable={!isSubmitting}
            />
            <RolePicker
              name="asCustomer"
              control={control}
              label="Daftar Sebagai"
              containerStyles="w-1/2 pl-[5px]"
            />
          </View>
          <InputField
            name="email"
            control={control}
            label="Email"
            editable={!isSubmitting}
            keyboardType="email-address"
          />
          <InputField
            name="password"
            control={control}
            label="Kata Sandi"
            type="password"
            editable={!isSubmitting}
          />
          <InputField
            name="confirmPassword"
            control={control}
            label="Konfirmasi Kata Sandi"
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
          Sudah memiliki akun?. Silahkan masuk{" "}
          <Link href={"/sign-in"} className="font-pjs-extrabold text-[#FF3B30] underline">
            disini
          </Link>
        </Text>
      </View>
    </AuthLayout>
  );
}
