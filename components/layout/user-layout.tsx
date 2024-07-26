import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useCallback, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, View } from "react-native";
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
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    await queryClient.invalidateQueries({ queryKey: ["favorite"] });
    await queryClient.invalidateQueries({ queryKey: ["subscription"] });
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="h-full bg-[#F8F8F9]">
      <ScrollView
        className={cn(scrollViewClassname)}
        refreshControl={
          <RefreshControl
            colors={["#FF3B30"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
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
