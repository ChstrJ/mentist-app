import {StyleSheet, Text, View, Image, Dimensions, ScrollView} from 'react-native';
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
import { vs, s } from 'react-native-size-matters';


const Home = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Background>
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{flexGrow: 1}}>


   

      <View
        style={{height: hp(20)}}
        className="flex items-center justify-center mt-12">
        <Logo />
      </View>
      
      <View
        className="flex items-center justify-center mt-24">
        <Text style={styles.fontHomeSub}>Welcome to</Text>
        <Text style={styles.fontHome}>Mentist!
        </Text>
      </View>

      <View 
      className="flex justify-center items-center"
      style={{display: 'flex', height: s(230)}}>
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
          navigation.navigate('Dashboard')}
        />
      </View>
    </ScrollView>
  </Background>
  );
};

export default Home;

