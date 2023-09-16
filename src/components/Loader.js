import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Loader = () => {
  return (
    <View 
    style={{height: hp(100), width: wp(100)}}
    className="flex justify-center items-center">
      <LottieView
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
        style={styles.lottieLoader}
        speed={1}
      />
    </View>
  );
};

export default Loader;
