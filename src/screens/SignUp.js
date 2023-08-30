import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Background from './Background';
import {darkGreen, green} from '../components/Constant';
import Btn from '../components/Btn';
import { useNavigation } from '@react-navigation/native';


const SignUp = props => {
  const navigation = useNavigation()
  return (
    <Background>
      <View className="flex justify-center items-center w-screen">
        <Image
          className="mt-20"
          source={require('../assets/logo.png')}
          style={{
            width: 250,
            height: 130,
          }}
        />
      </View>
      <View className="justify-center items-center w-screen">
        <Text className="flex justify-center items-center mt-24 text-white text-2xl">
          Pakyu
        </Text>
        <Text className="flex justify-center items-center text-5xl font-extrabold text-green-500">
          Mentist!
        </Text>
      </View>

      <View className="flex justify-center items-center">
        <Text className="text-center text-white text-xl mt-10">
          Create an account?
        </Text>
        <Btn className="
        flex justify-center items-center w-screen" 
        bgColor={green} 
        textColor="white" 
        btnLabel="Register" 
        />

        <Text className="text-center w-screen text-white text-xl">
          Already have an account?
        </Text>
        <Btn className="flex justify-center items-center w-screen" bgColor={green} textColor="white" btnLabel="Login" />
      </View>
    </Background>
  );
};

export default SignUp

