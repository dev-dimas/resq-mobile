import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "constants/";
import { Image } from "expo-image";
import Modal from "../modal";

export default function ButtonDeleteFavorites() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
        onConfirm={() => setIsModalOpen(false)}
      />
    </>
  );
}
