import SubscriptionCard from "@/components/customer/subscription-card";
import Header from "@/components/header";
import UserLayout from "@/components/layout/user-layout";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";

export default function Subscription() {
  const { subscription } = useSubscriptionStore();

  return (
    <>
      <Header title="Subscription" />
      <UserLayout scrollViewClassname="mt-[-10px]">
        <FlashList
          data={subscription?.data}
          estimatedItemSize={109}
          estimatedListSize={{ width: 355, height: 805 }}
          renderItem={({ item }) => {
            return <SubscriptionCard subscription={item} />;
          }}
          ListEmptyComponent={
            <Text className="text-center font-pjs-regular">
              Kamu belum subscribe ke penjual manapun
            </Text>
          }
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-[#E8E8E8] my-4">
              <Text>Oke</Text>
            </View>
          )}
        />
      </UserLayout>
    </>
  );
}
