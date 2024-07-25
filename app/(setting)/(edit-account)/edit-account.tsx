import { deleteAvatarAccount, postAvatarAccount, postEditAccount } from "@/api/account";
import BackButton from "@/components/back-button";
import Button from "@/components/button";
import ImagePicker from "@/components/image-picker";
import InputField from "@/components/input-field";
import { TEditAccountSchema, editAccountSchema } from "@/schemas/form/edit-account";
import { useToken } from "@/store/useToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { Stack, router } from "expo-router";
import useDashboard from "hooks/query/useDashboard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function EditAccount() {
  const { data: dashboardData } = useDashboard();
  const queryClient = useQueryClient();
  const { token } = useToken();

  const editAccountRequest = useMutation({
    mutationFn: (data: TEditAccountSchema) => postEditAccount(data, token!),
  });

  const updateAvatarRequest = useMutation({
    mutationFn: (image: ImagePickerSuccessResult) => postAvatarAccount(image, token!),
  });

  const deleteAvatarRequest = useMutation({
    mutationFn: () => deleteAvatarAccount(token!),
  });

  const form = useForm({
    resolver: zodResolver(editAccountSchema),
  });

  const {
    control,
    formState: { isDirty },
  } = form;

  const onSubmit: SubmitHandler<TEditAccountSchema> = async (data) => {
    try {
      if (!isDirty) {
        router.navigate(
          typeof dashboardData?.data.subscriber === "number"
            ? "/seller/home"
            : "/customer/home"
        );
        return;
      }

      await editAccountRequest.mutateAsync(data);

      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });

      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Akun berhasil diperbarui",
      });

      router.navigate(
        typeof dashboardData?.data.subscriber === "number"
          ? "/seller/home"
          : "/customer/home"
      );
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui foto profie. Coba lagi!",
      });
    }
  };

  const handleUpdateAvatar = async (avatar: ImagePickerSuccessResult) => {
    try {
      const response = await updateAvatarRequest.mutateAsync(avatar);

      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });

      return response;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui akun. Coba lagi!",
      });
      throw error;
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatarRequest.mutateAsync();
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    } catch {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal memperbarui foto profie. Coba lagi!",
      });
    }
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
              <ImagePicker
                name="avatar"
                control={control}
                buttonStyles="w-48 h-48 border-2 border-[#EFEFEF]"
                imageStyles="w-48 h-48"
                isUserAvatar
                viewerTitle="Foto Profile"
                defaultValue={dashboardData?.data.avatar}
                handleSave={(image: ImagePickerSuccessResult) =>
                  handleUpdateAvatar(image)
                }
                handleDelete={handleDeleteAvatar}
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
                    defaultValue={dashboardData?.data.name}
                    // editable
                  />
                  <InputField
                    name="email"
                    control={control}
                    label="Email"
                    defaultValue={dashboardData?.data.email}
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
