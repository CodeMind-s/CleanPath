import { View, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
// import BusDetailsCard from '@/components/busDetailsCard/BusDetailsCard';

const screenWidth = Dimensions.get('window').width;

const weekData = {
  labels: ['Week01', 'Week02', 'Week03', 'Week04'],
  datasets: [
    {
      data: [30, 75, 25, 60], 
    },
  ],
};

const monthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
  datasets: [
    {
      data: [50, 60, 70, 40, 65, 70, 80, 45, 50, 65, 70, 60], 
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#FAFDFF',
  backgroundGradientTo: '#FAFDFF',
  decimalPlaces: 0, 
  color: (opacity = 1) => `rgba(87, 145, 44, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
};

const EarningScreen = () => {

  if (!weekData || !weekData.datasets || !weekData.datasets[0].data || weekData.datasets[0].data.length === 0) {
    return <Text>No data available</Text>; 
  }
  
  if (!monthData || !monthData.datasets || !monthData.datasets[0].data || monthData.datasets[0].data.length === 0) {
    return <Text>No data available</Text>; 
  }

  return (
    <ScrollView className=' px-4 py-3 h-full bg-swhite'>
      <Text className=' font-semibold text-xl'>Summary of Earnings</Text>
      <View className=' w-full flex flex-row justify-center items-center  mt-4'>
        <Ionicons name="wallet" size={30} color="#57912C" />
        <Text className=' ml-3 font-semibold text-3xl text-center text-primary'>Rs. 15,000.00</Text>
      </View>
      <View className=' mt-4 flex flex-row justify-center items-center'>
        <TouchableOpacity className=' py-3 px-6 bg-primary rounded-lg'>
          <Text className=' text-white font-semibold text-base text-center'>Withdraw Earnings</Text>
        </TouchableOpacity>
      </View>
      {/* <BusDetailsCard /> */}
      <Text className=' font-semibold text-xl mt-4'>Weekly Earnings</Text>
      <BarChart
        data={weekData}
        width={screenWidth - 40} 
        height={230} 
        yAxisLabel="Rs." 
        yAxisSuffix="k" 
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        style={{
          marginVertical: 8
        }}
      />
      <Text className=' font-semibold text-xl mt-4'>Monthly Earnings</Text>
      <BarChart
        data={monthData}
        width={screenWidth - 40} 
        height={230} 
        yAxisLabel="Rs." 
        yAxisSuffix="k" 
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        style={{
          marginVertical: 8
        }}
      />
      <View className=' w-full h-[30px]'></View>
    </ScrollView>
  );
};

export default EarningScreen;
