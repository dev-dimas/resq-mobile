import Header from "@/components/header";
import ImageViewer from "@/components/image-viewer";
import UserLayout from "@/components/layout/user-layout";
import Skeleton from "@/components/skeleton";
import { icons } from "@/constants";
import env from "@/env";
import useGetAccountByEmail from "@/hooks/query/useGetAccountByEmail";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Image } from "expo-image";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import id_ID from "dayjs/locale/id";
import Modal from "@/components/modal";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { banUser, unbanUser } from "@/api/admin";
import { useToken } from "@/store/useToken";
import { FetchError } from "@/api/core";
import { useLocalSearchParams } from "expo-router";

function AccountID() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { token } = useToken();
  const { email } = useLocalSearchParams() as { email: string };
  const { data, isPending } = useGetAccountByEmail(email);

  const banUserRequest = useMutation({
    mutationFn: () => banUser({ accountId: data?.data.id || "" }, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["account", email, token] });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Akun penjual berhasil dinonaktifkan!",
      });
      setIsModalOpen(false);
    },
    onError: (error: FetchError) => {
      if (error.res.statusCode === 500) {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal menonaktifkan akun penjual. Coba lagi!",
        });
      }
    },
  });

  const unbanUserRequest = useMutation({
    mutationFn: () => unbanUser({ accountId: data?.data.id || "" }, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["account", email, token] });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Akun pengguna berhasil diaktifkan!",
      });
      setIsModalOpen(false);
    },
    onError: (error: FetchError) => {
      if (error.res.statusCode === 500) {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal mengaktifkan akun pengguna. Coba lagi!",
        });
      }
    },
  });

  const handleSubmit = useCallback(async () => {
    if (data?.data.isActive) {
      await banUserRequest.mutateAsync();
    } else {
      await unbanUserRequest.mutateAsync();
    }
  }, [data?.data.isActive, banUserRequest, unbanUserRequest]);

  const renderImageViewer = useMemo(
    () =>
      data?.data.avatar && (
        <ImageViewer
          title="Foto Akun"
          images={[{ uri: env.EXPO_PUBLIC_API_URL + data.data.avatar }]}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      ),
    [data?.data.avatar, isVisible]
  );

  const renderAccountDetails = useMemo(
    () => (
      <View
        className={cn(
          "flex-1 w-full h-full px-6 py-4 mt-10 bg-white border border-slate-300 rounded-t-[20px] mb-[85px]"
        )}
        style={{ rowGap: 15 }}
      >
        {[
          { label: "Nama", value: data?.data.name },
          { label: "Email", value: data?.data.email },
          { label: "Tipe Akun", value: data?.data.isSeller ? "Penjual" : "Konsumen" },
          { label: "Status", value: data?.data.isActive ? "Aktif" : "Tidak aktif" },
          {
            label: "Dibuat",
            value: dayjs(data?.data.createdAt).locale(id_ID).format("D MMMM YYYY"),
          },
        ].map((item, index) => (
          <View key={index} className="flex">
            <Text className="text-base font-pjs-bold">{item.label}</Text>
            <Text className="text-sm font-pjs-medium">{item.value}</Text>
          </View>
        ))}
      </View>
    ),
    [data?.data]
  );

  return (
    <>
      <Header title="Detail Akun" withBackButton />
      <UserLayout containerClassname="p-0">
        {renderImageViewer}
        <Skeleton isLoading={isPending} borderRadius={9999} width={254} height={254}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (data?.data.avatar) {
                setIsVisible(true);
              }
            }}
          >
            <Image
              source={
                data?.data.avatar
                  ? { uri: env.EXPO_PUBLIC_API_URL + data?.data.avatar }
                  : icons.user
              }
              contentFit="cover"
              placeholder={{ blurhash: data?.data.avatarBlurHash || undefined }}
              placeholderContentFit="cover"
              className="w-[254px] h-[254px] rounded-full"
            />
          </TouchableOpacity>
        </Skeleton>
        {renderAccountDetails}
      </UserLayout>
      <View
        className="absolute bottom-0 flex flex-row items-center justify-center w-full px-4 bg-white border-t border-t-gray-300 h-[85px]"
        style={{ columnGap: 12 }}
      >
        <TouchableOpacity
          className={cn(
            "flex items-center flex-1 p-3 border-[2px] bg-white rounded-lg",
            data?.data.isActive ? "border-[#FF3B30]" : "border-[#49CB5C]"
          )}
          activeOpacity={0.7}
          onPress={() => setIsModalOpen(true)}
        >
          <Text
            className={cn(
              "font-pjs-bold",
              data?.data.isActive ? "text-[#FF3B30]" : "text-[#49CB5C]"
            )}
          >
            {data?.data.isActive ? "Nonaktifkan Akun" : "Aktifkan Akun"}
          </Text>
        </TouchableOpacity>
        <Modal
          isVisible={isModalOpen}
          title={data?.data.isActive ? "Nonaktifkan Akun" : "Aktifkan Akun"}
          description={`Apakah kamu yakin ingin ${data?.data.isActive ? "nonaktifkan" : "aktifkan"} akun ini?`}
          onClose={() => setIsModalOpen(false)}
          titleConfirm={data?.data.isActive ? "Nonaktifkan" : "Aktifkan"}
          onConfirm={handleSubmit}
          buttonVariant={data?.data.isActive ? "red" : "green"}
          isLoading={banUserRequest.isPending || unbanUserRequest.isPending}
        />
      </View>
    </>
  );
}

export default memo(AccountID);
