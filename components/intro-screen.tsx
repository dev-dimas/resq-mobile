import { View, Modal } from "react-native";
import React from "react";

export default function IntroScreen() {
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View className="flex items-center justify-center w-full h-full bg-black/40"></View>
    </Modal>
  );
}
