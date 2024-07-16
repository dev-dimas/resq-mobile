import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack initialRouteName="sign-in" screenOptions={{ animation: "ios" }}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
