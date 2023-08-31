import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import Background from './Background';
import {darkGreen, green} from '../components/Constant';
import Btn from '../components/Btn';
import { useNavigation } from '@react-navigation/native';
import Center from '../components/styles';
import Logo from '../components/Logo';
import styles from '../components/styles'
const Home = props => {
  const navigation = useNavigation()
  
  return (
    <Background>
      <View className="flex justify-center  mt-10" style={styles.CenterContainer}>
        <Logo/>
      </View>
      <View className="flex justify-center  w-screen mt-24" style={styles.CenterContainer}>
        <Text className="flex justify-center text-white text-2xl">
          Welcome to
        </Text>
        <Text className="flex justify-center  text-5xl font-extrabold text-green-500">
          Mentist!
        </Text>
      </View>

      <View className=" justify-center"  style={styles.CenterContainer}>
        <Text className="text-white text-xl mt-10"  style={styles.CenterText}>
          Create an account?
        </Text>
        <Btn className="
        flex justify-center items-center w-screen"
        bgColor={green} 
        textColor="white" 
        btnLabel="Register" 
        Press={() => navigation.push("SignUp")}
        
        />
    

        <Text className="w-screen text-white text-xl" style={styles.CenterText}>
          Already have an account?
        </Text>

      

        <Btn className="flex justify-center items-center w-screen" 
        bgColor={green} 
        textColor="white" 
        btnLabel="Log In"
        Press={() => navigation.push("LogIn")} 
        />
      </View>
    </Background>
  );
};

export default Home;

