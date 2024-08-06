import { Stack } from "expo-router";
import { ComponentProps } from "react";
import BackButton from "./back-button";

export default function Header({
  withBackButton = false,
  title,
  ...props
}: {
  withBackButton?: boolean;
  title: string;
  isLoading?: boolean;
} & ComponentProps<typeof Stack.Screen>) {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: title,
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
        headerLeft: withBackButton ? () => <BackButton /> : undefined,
        ...props.options,
      }}
    />
  );
}
