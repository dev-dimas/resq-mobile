import { Stack } from "expo-router";

export default function AuthSellerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="create-product" />
      <Stack.Screen name="edit-product/[id]" />
    </Stack>
  );
}
