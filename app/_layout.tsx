import { Stack } from "expo-router";
import { TasksProvider } from "../context/_TasksContext";
import "./global.css";

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboard" />
      </Stack>
    </TasksProvider>
  );
}
