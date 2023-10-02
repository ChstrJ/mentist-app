import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './Logo';
import styles from './styles';
import Background from '../screens/Background';
import {Alert, View} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Splashscreen = ({navigation}) => {
  const getData = async () => {
        const token = await AsyncStorage.getItem('token', token);

      if (token === null) {
        navigation.push("IntroScreen")
      } else {
        navigation.push('Dashboard');
      }
      

      // .then((token) => navigation.push(token === null ? 'IntroScreen' : 'Dashboard'))
      // .catch((error) => console.error('Error checking token:', error));
   
  };
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 500);
  }, []);
  return (
    <Background>
      <View
      style={{height: heightPercentageToDP(90)}}
        className="flex justify-center items-center">
        <Logo />
      </View>
    </Background>
  );
};
export default Splashscreen;
