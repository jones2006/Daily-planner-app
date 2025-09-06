import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Completed"
        options={{
          title: "Completed",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="check-square" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
