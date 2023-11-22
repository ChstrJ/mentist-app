import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from './Background';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {PieChart} from 'react-native-chart-kit';
import {styles} from '../components/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Progresspic from '../assets/Mental health-bro.svg';
import Card from '../components/Card';
import {callApi} from '../helper/callApi';

export default function Progress() {
  const [chartData, setChartData] = useState([]);
  const [isProgressEmpty, setProgressEmpty] = useState(false);
  const navigation = useNavigation();

  //config for chart
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
  };

  //create colors for each rate
  const getColorRate = rate => {
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
  };

  const checkProgress = () => {
    chartData.length === 0 ? setProgressEmpty(true) : setProgressEmpty(false);
  };

  const getRate = async () => {
    try {
      const response = await callApi('get', '/chat/rate/result');
      const ratings = response.data.ratings;
      const overall_total = response.data.total.overall_total;
      const chartData = ratings.map(item => {
        const percentage =
          overall_total !== 0 ? ((item.overall / overall_total) * 100).toFixed(2): 0;
        return {
          name: `% ${item.rate}`,
          percentage: parseFloat(percentage),
          color: getColorRate(item.rate),
          legendFontColor: 'black',
          legendFontSize: 15,
        };
      });

      setChartData(chartData);
    } catch (e) {
      console.error('Error:', e);
    }
  };

  useEffect(() => {
    //call the fuction
    getRate();
    checkProgress();
  }, [chartData]);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />

      <View
        style={{height: hp(90)}}
        className="flex justify-center items-center">
        <Progresspic width={250} height={250} />

        <Text style={styles.fontTitle}>My Progress</Text>

        {chartData.some(item => item.percentage !== 0) ? (
          <View>
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
        ) : (
          <Card>
          <View style={styles.chatEmptyContainer}>
            <Text style={{fontFamily: 'Poppins Regular', fontSize: 17, display:'flex', textAlign: 'center'}}>
              No progress yet...
            </Text>
          </View>
          </Card>
        )}
      </View>
    </Background>
  );
}

const style = StyleSheet.create({
  chatEmptyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
