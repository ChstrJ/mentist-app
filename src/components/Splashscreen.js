import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './Logo';
import styles from './styles';
import Background from '../screens/Background';
import {Alert, View} from 'react-native';

const Splashscreen = ({navigation}) => {
  const getData = async () => {
        const token = await AsyncStorage.getItem('token', token);
        
        // const first_name = await AsyncStorage.getItem('first_name', first_name);
      if (token === null) {
        console.log(token)
        navigation.push("IntroScreen")
      } else {
        navigation.push('Dashboard');
        // Alert.alert("Welcome back:" + first_name)
      }
   
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
