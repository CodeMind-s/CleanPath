import Ionicons from '@expo/vector-icons/Ionicons';
import { useCameraPermissions } from 'expo-camera';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'

const CollectorDashboard = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
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
        className="w-full py-4 bg-primary rounded-xl mt-5"
      >
        <View className="flex flex-row justify-center gap-2 items-center">
          <Ionicons name="calendar" size={21} color="white" />
          <Text className=" text-center text-lg font-bold text-white">
            Schedules
          </Text>
        </View>
      </TouchableOpacity>

      <View className="flex flex-row items-center justify-between mt-4 ">
        {!isPermissionGranted && (
          <Pressable
            onPress={requestPermission}
            className="bg-blue-500 py-5 w-[48%] px-4 rounded-lg"
          >
            <Text className="text-white font-bold text-center">Request Permissions</Text>
          </Pressable>
        )}

        <Link href="/scanner" asChild>
          <Pressable
            disabled={!isPermissionGranted}
            className={`py-4 px-4 w-[48%] rounded-lg p ${isPermissionGranted ? 'bg-primary w-full' : 'bg-gray-300'}`}
          >
            <View className="flex flex-row items-center justify-center gap-2">
              <Ionicons name="scan" size={21} color="white" />
              <Text
                className={`font-bold text-lg text-center ${isPermissionGranted ? 'text-white' : 'text-gray-500'}`}
              >
                Scan Code
              </Text>
            </View>
          </Pressable>
        </Link>
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