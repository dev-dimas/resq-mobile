import { useToken } from "@/store/useToken";
import { Redirect, Stack } from "expo-router";

export default function AuthSellerLayout() {
  const { token } = useToken();
  if (!token) return <Redirect href={"/"} />;

  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="create-product" />
      <Stack.Screen name="edit-product/[id]" />
    </Stack>
  );
}
