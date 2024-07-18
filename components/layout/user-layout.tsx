import { ReactNode } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView className="h-full bg-[#F8F8F9]">
      <ScrollView>
        <View
          className="flex items-center flex-1 w-full pt-5 pb-8 px-7"
          style={{
            minWidth: Dimensions.get("window").width,
          }}
        >
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
