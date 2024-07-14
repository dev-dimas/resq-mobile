import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <>
      <Stack initialRouteName="index" screenOptions={{ animation: "ios" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
