import SubscriptionCard from "@/components/customer/subscription-card";
import UserLayout from "@/components/layout/user-layout";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Subscription() {
  const { subscription } = useSubscriptionStore();

  if (!subscription) return null;
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Subscription",
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
        }}
      />
      <UserLayout scrollViewClassname="mt-[-10px]">
        <FlashList
          data={subscription.data}
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
        {/* <SubscriptionCard /> */}
      </UserLayout>
    </>
  );
}
