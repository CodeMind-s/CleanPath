import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScheduleListCardComponent from '@/components/scheduleListCardComponent/scheduleListCardComponent';
import { get } from '@/helpers/api';

interface Schedule {
  _id: string;
  wmaId: string;
  collectorId: string;
  area: string | { name: string };
  date: string;  
  time: string;  
  status: string;
}

const ScheduleScreen = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [completedSchedules, setCompletedSchedules] = useState<Schedule[]>([]);
  const [inCompletedSchedules, setInCompletedSchedules] = useState<Schedule[]>([]);

  // Fetch schedules
  const fetchSchedules = async () => {
    try {
      const response = await get(`/schedule/collector-schedules`);
      const scheduleData = response.data as Schedule[];
      setSchedules(scheduleData);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      Alert.alert('Error', 'Failed to fetch schedules data.');
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [schedules]);

  // Helper function to sort by date and time
  const sortByDateAndTime = (a: Schedule, b: Schedule) => {
    const dateA = new Date(`${a.date}T${a.time}`).getTime();
    const dateB = new Date(`${b.date}T${b.time}`).getTime();
    return dateA - dateB;
  };

  // Filter and sort schedules based on status, date, and time
  useEffect(() => {
    const completed = schedules
      .filter(schedule => schedule.status === 'Completed')
      .sort(sortByDateAndTime); // Sort by date and time

    const inCompleted = schedules
      .filter(schedule => schedule.status !== 'Completed')
      .sort(sortByDateAndTime); // Sort by date and time
    
    setCompletedSchedules(completed);
    setInCompletedSchedules(inCompleted);
  }, [schedules]);

  return (
    <View className="p-5">
      {/* Incompleted Schedules */}
      <Text className="font-semibold text-lg">To Be Completed</Text>
      <ScrollView className="h-[50%]">
        {inCompletedSchedules.length > 0 ? (
          inCompletedSchedules.map((schedule, index) => {
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
                  btn={index == 0}
                />
              </View>
            );
          })
        ) : (
          <Text>No schedules to be completed</Text>
        )}
      </ScrollView>

      {/* Completed Schedules */}
      <Text className="font-semibold text-lg">Completed</Text>
      <ScrollView className="h-[50%]">
        {completedSchedules.length > 0 ? (
          completedSchedules.map((schedule) => {
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
                  btn={false}
                />
              </View>
            );
          })
        ) : (
          <Text>No completed schedules</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ScheduleScreen;
