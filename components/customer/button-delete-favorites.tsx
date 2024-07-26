import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "constants/";
import { Image } from "expo-image";
import Modal from "../modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAllFromFavorite } from "@/api/customer";
import { useToken } from "@/store/useToken";
import Toast from "react-native-toast-message";

export default function ButtonDeleteFavorites() {
  const { token } = useToken();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const deleteFavoritesRequest = useMutation({
    mutationFn: () => removeAllFromFavorite(token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["favorite"],
      });
      setIsModalOpen(false);
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Seluruh daftar favorit dihapus",
      });
    },
    onError: async (error) => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Terjadi kesalahan. Coba lagi!",
      });
    },
  });

  const handleDeleteAllFavorite = async () => {
    if (deleteFavoritesRequest.isPending) return;
    await deleteFavoritesRequest.mutateAsync();
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsModalOpen(true)}
        className="mr-6"
      >
        <Image source={icons.trash} className="w-6 h-6 mt-1" contentFit="contain" />
      </TouchableOpacity>
      <Modal
        title="Hapus Favorit"
        description="Apakah kamu yakin ingin menghapus seluruh daftar favorit?"
        titleConfirm="Hapus"
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAllFavorite}
        isLoading={deleteFavoritesRequest.isPending}
      />
    </>
  );
}
