import {
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
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
import {callApi} from '../helper/callApi';
import { s } from 'react-native-size-matters';
import LogoutBtn from '../components/Logout';

const Dashboard = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');

  // const [date, setDate] = useState(new Date());
  const [uid, setUID] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getUser = async () => {
    const firstName = await AsyncStorage.getItem('first_name');
    setFirstName(firstName);
    const user_id = await AsyncStorage.getItem('id');
    setUID(user_id);
  };

  const handleLogout = async () => {
    const removed = removeData();
    removed ? (navigation.navigate('Home')) : console.log('Error logging out');
  };


  useEffect(() => {
    getUser()
  });

  const getAppoint = () => {
    callApi('get', `/appointment/${uid}`, uid)
      .then(response => {
        const res = JSON.stringify(response.data.appointments);
        console.log(res);

        if (res == '[]') {
          navigation.push('Appointment');
        } else {
          const time = response.data.appointments[0].booking_time;
          const date = response.data.appointments[0].date;
          const appId = JSON.stringify(
            response.data.appointments[0].appointment_id,
          );
          console.log(res);
          console.log(time, date);
          AsyncStorage.setItem('uid', uid);
          AsyncStorage.setItem('time', time);
          AsyncStorage.setItem('date', date);
          AsyncStorage.setItem('AppID', appId);
          AsyncStorage.getItem('AppID')
            .then(res => {
              console.log(res);
            })
            .catch(e => {
              console.log(e);
            });
          navigation.push('ConfAppoint');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Background>
     <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{flexGrow: 1}}>

      <LogoutBtn
        onPress={() => handleLogout()}
      />
    
      <View style={{marginTop: hp(2)}} className="flex items-center">
        <Logo />
        <Text className="mt-5" style={styles.fontHomeSub}>
          Good to see you here, {firstName}{' '}
        </Text>
      </View>


      <View className="flex items-center" style={{marginTop: s(5)}}>
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

        

      </View>
      </ScrollView>
    </Background>
  );
};
export default Dashboard;
