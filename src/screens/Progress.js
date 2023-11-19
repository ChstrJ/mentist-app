import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Background from './Background';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {styles} from '../components/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Progresspic from '../assets/Mental health-bro.svg'
import Card from '../components/Card';
import { callApi } from '../helper/callApi';






export default function Progress() {

  const [chartData, setChartData] = useState([])
  const navigate = useNavigation();

  //config for chart
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 1,
  };

    //create colors for each rate
  const getColorRate = (rate) => {
    switch (rate) {
      case 'Poor':
        return 'red';
      case 'Not Satisfied':
        return 'orange';
      case 'Good':
        return 'purple';
      case 'Satisfied':
        return 'blue';
      case 'Very Satisfied':
        return 'green';
      default:
        return 'gray'; 
    }
  }


  useEffect(() => {

   //create func to call the ratings from api
   const getRate = async () => {
    try {
      const response = await callApi('get', '/chat/rate/result');
      const ratings = response.data.ratings;
      const overall_total = response.data.total.overall_total;
      console.log(overall_total);
      console.log(ratings);
  
      const chartData = ratings.map(item => ({
        name: `% ${item.rate}`,
        percentage: parseFloat(((item.overall / overall_total) * 100).toFixed(2)),
        color: getColorRate(item.rate),
        legendFontColor: 'black',
        legendFontSize: 15,
      }));
  
      // Assuming setChartData is a function to set the chart data in your application state
      setChartData(chartData);
    } catch (e) {
      // Handle errors here
      console.error('Error fetching or processing data:', e);
    }
  };
  
  

    //call the fuction
    getRate()
    
  }, []); 
  
  

  return (
    <Background>
      <BackButton goBack={navigate.goBack} />

      <View 
      style={{height: hp(90)}}
      className="flex justify-center items-center">
      <Progresspic width={250} height={250} />
        <Text style={styles.fontTitle}>My Progress</Text>
        <Card>
        <PieChart
          data={chartData}
          width={wp(100)}
          height={hp(25)}
          chartConfig={chartConfig}
          accessor={'percentage'}
          backgroundColor={'transparent'}
          paddingLeft={'-60'}
          center={[45, 5]}
          absolute
        />
        </Card>
      </View>
    </Background>
  );
}
