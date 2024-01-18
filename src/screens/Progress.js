import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
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
import {s} from 'react-native-size-matters';
import { Button } from 'react-native-paper';
import Btn from '../components/Btn';

export default function Progress() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProgressEmpty, setProgressEmpty] = useState(false);
  const navigation = useNavigation();

  //config for chart
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    legendMarginTop: 15,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
  };

  //create colors for each rate
  const getColorRate = rate => {
    switch (rate) {
      case '10':
        return 'darkred';
      case '9':
        return 'gray';
      case '8':
        return 'purple';
      case '7':
        return 'hotpink';
      case '6':
        return 'blue';
      case '5':
        return 'saddlebrown';
      case '4':
        return 'darkorange';
      case '3':
        return 'forestgreen';
      case '2':
        return 'gold';
      case '1':
        return 'indigo';
      default:
        return 'white';
    }
  };

  const ratingLabel = {
    1: 'Optimistic',
    2: 'Energetic',
    3: 'Happy',
    4: 'Content',
    5: 'Neutral',
    6: 'Sad',
    7: 'Stressed',
    8: 'Anxious',
    9: 'Depressed',
    10: 'Despairing',
  };

  const checkProgress = () => {
    chartData.length === 0 ? setProgressEmpty(true) : setProgressEmpty(false);
  };

  const getRate = async () => {
    try {
      setLoading(true);
      const response = await callApi('get', '/chat/rate/result');
      const ratings = response.data.ratings;

      //total ng pinaka overall
      const overall_total = response.data.total;
      //overall ng each number
      const overall = response.data.ratings.overall;

      const chartData = ratings.map(item => {
        const percentage =
          overall_total !== 0
            ? ((item.overall / overall_total) * 100).toFixed(2)
            : 0;

        //kunin ko ung ginawa kong ratingLabel tapos i map ko sa item.rate na galing sa api
        const ratingName = ratingLabel[item.rate];

        return {
          name: `${ratingName}`,
          percentage: parseInt(percentage),
          color: getColorRate(item.rate),

          legendFontColor: 'black',
          legendFontSize: 15,
          legendMarginTop: 5,
        };
      });

      chartData.sort((a, b) => b.percentage - a.percentage);

      setChartData(chartData);
      setLoading(false);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <BackButton goBack={navigation.goBack} />
        <View
          style={{height: hp(90)}}
          className="flex justify-center items-center">
          <Progresspic width={250} height={250} />

          <Text style={styles.fontTitle}>My Progress</Text>

          {loading && chartData.some(item => item.percentage !== 0) ? (
            <View className="">
              <Card>
                <PieChart
                  data={chartData}
                  width={s(350)}
                  height={s(215)}
                  chartConfig={chartConfig}
                  accessor={'percentage'}
                  backgroundColor={'transparent'}
                  paddingLeft={'-25'}
                  center={[25, 5]}
                />
              </Card>
            </View>
          ) : (
            <Card>
              <View style={styles.chatEmptyContainer}>
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    fontSize: 17,
                    display: 'flex',
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  No progress yet...
                </Text>
                <ActivityIndicator size={'large'} color={'#00A556'} />
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
      <View className="justify-center items-center">
      <Btn
        btnLabel={'Read About Mental Health'}
        onPress={() => navigation.push('Wellbeing')}
      />
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
  legendItem: {
    marginTop: 10, // Adjust as needed
  },
});
