import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="setting" />
      <Stack.Screen name="(edit-account)" />
      <Stack.Screen name="location" />
    </Stack>
  );
}
