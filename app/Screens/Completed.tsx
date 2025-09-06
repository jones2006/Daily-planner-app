import { useTasks } from "../../context/_TasksContext";
import Feather from "@expo/vector-icons/Feather";
import { useFonts } from "expo-font";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Task {
  id: string;
  title: string;
  time: string;
}

export default function Completed() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const { completedTasks, handleDeleteTask } = useTasks();
  return (
    <View className="bg-back w-full h-full">
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
        className="bg-back w-full h-full"
      >
        <SafeAreaView className="w-full h-full bg-back items-center ">
          <View className="w-full mt-10 ml-14">
            <View className="flex-row gap-1">
              <Text
                className="text-2xl text-black"
                style={{ fontFamily: "Poppins-Bold" }}
              >
                Completed
              </Text>
              <Text
                className="text-2xl text-Primary"
                style={{ fontFamily: "Poppins-Bold" }}
              >
                Plan
              </Text>
            </View>
          </View>
          {/* main content */}
          {completedTasks.length > 0 ? (
            completedTasks.map((item) => (
              <View
                key={item.id}
                className="flex-row items-center justify-between bg-white p-5 rounded-xl shadow-md my-2 w-[90%]"
              >
                <View className="w-[80%] pl-5">
                  <Text
                    className="text-base text-gray-400 line-through"
                    style={{ fontFamily: "Poppins-Medium" }}
                  >
                    {item.time}
                  </Text>
                  <Text
                    className="text-base text-gray-700 mt-1 w-full line-through"
                    style={{ fontFamily: "Poppins-Medium" }}
                  >
                    {item.title}
                  </Text>
                </View>
                <TouchableOpacity
                  className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mr-4"
                  onPress={() => handleDeleteTask(item.id)}
                >
                  <Feather name="trash" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View className="w-full h-full items-center justify-center gap-2 mt-44">
              <View className="w-24 h-24 bg-gray-200 items-center justify-center rounded-full">
                <Feather name="x" color="gray" size={32} />
              </View>
              <Text
                className="text-xl text-gray-900"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                No Tasks
              </Text>
              <Text
                style={{ fontFamily: "Poppins-Regular" }}
                className="text-subheading"
              >
                Add your first task to get started
              </Text>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
