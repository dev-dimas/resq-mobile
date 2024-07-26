import TabIcon from "@/components/layout/tabs-icons";
import { icons } from "@/constants";
import { Tabs } from "expo-router";

export default function CustomerLayout() {
  return (
    <>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: "#FF3B30",
          tabBarInactiveTintColor: "#757575",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E0E0E0",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.heartOutline}
                focusedIcon={icons.heartFill}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="subscription"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.groupOutline}
                focusedIcon={icons.groupFill}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
