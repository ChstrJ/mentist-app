import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import React from 'react';
import Background from './Background';
import {darkGreen, green} from '../components/Constant';
import Center from '../components/styles';
import Btn from '../components/Btn';
import { useNavigation } from '@react-navigation/native';

const LogIn = props => {
  const navigation = useNavigation()
  return (
    <Background>
      <View className="flex justify-center  w-screen" style={Center.CenterContainer}>
        <Image
          className="mt-20"
          source={require('../assets/logo.png')}
          style={{
            width: 250,
            height: 130,
          }}
        />
      </View>

      <View className="flex justify-center " style={Center.CenterContainer}>
        <Text className="text-white text-xl mt-10 mb-2">
          Login Account
        </Text>

        <TextInput
          className="w-[300] mt-2 rounded-xl"
          mode="focused"
          label="Email"
          left={<TextInput.Icon icon={'email'} />}
        />

        <TextInput
          className="w-[300] mt-5 rounded-xl"
          mode="focused"
          label="Password"
          secureTextEntry
          left={<TextInput.Icon icon={'key'} />}
          right={<TextInput.Icon icon={'eye'} />}
        />


          <TouchableOpacity>
            <Text className="text-white mt-5">
              Forgot Password?
            </Text>
          </TouchableOpacity>

        <Btn
          className="
          flex justify-center items-center w-screen"
          bgColor={green}
          textColor="white"
          btnLabel="Log In"
          Press={() => navigation.navigate("Dashboard")}
        />
      </View>
    </Background>
  );
};

export default LogIn;
