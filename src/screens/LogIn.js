import {StyleSheet, View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import React, { useState } from 'react';
import Background from './Background';
import {darkGreen, green} from '../components/Constant';
import Center from '../components/styles';
import Btn from '../components/Btn';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import styles from '../components/styles';
const LogIn = () => {
  const navigation = useNavigation()
  const {hidePass, setHidePass} = useState([])

  return (

    <SafeAreaView>
    
    <Background>
      <BackButton goBack={navigation.goBack}/>
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

      <View className="flex justify-center items-center mt-10">
        <Text className="text-black text-xl mt-10 mb-2">
          Login Account
        </Text>

        <TextInput
          className="w-[300] mt-2 rounded-md"
          mode="focused"
          label="Email"
          left={<TextInput.Icon icon={'email'} />}
          outlineColor="green"
          activeOutlineColor='green'
        />

        <TextInput
          className="w-[300] mt-5 rounded-md"
          mode="focused"
          label="Password"
          outlineColor="green"
          activeOutlineColor='green'
          secureTextEntry={true}
          left={<TextInput.Icon icon={'key'} />}
          right={<TextInput.Icon icon={'eye'} />}
      


        />

      


          <View className="flex items-center justify-center">
            <Text className="text-black mt-5">
              Don't have an account?
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={{
                  color: 'blue',
                  marginVertical: '20'
                }}> Signup Here</Text>
              </TouchableOpacity>
            </Text>
          

        <Btn
          className="
          flex justify-center items-center w-screen"
          bgColor={green}
          textColor="white"
          btnLabel="Login"
          Press={() => navigation.push("Dashboard")}
        />
        </View>
      </View>
    </Background>
    </SafeAreaView>
  );
};

export default LogIn;
