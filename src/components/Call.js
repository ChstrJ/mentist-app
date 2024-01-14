import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function Call({onPress}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <Fontisto name="doctor" size={38} color="#00A556" />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: getStatusBarHeight() - 10,

    left: 13,
  },
  image: {
    width: 30,
    height: 24,
  },
});
