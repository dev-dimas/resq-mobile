import { Tabs } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

export default function _layout() {
  return (
    <Tabs
      initialRouteName="complaints"
      screenOptions={{
        tabBarActiveTintColor: "#FF3B30",
        tabBarInactiveTintColor: "#757575",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          height: 84,
        },
        tabBarLabelStyle: {
          fontFamily: "PlusJakartaSans-Bold",
          fontSize: 13,
          bottom: 14,
        },
      }}
    >
      <Tabs.Screen
        name="complaints"
        options={{
          tabBarLabel: "Laporan",
          tabBarIcon: ({ color }) => <Octicons name="report" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Cari",
          tabBarIcon: ({ color }) => <Octicons name="search" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
