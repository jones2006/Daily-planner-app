import img from "@/components/images";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboard() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View className="bg-back w-full h-full">
      <StatusBar barStyle={"dark-content"} backgroundColor={"#3269FF"} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 10,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        className="bg-back w-full h-full"
      >
        <SafeAreaView className="w-full flex-1 bg-back items-center ">
          <Image
            source={img.illustrate}
            className="mt-24 w-[90%] h-[22rem]"
            resizeMode="contain"
          />
          <View className="bg-white w-full h-[70%] mt-20 rounded-t-[40px] elevation-2xl border-gray-200 border-t-2 items-center gap-8">
            <Text
              style={{ fontFamily: "Poppins-Bold" }}
              className="text-2xl text-heading w-[70%]  text-center mt-24"
            >
              Welcome to Daily Planner App
            </Text>
            <Text
              style={{ fontFamily: "Poppins-Regular" }}
              className="text-2xl text-heading w-[80%]  text-center"
            >
              "Organize your day, plan your day, stay focused, achieve more."
            </Text>
            <TouchableOpacity
              className="bg-Primary w-[80%] h-[4rem] rounded-xl items-center justify-center "
              onPress={() => {
                router.navigate("/Screens/Home");
              }}
            >
              <Text
                className="text-white text-base"
                style={{ fontFamily: "Poppins-Bold" }}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
