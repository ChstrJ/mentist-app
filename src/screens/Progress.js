import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Background from './Background';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';

export default function Progress() {
  const navigate = useNavigation();
  return (
    
      <Background>
        <BackButton goBack={navigate.goBack} />
      </Background>
   
  );
}
