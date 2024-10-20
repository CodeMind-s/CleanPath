import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { post } from "@/helpers/api";

export default function TabsIndex() {
  const [collectorNIC, setCollectorNIC] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  
  const loginHandler = async () => {
    try {
      const response = await post(`collector/auth`, { collectorNIC, truckNumber });
  
      if (response.status === 200 || response.status === 201) {
        // Successful login
        console.log("Login successful", response.data);
        router.push("/(routes)/dashboard");
      } else {
        console.error("Login failed: unexpected response", response);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <View className="p-5 h-full justify-center items-center">
      <Image source={require('../assets/images/logo.png')} className="w-52 h-12" />

      <View className="w-full p-1 mt-14">
        {/* Collector NIC */}
        <Text className="text-sm mb-2 mt-2 text-gray-400">Collector NIC</Text>
        <TextInput
          value={collectorNIC}
          onChangeText={setCollectorNIC}
          className="border-2 border-gray-400 rounded-lg w-full p-2"
        />

        {/* Truck Number */}
        <Text className="text-sm mb-2 mt-4 text-gray-400">Truck Number</Text>
        <TextInput
          
          value={truckNumber}
          onChangeText={setTruckNumber}
          className="border-2 border-gray-400 rounded-lg w-full p-2"
        />

        {/* Login Button */}
        <TouchableOpacity
          className="bg-primary rounded-xl mt-14 p-3"
          onPress={loginHandler}
        >
          <Text className="text-white font-semibold text-lg text-center">Login</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}
