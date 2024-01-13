import {StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import Paper from '../components/Paper';
import {SignupSchema, initialValue} from '../components/Validation/Validation';
import Background from './Background';
import BackButton from '../components/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RadioButton} from 'react-native-paper';
import {styles} from '../components/styles';

export default function TestingScreen() {
  const [checked, setChecked] = useState('');
  const [likertValue, setLikertValue] = useState('');

  const handleLikertChange = value => {
    setLikertValue(value);
  };

  return (
    <ScrollView>
     
    </ScrollView>
  );
}
