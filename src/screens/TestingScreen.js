import {StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import Paper from '../components/Paper';
import {SignupSchema, initialValue} from '../components/Validation/Validation';
import Background from './Background';
import BackButton from '../components/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RadioButton} from 'react-native-paper';
import { styles } from '../components/styles';

export default function TestingScreen() {
  const [checked, setChecked] = useState('');
  const [likertValue, setLikertValue] = useState('');
  


  const handleLikertChange = value => {
    setLikertValue(value)
  }

  return (
    <ScrollView>
      <Background>
        <BackButton />


        <View className="p-4">
      <Text 
      style={styles.fontSub}
      className="mt-10 flex text-center">On a scale of 1-10, how are you feeling today?</Text>
      <View className="flex-row justify-center items-center">

        <RadioButton.Group onValueChange={handleLikertChange} value={likertValue.toString()}>
          <View className="flex-1 items-center justify-center">
            <RadioButton.Item label="Euphoric (1)" value="1" color="green" />
          </View>
          <View className="flex-1  justify-between items-center">
            <RadioButton.Item label="Optimistic (2)" value="2" color="green" />
            
          </View>
          <View className="flex-1  justify-between items-center">
            <RadioButton.Item label="Energetic (3)" value="3" color="green" />
           
          </View>
          <View className="flex-1  justify-between items-center">
            <RadioButton.Item label="Happy (4)" value="4" color="green" />
            
          </View>
          <View className="flex-1  justify-between items-center">
            <RadioButton.Item label="Content (5)" value="5" color="green" />
          
          </View>
          <View className="flex-1  justify-between items-center">
            <RadioButton.Item label="Neutral (6)" value="6" color="green" />
         
          </View>
          <View className="flex-1  justify-between items-center">
            <RadioButton.Item label="Stressed (7)" value="7" color="green" />
            
          </View>
          <View className="flex-1  justify-between items-center">
            <RadioButton.Item label="Anxious (8)" value="8" color="green" />
        
          </View>
          <View className="flex-1  justify-between items-center">
            <RadioButton.Item label="Depressed (9)" value="9" color="green" />
          
          </View>
          {/* Continue for values 3 to 9 */}
          <View className="flex-1 items-center">
            <RadioButton.Item label="Despairing (10)" value="10" color="green" />
          </View>
        </RadioButton.Group>
  
      </View>
      <Text className="mt-4">Selected Value: {likertValue}</Text>
    </View>
    
      </Background>
    </ScrollView>
  );
}
