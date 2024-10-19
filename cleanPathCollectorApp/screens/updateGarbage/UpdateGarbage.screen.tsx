import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { get, put } from '@/helpers/api';

interface GarbageProps {
  _id: string;
  user: UserProps;
  address: string;
  longitude: number;
  latitude: number;
  type: string;
  area: AreaProps;
  weight: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserProps {
  username: string;
  contact: string;
}

interface AreaProps {
  _id: string;
  name: string;
  type: string;
  rate: number;
}

const UpdateGarbageScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [status, setStatus] = useState('Pending');
  const [garbage, setGarbage] = useState<GarbageProps | null>(null);

  const fetchGarbage = async () => {
    try {
      const response = await get(`garbage/${id}`); // Fetch the booking by ID
      setGarbage(response.data as GarbageProps);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  // console.log(`garbage => `, garbage);
  useEffect(() => {
    if (id) {
      fetchGarbage();
    }
  }, [id]);

  const handleStatusUpdate = async (newStatus: React.SetStateAction<string>) => {
    setStatus(newStatus);
    try {
      const res = await put(`garbage/${id}`, { status: newStatus });
      Alert.alert(
        'Status Updated',
        'The status has been successfully updated.',
        [{ text: 'OK', onPress: () => router.push({ pathname: '/dashboard' }) }]
      );
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert(
        'Update Failed',
        'There was an error updating the status. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        <View className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Garbage Request Details
          </Text>
          {garbage && (
            <View className="space-y-2">
              <Text className="text-gray-600 text-md">
                <Text className="font-medium">Name:</Text> {garbage.user.username}
              </Text>
              <Text className="text-gray-600 text-md">
                <Text className="font-medium">Contact:</Text> {garbage.user.contact}
              </Text>
              <Text className="text-gray-600 text-md">
                <Text className="font-medium">Garbage Type:</Text> {garbage.type}
              </Text>
              <Text className="text-gray-600 text-md">
                <Text className="font-medium">Address:</Text> {garbage.address}
              </Text>
              <Text className="text-gray-600 text-md">
                <Text className="font-medium">Area:</Text> {garbage.area.name}
              </Text>
            </View>
          )}
        </View>

        <View className="bg-white rounded-lg shadow-md p-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Current Status: <Text className="text-yellow-500" >{status}</Text>
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-green-100 py-2 px-6 border border-green-600 rounded-md"
              onPress={() => handleStatusUpdate("Collected")}
            >
              <Text className="text-green-700  font-bold text-lg">Collected</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-100 py-2 px-6 rounded-md border border-red-600"
              onPress={() => handleStatusUpdate("Cancelled")}
            >
              <Text className="text-red-500 font-bold text-lg">Cancelled</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    </ScrollView >
  )
}

export default UpdateGarbageScreen