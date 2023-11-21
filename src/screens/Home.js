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
import { styles } from '../components/styles';
import Btn2 from '../components/BtnOutline';
import {useDispatch, useSelector} from 'react-redux';
import BtnOutline from '../components/BtnOutline';

const Home = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Background>
      <View
        style={{height: hp(20)}}
        className="flex items-center justify-center mt-12">
        <Logo />
      </View>

      <View
        className="flex justify-center mt-24"
        style={styles.CenterContainer}>
        <Text style={styles.fontHomeSub}>Welcome to</Text>
        <Text style={styles.fontHome}>Mentist!
        </Text>
      </View>

      <View 
      className="flex justify-center items-center"
      style={{marginTop: hp(15)}}>
        <Text style={styles.fontHomeSub} className="mt-10">
          Create an account?
        </Text>
        <BtnOutline
          btnLabel="Register"
          onPress={() => 
          navigation.push('SignUp')}
        />

        <Text
          style={styles.fontHomeSub}
          className="flex justify-center items-center">
          Already have an account?
        </Text>

        <Btn
          btnLabel="Login"
          onPress={() => 
          navigation.push('LogIn')}
        />
      </View>
    </Background>
  );
};

export default Home;
