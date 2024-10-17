import { Stack } from "expo-router";

export default function AdminRootLayout() {
  return (
    <Stack
      initialRouteName="complaints"
      screenOptions={{ animation: "ios", headerShown: false }}
    />
  );
}
