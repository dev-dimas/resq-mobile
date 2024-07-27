import { deleteAvatarAccount, postAvatarAccount, postEditAccount } from "@/api/account";
import Button from "@/components/button";
import Header from "@/components/header";
import ImagePicker from "@/components/image-picker";
import InputField from "@/components/input-field";
import UserLayout from "@/components/layout/user-layout";
import { TEditAccountSchema, editAccountSchema } from "@/schemas/form/edit-account";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { router } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function EditAccount() {
  const { user } = useSession();
  const queryClient = useQueryClient();
  const { token } = useToken();

  const editAccountRequest = useMutation({
    mutationFn: (data: TEditAccountSchema) => postEditAccount(data, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Akun berhasil diperbarui",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui foto profie. Coba lagi!",
      });
    },
  });

  const updateAvatarRequest = useMutation({
    mutationFn: (image: ImagePickerSuccessResult) => postAvatarAccount(image, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui foto. Coba lagi!",
      });
    },
  });

  const deleteAvatarRequest = useMutation({
    mutationFn: () => deleteAvatarAccount(token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui foto. Coba lagi!",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(editAccountSchema),
  });

  const {
    control,
    formState: { isDirty },
  } = form;

  const onSubmit: SubmitHandler<TEditAccountSchema> = async (data) => {
    if (!isDirty) {
      router.navigate(
        typeof user?.data.subscriber === "number" ? "/seller/home" : "/customer/home"
      );
      return;
    }

    await editAccountRequest.mutateAsync(data);
    router.navigate(
      typeof user?.data.subscriber === "number" ? "/seller/home" : "/customer/home"
    );
  };

  return (
    <>
      <Header title="Edit Akun" withBackButton />
      <UserLayout scrollViewClassname="mt-[-15px]">
        <View>
          <ImagePicker
            name="avatar"
            control={control}
            buttonStyles="w-48 h-48 border-2 border-[#EFEFEF]"
            imageStyles="w-48 h-48"
            isUserAvatar
            viewerTitle="Foto Profile"
            defaultValue={user?.data.avatar}
            handleSave={async (image: ImagePickerSuccessResult) =>
              await updateAvatarRequest.mutateAsync(image)
            }
            handleDelete={async () => await deleteAvatarRequest.mutateAsync()}
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
                defaultValue={user?.data.name}
                editable={!editAccountRequest.isPending}
              />
              <InputField
                name="email"
                control={control}
                label="Email"
                defaultValue={user?.data.email}
                editable={!editAccountRequest.isPending}
                autoCapitalize="none"
                keyboardType="email-address"
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
                isLoading={editAccountRequest.isPending}
              >
                Simpan
              </Button>
            </View>
          </FormProvider>
        </View>
      </UserLayout>
    </>
  );
}
