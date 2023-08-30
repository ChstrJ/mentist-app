import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
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


      <View className="flex justify-center items-center">
        <Text className="text-center text-white text-xl mt-10">
          Create an account
        </Text>
        <TextInput style={style.text} placeholder='First Name'/>
        <TextInput style={style.text} placeholder='Last Name'/>
        <TextInput style={style.text} placeholder='Email'/>
        <TextInput style={style.text} placeholder='Password'/>
        <TextInput style={style.text} placeholder='Confirm Password' />
        
        <Btn className="
        flex justify-center items-center w-screen" 
        bgColor={green} 
        textColor="white" 
        btnLabel="Sign Up" 
        />

      </View>
    </Background>
  );
};
const style = StyleSheet.create({
  text: {
    backgroundColor: '#E5E5E5',
    height: 50,
    width: 300,
    borderRadius: 10, 
    margin: 8
  }
})
export default SignUp

