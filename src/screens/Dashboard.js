import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
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
import { callApi } from '../helper/callApi';

const Dashboard = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  // const [date, setDate] = useState(new Date());
  const [appId, setAppId] = useState('');
  const [uid, setUID] = useState('')

  
  const getUser = async () => {
    const first_name = await AsyncStorage.getItem('first_name');
    setFirstName(first_name);
    const user_id = await AsyncStorage.getItem('id');
    setUID(user_id);
  };

  const handleLogout = async () => {
    const removed = removeData();
    // console.log(token, first_name)
    removed ? navigation.navigate('Home') : console.log('Error logging out');
  };

  useEffect(() => {
    getUser();
  }, []);

  const getAppoint = () => {
    
    callApi('get', `/appointment/${uid}`, uid)
    .then(response => {
      const res = JSON.stringify(response.data.appointments)
      if (res == "[]"){
        navigation.navigate('Appointment')

      }
      else{
        const time = response.data.appointments[0].booking_time
        const date = response.data.appointments[0].date
        const appId = response.data.appointments[0].appointment_id
        console.log(res)
        console.log(time, date)
        AsyncStorage.setItem('uid', uid)
        AsyncStorage.setItem('time', time)
        AsyncStorage.setItem('date', date)
        AsyncStorage.setItem('AppID', appId)
        navigation.navigate('ConfAppoint')
      }
    })
    .catch(e => {

      if (e.response){
        console.log('HTTP Status Code:', e.response.status);
        console.log('Error Data:', e.response.data);
      }
      else if (e.request){
        console.log("HTTP STATUS Code: ", e.response.status)
        console.log('Error Data: ', e.response.data)
        Alert.alert('Error', e.response.data)
      }
      else{
        console.log(e, "Eto yun baket? ")
      }
    })
  };

  return (
    <Background>
      <View className="flex items-center">
        <Logo />
        <Text className="mt-5" style={styles.fontHomeSub}>
          {' '}
          Good to see you here, {firstName}
        </Text>
      </View>
      <View className="flex items-center" style={{height: hp(80)}}>
        <Action
          actionLabel="Chatbot AI"
          source={require('../assets/chatbot.png')}
          Press={() => navigation.push('Chatscreen')}
        />
        <Action
          actionLabel="Create Appointment"
          source={require('../assets/appointment.png')}
          Press={
            getAppoint
          } 
        />
        <Action
          actionLabel="My Progress"
          source={require('../assets/development.png')}
          Press={() => navigation.push('Progress')}
        />
        <BtnOutline btnLabel="Logout" onPress={() => handleLogout()} />
      </View>
    </Background>
  );
};
export default Dashboard;
