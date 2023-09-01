import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';

export default function Appointment() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Background />

      <BackButton goBack={navigation.goBack} />
    </SafeAreaView>
  );
}
