import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import UserLayout from "@/components/layout/user-layout";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { useSession } from "@/store/useSession";
import NotFound from "@/components/not-found";
import { icons } from "@/constants";
import env from "@/env";
import dayjs from "dayjs";
import dayjsLocaleId from "dayjs/locale/id";
import { cn } from "@/lib/utils";
import Modal from "@/components/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { banUser, solveComplaint } from "@/api/admin";
import { useToken } from "@/store/useToken";
import Toast from "react-native-toast-message";
import { FetchError } from "@/api/core";

export default function ComplaintDetail() {
  const [isModalBanOpen, setIsModalBanOpen] = useState<boolean>(false);
  const [isModalComplaintOpen, setIsModalComplaintOpen] = useState<boolean>(false);
  const { user } = useSession();
  const { token } = useToken();
  const queryClient = useQueryClient();
  let { id } = useLocalSearchParams();
  id = id as string;
  const banSellerRequest = useMutation({
    mutationFn: (data: { accountId: string }) => banUser(data, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard", token] });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Akun penjual berhasil dinonaktifkan!",
      });
      setIsModalBanOpen(false);
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
  const solveComplaintRequest = useMutation({
    mutationFn: () => solveComplaint(id, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard", token] });
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Laporan berhasil diselesaikan!",
      });
      setIsModalComplaintOpen(false);
    },
    onError: (error: FetchError) => {
      if (error.res.statusCode === 500) {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal menyelesaikan laporan. Coba lagi!",
        });
      }
    },
  });

  const complaint = user?.data.complaints?.find((complaint) => complaint.id === id);

  if (!complaint) return <NotFound withHeader>Laporan tidak ditemukan!</NotFound>;

  return (
    <>
      <Header title="Detail Laporan" withBackButton />
      <UserLayout containerClassname="p-0">
        <View className="flex items-center w-full h-full">
          <View className="flex-row justify-between w-full px-6">
            <Text className="flex-1 max-w-[128px] text-lg text-center font-pjs-bold">
              Pelapor
            </Text>
            <Text className="flex-1 max-w-[128px] text-lg text-center font-pjs-bold">
              Target
            </Text>
          </View>
          <View className="flex-row items-center justify-between w-full px-6 mt-3">
            <Image
              source={
                complaint.customer.account.avatar
                  ? env.EXPO_PUBLIC_API_URL + complaint.customer.account.avatar
                  : icons.user
              }
              contentFit="cover"
              placeholder={{
                blurhash: complaint.customer.account.avatarBlurHash || undefined,
              }}
              placeholderContentFit={
                complaint.customer.account.avatarBlurHash ? "cover" : undefined
              }
              className="w-32 h-32 border border-gray-200 rounded-full"
            />
            <Feather name="chevrons-right" size={70} color="#757575" />
            <Image
              source={
                complaint.seller.account.avatar
                  ? env.EXPO_PUBLIC_API_URL + complaint.seller.account.avatar
                  : icons.user
              }
              contentFit="cover"
              placeholder={{
                blurhash: complaint.seller.account.avatarBlurHash || undefined,
              }}
              placeholderContentFit={
                complaint.seller.account.avatarBlurHash ? "cover" : undefined
              }
              className="w-32 h-32 border border-gray-200 rounded-full"
            />
          </View>

          {/* Detail */}
          <View
            className={cn(
              "flex-1 w-full h-full px-6 py-4 mt-10 bg-white border border-slate-300 rounded-t-[20px]",
              complaint.status === "PENDING" && "mb-[76px]"
            )}
            style={{ rowGap: 15 }}
          >
            <View className="flex">
              <Text className="text-base font-pjs-bold">Pelapor</Text>
              <Text className="text-sm font-pjs-medium">
                {complaint.customer.account.name}
              </Text>
            </View>
            <View className="flex">
              <Text className="text-base font-pjs-bold">Email Pelapor</Text>
              <View>
                <Text
                  className="text-sm font-pjs-medium"
                  selectable
                  selectionColor="#ffb4b0"
                >
                  {complaint.customer.account.email}
                </Text>
                <TouchableOpacity></TouchableOpacity>
              </View>
            </View>
            <View className="flex">
              <Text className="text-base font-pjs-bold">Target</Text>
              <Text className="text-sm font-pjs-medium">
                {complaint.seller.account.name}
              </Text>
            </View>
            <View className="flex">
              <Text className="text-base font-pjs-bold">Email Target</Text>
              <Text
                className="text-sm font-pjs-medium"
                selectable
                selectionColor="#ffb4b0"
              >
                {complaint.seller.account.email}
              </Text>
            </View>
            <View className="flex">
              <Text className="text-base font-pjs-bold">Tanggal Lapor</Text>
              <Text className="text-sm font-pjs-medium">
                {dayjs(complaint.createdAt)
                  .locale(dayjsLocaleId)
                  .format("dddd, DD MMMM YYYY")}
                , Jam : {dayjs(complaint.createdAt).locale(dayjsLocaleId).format("HH:mm")}
              </Text>
            </View>
            <View className="flex">
              <Text className="text-base font-pjs-bold">Status Laporan</Text>
              <Text className="text-sm font-pjs-medium">
                {complaint.status === "PENDING" ? "Menunggu keputusan admin" : "Selesai"}
              </Text>
            </View>
            <View className="flex">
              <Text className="text-base font-pjs-bold">Deskripsi</Text>
              <Text className="text-sm font-pjs-medium">{complaint.description}</Text>
            </View>
          </View>
        </View>
      </UserLayout>
      {complaint.status === "PENDING" && (
        <>
          <View
            className="absolute bottom-0 flex flex-row items-center justify-center w-full px-4 bg-white border-t border-t-gray-300 h-[76px]"
            style={{ columnGap: 12 }}
          >
            <TouchableOpacity
              className="flex items-center flex-1 p-3 border-[2px] border-[#49CB5C] bg-white rounded-lg"
              activeOpacity={0.7}
              onPress={() => setIsModalComplaintOpen(true)}
            >
              <Text className="font-pjs-bold text-[#49CB5C]">Tandai Selesai</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={cn(
                "flex items-center flex-1 p-3 border-[2px] border-[#FF3B30] bg-[#FF3B30] rounded-lg",
                !complaint.seller.account.isActive && "opacity-60"
              )}
              activeOpacity={0.7}
              onPress={() => setIsModalBanOpen(true)}
              disabled={!complaint.seller.account.isActive}
            >
              <Text className="text-white font-pjs-bold">Nonaktifkan Penjual</Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={isModalComplaintOpen}
            onClose={() => setIsModalComplaintOpen(false)}
            title="Selesaikan Laporan"
            description="Apakah anda yakin ingin menyelesaikan laporan ini?. Laporan yang telah selesai tidak akan dapat diubah kembali statusnya."
            titleConfirm="Selesaikan"
            buttonVariant="green"
            isLoading={solveComplaintRequest.isPending}
            onConfirm={async () => {
              await solveComplaintRequest.mutateAsync();
            }}
          />
          <Modal
            isVisible={isModalBanOpen}
            onClose={() => setIsModalBanOpen(false)}
            title="Nonaktifkan Penjual"
            description={`Apakah anda yakin ingin menonaktifkan penjual "${complaint.seller.account.name}" ini?.`}
            titleConfirm="Nonaktifkan"
            buttonVariant="red"
            isLoading={banSellerRequest.isPending}
            onConfirm={async () => {
              await banSellerRequest.mutateAsync({
                accountId: complaint.seller.account.id,
              });
            }}
          />
        </>
      )}
    </>
  );
}
