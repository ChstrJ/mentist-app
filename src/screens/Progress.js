import {View, Text, Dimensions} from 'react-native';
import React from 'react';
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

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 5, // optional, default 3
  barPercentage: 1,
};

const data = [
  {
    name: '% Sad',
    percentage: 30,
    color: 'gray',
    legendFontColor: 'black',
    legendFontSize: 15,
  },
  {
    name: '% Happy',
    percentage: 60,
    color: 'green',
    legendFontColor: 'black',
    legendFontSize: 15,
  },
  {
    name: '% Angry',
    percentage: 5,
    color: 'red',
    legendFontColor: 'black',
    legendFontSize: 15,
  },
  {
    name: '% Anxiety',
    percentage: 5,
    color: 'orange',
    legendFontColor: 'black',
    legendFontSize: 15,
  },
  {
    name: '% Stress',
    percentage: 10,
    color: 'rgb(0, 0, 255)',
    legendFontColor: 'black',
    legendFontSize: 15,
  },
];

export default function Progress() {
  const navigate = useNavigation();
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
          data={data}
          width={wp(100)}
          height={hp(30)}
          chartConfig={chartConfig}
          accessor={'percentage'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[15, 10]}
          absolute
        />
        </Card>
      </View>
    </Background>
  );
}
