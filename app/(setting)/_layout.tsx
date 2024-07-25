import { useToken } from "@/store/useToken";
import { Redirect, Stack } from "expo-router";

export default function SettingLayout() {
  const { token } = useToken();
  if (!token) return <Redirect href={"/"} />;

  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="setting" />
      <Stack.Screen name="(edit-account)" />
      <Stack.Screen name="location" />
    </Stack>
  );
}
