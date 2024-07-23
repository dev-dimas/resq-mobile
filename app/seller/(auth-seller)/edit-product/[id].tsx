import { View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import BackButton from "@/components/back-button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProduct() {
  let { id } = useLocalSearchParams();
  id = id as string;
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Edit Produk",
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
          ></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
