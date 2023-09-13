import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './Logo';
import styles from './styles';
import Background from '../screens/Background';
import {View} from 'react-native';

const Splashscreen = ({navigation}) => {
  const getData = async () => {
    try {
        const token = await AsyncStorage.getItem('token', token);
        // const username = await AsyncStorage.getItem('username', username);
      if (token == null) {
        console.log(token)
        // console.log(username)
        navigation.push("IntroScreen")
      } else {
        navigation.push('Dashboard');
        console.log(token)
      }
    } catch (e) {
      console.log(e.data);
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
        className="flex justify-center mt-10"
        style={styles.CenterContainer}>
        <Logo />
      </View>
    </Background>
  );
};
export default Splashscreen;
