import { images } from "@/constants";
import { Image } from "expo-image";
import { ReactNode } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView keyboardShouldPersistTaps="handled">
        <View
          className="flex items-center flex-1 w-full pt-5 pb-8 px-7"
          style={{
            minWidth: Dimensions.get("window").width,
          }}
        >
          <Image
            source={images.logo}
            contentFit="contain"
            className="w-[180px] h-[180px]"
          />
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
