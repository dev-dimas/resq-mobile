import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  scrollViewClassname?: string;
  containerClassname?: string;
};

export default function UserLayout({
  children,
  containerClassname,
  scrollViewClassname,
}: Props) {
  return (
    <SafeAreaView className="h-full bg-[#F8F8F9]">
      <ScrollView className={cn(scrollViewClassname)}>
        <View
          className={cn("flex items-center flex-1 w-full px-6 pb-8", containerClassname)}
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
