import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import styles from './styles';
const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
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
