import Tasks from "../../components/Tasks";
import { useTasks } from "@/context/_TasksContext";
import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [hasTime, setHasTime] = useState(false);
  const [title, setTitle] = useState("");
  const { tasks, handleAddTask, handleCompleteTask } = useTasks();

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios"); // iOS la remain, Android la close
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTime(Platform.OS === "ios");
    if (selectedTime) {
      setDate(selectedTime);
      setHasTime(true);
    }
  };

  const onHandleAddTask = () => {
    if (title && hasTime) {
      handleAddTask(title, date);
      setTitle("");
      setHasTime(false);
      setModal(false);
    }
  };

  return (
    <View className="bg-back w-full h-full">
      <StatusBar barStyle={"dark-content"} backgroundColor={"#3269FF"} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
        className="bg-back w-full h-full"
      >
        <SafeAreaView className="w-full h-full bg-back items-center ">
          <View className="w-full mt-10 items-center flex-row justify-evenly gap-x-28">
            {/* Text and add btn */}
            <View className="flex-row gap-1">
              <Text
                className="text-3xl text-black"
                style={{ fontFamily: "Poppins-Bold" }}
              >
                Today
              </Text>
              <Text
                className="text-3xl text-Primary"
                style={{ fontFamily: "Poppins-Bold" }}
              >
                Plan
              </Text>
            </View>
            <TouchableOpacity
              className="bg-Primary flex-row gap-1 w-32 h-10 items-center justify-center rounded-full"
              onPress={() => {
                setModal(true);
              }}
            >
              <Feather name="plus" size={24} color="white" />
              <Text
                className="text-sm text-white"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                Add Plan
              </Text>
            </TouchableOpacity>
          </View>
          {/* date select and change */}
          <View className="w-[90%] h-20 mt-9 rounded-xl flex-row justify-evenly items-center gap-x-48 shadow-xl bg-white border-b-2 border-gray-200">
            <View className="flex-col ">
              <Text className="text-lg" style={{ fontFamily: "Poppins-Bold" }}>
                {/* Wednesday */}{" "}
                {date.toLocaleDateString("en-US", { weekday: "long" })}
              </Text>
              <Text
                style={{ fontFamily: "Poppins-Regular" }}
                className="text-base"
              >
                {/* Sep 4,2025 */}{" "}
                {date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-Primary w-10 h-10 items-center justify-center rounded-full"
              onPress={() => setShow(true)}
            >
              <Feather name="calendar" color="white" size={18} />
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          {/* main content */}
          {tasks.length > 0 ? (
            <Tasks tasks={tasks} onCompleteTask={handleCompleteTask} />
          ) : (
            <View className="w-full h-full items-center justify-center gap-2 mt-12">
              <View className="w-24 h-24 bg-gray-200 items-center justify-center rounded-full">
                <Feather name="plus" color="gray" size={32} />
              </View>
              <Text
                className="text-xl text-gray-900"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                Add a task
              </Text>
              <Text
                style={{ fontFamily: "Poppins-Regular" }}
                className="text-subheading"
              >
                Add your first task to get started
              </Text>
            </View>
          )}

          {/* moodal */}
          <Modal
            animationType="fade"
            visible={modal}
            onRequestClose={() => {
              setModal(!modal);
            }}
            transparent={true}
            statusBarTranslucent={true}
          >
            <View className="w-full h-full items-center justify-center bg-[#00000040]">
              <View className="w-[85%] h-[25rem] bg-white rounded-3xl items-center flex-col gap-4">
                <View className="flex-row w-full items-center mt-10 justify-evenly gap-x-32">
                  <Text
                    className="text-2xl"
                    style={{ fontFamily: "Poppins-SemiBold" }}
                  >
                    New task
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModal(false);
                    }}
                  >
                    <Feather name="x" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
                <View className="w-[85%] ml-5 mt- gap-2">
                  <Text
                    className="text-subheading text-base"
                    style={{ fontFamily: "Poppins-Medium" }}
                  >
                    Title
                  </Text>
                  <TextInput
                    className="w-[95%] h-14 border-2 border-gray-500 rounded-lg pl-5"
                    placeholder="Task Title"
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>
                <View className="w-[85%] ml-5 mt- gap-2">
                  <Text
                    className="text-subheading text-base"
                    style={{ fontFamily: "Poppins-Medium" }}
                  >
                    Time
                  </Text>
                  <TouchableOpacity
                    className="w-[95%] h-14 border-2 border-gray-500 rounded-lg
                    pl-5 justify-center"
                    onPress={() => setShowTime(true)}
                  >
                    <Text>
                      {hasTime
                        ? date.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Set Time"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  className="bg-Primary w-[80%] h-14 items-center justify-center rounded-lg mt-2"
                  onPress={onHandleAddTask}
                >
                  <Text
                    className="text-base text-white"
                    style={{ fontFamily: "Poppins-Medium" }}
                  >
                    Add Tasks
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {showTime && (
              <DateTimePicker
                value={date}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </Modal>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
