import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './Logo';
import styles from './styles';
import Background from '../screens/Background';
import {Alert, View} from 'react-native';

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
        className="flex justify-center items-center mt-64"
        style={styles.CenterContainer}>
        <Logo />
      </View>
    </Background>
  );
};
export default Splashscreen;
