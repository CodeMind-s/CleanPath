import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";


export default function TabsIndex() {

  return (
    <View className=" flex-1 justify-center items-center">
      <TouchableOpacity className=" bg-primary" onPress={() => {router.push("/(routes)/dashboard")}}>
        <Text>Dashboard</Text>
      </TouchableOpacity> 
    </View>
  );
}
