import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'

const CollectorDashboard = () => {
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <View className=' p-5'>
      <View className="flex flex-row">
        <Image
          source={{ uri: 'https://t4.ftcdn.net/jpg/02/18/58/51/360_F_218585163_hKijGOfFIkC3Fuo9JgX2sVGv69UKoXmM.jpg' }}
          style={{ width: 50, height: 50 }}
          className="rounded-full mr-3"
        />
        <View>
          <Text className=" text-[16px] " style={{ fontWeight: "900" }}>{greeting}</Text>
          <Text className=" text-[20px] font-extrabold text-primary " style={{ fontWeight: "900" }}>
            Kalana Virajitha
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(routes)/map")}
        className=" w-full py-4 bg-primary rounded-xl mt-5"
      >
        <View className="flex flex-row justify-center gap-2 items-center">
          <Ionicons name="location" size={21} color="white" />
          <Text className=" text-center text-lg font-bold text-white">
            Switch On Location
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => router.push("/(routes)/schedule")}
        className=" w-full py-4 bg-primary rounded-xl mt-5"
      >
        <View className="flex flex-row justify-center gap-2 items-center">
          <Ionicons name="calendar" size={21} color="white" />
          <Text className=" text-center text-lg font-bold text-white">
            Schedules
          </Text>
        </View>
      </TouchableOpacity>

      <View className="flex flex-row items-center justify-between ">
      <TouchableOpacity
        className=" w-[47%] py-4 bg-primary rounded-xl mt-5"
      >
        <View className="flex flex-row justify-center gap-2 items-center">
          <Text className=" text-center text-lg font-bold text-white">
          Request
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(routes)/updategarbage")}
        className=" w-[47%] py-4 bg-primary rounded-xl mt-5"
      >
        <View className="flex flex-row justify-center gap-2 items-center">
          <Ionicons name="qr-code-sharp" size={21} color="white" />
          <Text className=" text-center text-lg font-bold text-white">
            Schedules
          </Text>
        </View>
      </TouchableOpacity>
      </View>

    <Text className=" mt-3 font-semibold text-lg">Current Journey</Text>
    <View className=' h-[20%] flex justify-center items-center'>
      <Text>no Schedule</Text>

    </View>



    <View className=" mt-5 bg-gray-200 rounded-xl p-3">
      <Text className=" text-[#5e5e5e] text-base">
        Monthly Earning so far,{" "}
      </Text>
      <Text className=" text-2xl font-bold text-primary mt-1">
        Rs. 15,000.00{" "}
      </Text>
      <View className=" flex flex-row justify-end mt-4">
        <TouchableOpacity
          onPress={() => router.push("/(routes)/earnings")}
          className=" bg-primary rounded-lg py-2 px-5 w-[50%]"
        >
          <Text className=" text-center text-white text-lg font-semibold">
            View More
          </Text>
        </TouchableOpacity>
      </View>
    </View>


    </View>
  )
}

export default CollectorDashboard