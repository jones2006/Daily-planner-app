import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Task {
  id: string;
  title: string;
  time: string;
}

interface TasksProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
}
export default function Tasks({ tasks, onCompleteTask }: TasksProps) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      showsVerticalScrollIndicator={false}
      className="w-full"
    >
      {tasks.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center justify-between bg-white p-5 rounded-xl shadow-md my-2 w-[90%]"
        >
          <View className="w-[80%] pl-5">
            <Text
              className="text-base text-gray-400"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {item.time}
            </Text>
            <Text
              className="text-base text-gray-700 mt-1 w-full"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {item.title}
            </Text>
          </View>
          <TouchableOpacity
            className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mr-4"
            onPress={() => onCompleteTask(item.id)}
          >
            <Feather name="check-circle" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
