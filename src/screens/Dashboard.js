import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import Logout from '../components/Logout';
import {styles} from '../components/styles';
import Action from '../components/Action';
import {getData, removeData} from '../helper/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import {Text} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnOutline from '../components/BtnOutline';

const Dashboard = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [date, setDate] = useState(new Date());
  const [appId, setAppId] = useState('');

  
  const handleLogout = async () => {
    const removed = removeData();
    // console.log(token, first_name)
    removed ? navigation.navigate('Home') : console.log('Error logging out');
  };

  const getUser = async () => {
    const first_name = await AsyncStorage.getItem('first_name');
    setFirstName(first_name);
  };

  getUser();

  const getAppoint = () => {
    try {
      // AsyncStorage.removeItem('Date')
      // AsyncStorage.removeItem('AppID')
      AsyncStorage.getItem('AppID').then(value => {
        if (value == null) {
          // setDate(value)
          navigation.navigate('Appointment');
          // navigation.push('Appointment')
        } else {
          navigation.navigate('ConfAppoint');
        }
      });
    } catch (error) {}
  };

  return (
    <Background>
      <View className="flex items-center">
        <Logo />
        <Text className="mt-5" style={styles.fontHomeSub}> Good to see you here, {firstName}
        </Text>
      </View>
      <View className="flex items-center mt-10" style={{height: hp('80%')}}>
        {/* <Action actionLabel="Chatbot AI" source={require('../assets/chatbot.png')} Press={() => navigation.push("Speech")}/> */}
        <Action
          actionLabel="Chatbot AI"
          source={require('../assets/chatbot.png')}
          Press={() => navigation.push('Chatscreen')}
        />
        <Action
          actionLabel="Create Appointment"
          source={require('../assets/appointment.png')}
          Press={getAppoint}
        />
        <Action
          actionLabel="My Progress"
          source={require('../assets/development.png')}
          Press={() => navigation.push('Progress')}
        />
        <View style={{height: hp("15%"), justifyContent: 'flex-end'}}>
          <BtnOutline btnLabel="Logout" onPress={() => handleLogout()} />
        </View>
      </View>
    </Background>
  );
};
export default Dashboard;
