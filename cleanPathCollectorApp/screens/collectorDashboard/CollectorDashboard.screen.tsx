import ScheduleListCardComponent from '@/components/scheduleListCardComponent/scheduleListCardComponent';
import { get, post } from '@/helpers/api';
import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCameraPermissions } from 'expo-camera';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Pressable } from 'react-native'

interface Schedule {
  _id: string;
  wmaId: string;
  collectorId: string;
  area: string | { name: string };
  date: string;
  time: string;  
  status: string;
}

interface Collector {
  _id: string;
  collectorName: string;
  collectorNIC: string;
  truckNumber: string;
}

const CollectorDashboard = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
  const [greeting, setGreeting] = useState("Good Morning");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [progressSchedules, setProgressSchedules] = useState<Schedule[]>([]);
  const [currentCollector, setCurrentCollector] = useState<Collector>();

  useEffect(() => {
    const fetchBus = async () => {
        try {
            const response = await get(`collector/profile`);
            setCurrentCollector(response.data as Collector);
        } catch (error) {
            console.error("Error fetching bus profile:", error);
        }
      };
      fetchBus();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await get(`/schedule/collector-schedules`);
      const scheduleData = response.data as Schedule[];
      setSchedules(scheduleData);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [schedules]);

  useEffect(() => {
    const inprogress = schedules.filter(schedule => schedule.status === 'In Progress')
    setProgressSchedules(inprogress);
  }, [schedules]);


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

  const logoutHandler = async () => {
    try {
        const response = await post(`collector/logout`, {}); 
        if (response.status === 200) {
          Alert.alert("Success", "Logout successfully.");
            router.push("/");
        } else {
            console.error("Logout failed: unexpected response", response);
        }
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

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
            {currentCollector?.collectorName}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(routes)/map")}
        className=" w-full py-3 bg-primary rounded-xl mt-5"
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
        className=" w-full py-3 bg-primary rounded-xl mt-5"
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
            className="bg-primary py-5 w-[48%] px-4 rounded-lg"
          >
            <Text className="text-white font-bold text-[11px] text-center">Request Permissions</Text>
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
                className={`font-bold text-base text-center ${isPermissionGranted ? 'text-white' : 'text-gray-500'}`}
              >
                Scan Code
              </Text>
            </View>
          </Pressable>
        </Link>
      </View>


    <Text className=" mt-3 font-semibold text-lg">Current Journey</Text>
    <View className=' h-[20%] flex justify-center items-center'>
    {progressSchedules.length > 0 ? (
          progressSchedules.map((schedule) => {
              const areaName =
              typeof schedule.area === 'string'
                ? schedule.area
                : schedule.area?.name || 'Unknown Area';

            return (
              <View key={schedule._id}>
                <ScheduleListCardComponent
                  id={schedule._id}
                  area={areaName}
                  date={schedule.date}
                  time={schedule.time}
                  status={schedule.status}
                  btn={true}
                />
              </View>
            );
          })
        ) : (
          <Text>No schedules to be completed</Text>
        )}
    </View>

    <View className=" mt-5 bg-gray-200 rounded-xl p-3">
      <Text className=" text-[#5e5e5e] text-base">
        Monthly Earning so far,{" "}
      </Text>
      <Text className=" text-2xl font-bold text-primary mt-1">
        Rs. 15,000.00{" "}
      </Text>
      <View className=" flex flex-row justify-end mt-3">
        <TouchableOpacity
          onPress={() => router.push("/(routes)/earnings")}
          className=" bg-primary rounded-lg py-3 px-5 w-[50%]"
        >
          <Text className=" text-center text-white text-lg font-semibold">
            View More
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View className=' flex flex-row mt-3 justify-end '>
    <TouchableOpacity
          onPress={logoutHandler}
          className=" border-primary border-2 rounded-lg py-2 px-5 w-[50%]"
        >
          <View className="flex flex-row justify-center gap-2 items-center">
          <Entypo name="log-out" size={24} color="#57912C" />
          <Text className=" text-center text-lg font-bold text-[#57912C]">
            Log out
          </Text>
        </View>
        </TouchableOpacity>
    </View>
    </View>
  )
}

export default CollectorDashboard