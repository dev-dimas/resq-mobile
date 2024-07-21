import { Stack } from "expo-router";

export default function EditAccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="edit-account" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
}
