import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import Background from './Background';
import {darkGreen, green} from '../components/Constant';
import Btn from '../components/Btn';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Logo from '../components/Logo';
import styles from '../components/styles';

const Home = props => {
  const navigation = useNavigation();

  return (
    <Background>
      <View
        style={{height: hp(10)}}
        className="flex items-center justify-center mt-12">
        <Logo />
      </View>

      <View
        className="flex justify-center mt-24"
        style={styles.CenterContainer}>
       
        <Text style={styles.fontHomeSub}>Welcome to</Text>
  
        <Text style={styles.fontHome}>
          Mentist!
        </Text>
      </View>

      <View style={styles.CenterContainer}>
        <Text style={styles.fontHomeSub} className="text-xl mt-10">
          Create an account?
        </Text>
        <Btn
          bgColor={'#6FF484'}
          btnLabel="Signup"
          Press={() => navigation.push('SignUp')}
        />

        <Text
          style={styles.fontHomeSub}
          className="flex justify-center items-center">
          Already have an account?
        </Text>

        <Btn
          bgColor={'#6FF484'}
          btnLabel="Login"
          Press={() => navigation.push('LogIn')}
        />
      </View>
    </Background>
  );
};

export default Home;
