import {View, Button, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView, Platform} from 'react-native';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {TextInput, Text} from 'react-native-paper';
import Logo from '../components/Logo';
import styles from '../components/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Stack} from '@react-native-material/core';
import Btn from '../components/Btn';
import { getData } from '../helper/auth';
import callApi from '../helper/callApi';

export default function Appointment() {
  const navigation = useNavigation();
  //declare usestate

  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const Data = {
    name: this.name, 
    phone: this.phone,
  }
  //create onchange
  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios' ? true : false);
    setDate(currentDate);
  };

  const showMode = modeToShow => {
    setMode(modeToShow);
    setShow(true);
  };

  const handleAppointment = async (data) => {
      const token = await getData()
      const response = await callApi('post', '/appointment', token)
      .then(response => {response.status === 200 ? console.log("Pakyu") : console.log("Hindi")})
      .catch(e => console.log(e.response.data))
  }
  
  return (
    
      <Background>
        <BackButton goBack={navigation.goBack} />
        <View
          className="flex items-center justify-center mt-10"
          style={styles.CenterContainer}>
          <Logo />

          <View className="mt-2 flex items-center">
            <Text className="text-center flex text-xl">Create Appointment</Text>
           
            <TextInput
              className="w-[300] mt-3 rounded-md"
              mode="focused"
              label="Full Name"
              left={<TextInput.Icon icon={'account'} />}
              outlineColor="green"
              activeOutlineColor="green"
              onChangeText={val => {setName(val)}}
            />
            
            <TextInput
              className="w-[300] mt-3 rounded-md"
              mode="focused"
              label="Phone Number"
              keyboardType="numeric"
              maxLength={11}
              left={<TextInput.Icon icon={'phone'} />}
              outlineColor="green"
              activeOutlineColor="green"
              onChangeText={val => {setPhone(val)}}
            />

            <View className="mt-5 w-[300]">
              <Button
                color={'#6FF484'}
                activeOutlineColor='green'
                title="Choose Date"
                onPress={() => showMode('date')}
              />
            </View>

            <View className="mt-5 w-[300] text-white">
              <Button
                color={'#6FF484'}
                title="Choose Time"
                activeOutlineColor='green'
                onPress={() => showMode('time')}
              />
            </View>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={setDate}
              />
            )}
            <View className="flex items-center mt-5">
              <Text className="mb-5 text-lg">Your Appointment Date is:</Text>
              <Text className="flex text-2xl w-100">
                {date.toLocaleString()}
              </Text>
            </View>

            <View className="flex items-center justify-center">
              <Btn
                className="flex justify-center items-center"
                bgColor={styles.Colors.third}
                textColor="white"
                btnLabel="Confirm"
                Press={() => handleAppointment()}
              />
            </View>
          </View>
        </View>
        </Background>
    
  );
}
