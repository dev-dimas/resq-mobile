import { logout } from "@/api/auth";
import BackButton from "@/components/back-button";
import Modal from "@/components/modal";
import SecureStore from "@/lib/secure-store";
import { useToken } from "@/store/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { icons } from "constants/";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Setting() {
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState<boolean>(false);
  const { token, setToken } = useToken();
  const queryClient = useQueryClient();
  const logoutRequest = useMutation({
    mutationFn: () => logout(token!),
  });

  async function handleLogout() {
    try {
      await logoutRequest.mutateAsync().then(() => {
        setToken(null);
      });
      await SecureStore.deleteItemAsync("token");
      queryClient.clear();
      router.dismissAll();

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Berhasil logout!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal logout. Coba lagi!",
      });
    } finally {
      setIsModalLogoutOpen(false);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Pengaturan",
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
            <View className="flex items-center w-full bg-white border rounded-lg border-slate-200">
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-full"
                onPress={() => router.navigate("/edit-account")}
              >
                <View className="flex-row items-center justify-between p-3">
                  <View className="flex-row items-center" style={{ columnGap: 10 }}>
                    <Image source={icons.user} tintColor="#1B1717" className="w-6 h-6" />
                    <Text className="text-base font-pjs-semibold text-[#1B1717]">
                      Edit Akun
                    </Text>
                  </View>
                  <Image source={icons.chevronLeft} className="w-6 h-6 rotate-180" />
                </View>
              </TouchableOpacity>
              <View
                className="h-0.5 bg-slate-200"
                style={{ width: Dimensions.get("window").width - 72 }}
              ></View>
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-full"
                onPress={() => setIsModalLogoutOpen(true)}
              >
                <View className="flex-row items-center p-3" style={{ columnGap: 10 }}>
                  <Image
                    source={icons.logout}
                    tintColor="#FF3B30"
                    className="h-5 aspect-[10/9]"
                  />
                  <Text className="text-base font-pjs-semibold text-[#FF3B30]">
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            isVisible={isModalLogoutOpen}
            onClose={() => setIsModalLogoutOpen(false)}
            onConfirm={handleLogout}
            title="Keluar"
            description="Apakah anda yakin ingin keluar?"
            titleConfirm="Keluar"
            isLoading={logoutRequest.isPending}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
