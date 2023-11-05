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
      const response = await callApi('get', '/chat/rate/result')
      const ratings = response.data.ratings

      const chartData = ratings.map(item => ({
        name: `% ${item.rate}`,
        percentage: item.overall  ,
        color: getColorRate(item.rate),
        legendFontColor: 'black',
        legendFontSize: 15,
      }))

      //pass the data
      setChartData(chartData)
    }


    //call the fuction
    getRate()
    
  }, []); 
  
  

  return (
    <Background>
      <BackButton goBack={navigate.goBack} />

      <View 
      style={{height: hp(90)}}
      className="flex justify-center items-center">
      <Progresspic width={300} height={300} />
        <Text style={styles.fontTitle}>My Progress</Text>
        <Card>
        <PieChart
          data={chartData}
          width={wp(100)}
          height={hp(25)}
          chartConfig={chartConfig}
          accessor={'percentage'}
          backgroundColor={'transparent'}
          paddingLeft={'-30'}
          center={[25, 5]}
          absolute
        />
        </Card>
      </View>
    </Background>
  );
}
