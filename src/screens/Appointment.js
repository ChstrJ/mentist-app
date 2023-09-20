import {View, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import { getData, isValidPhone, isValidDate } from '../helper/auth';
import { callApi } from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfAppoint from './ConfAppoint';
import Loader from '../components/Loader';


export default function Appointment() {
  const navigation = useNavigation();
  //declare usestate

  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [id, setId] = useState('')

  // useEffect( async() => {
  //   try {
  //     await AsyncStorage.getItem('id')
  //     .then(value => {
  //       setId(value)
  //     })
  //     .catch(e => console.log(e))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  useEffect(() => {
    getData()
    try {
      AsyncStorage.getItem('id')
      .then(value => {
        setId(value)
      })
      .catch(e => console.log(e))
    } catch (error) {
      console.log(error)
    }
  }, )
  const Data = {
    consultant_id: 1,
    user_id: id, 
    phone_number: phone,
    date: date.toISOString().split('T')[0],
    booking_time: date.toISOString().split('T')[1].split('.')[0],
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
    if (!isValidPhone(phone) || !isValidDate(date)){
      Alert.alert('Invalid Credential', 'Please provide a valid date and number!')
    }
    else{
      callApi('post', '/appointment', data)
      .then(response => {
        AsyncStorage.setItem('Date', date)
        .then(value => {
          setDate(value)
        }).catch(e => {console.log(e)})
        
        navigation.push('Dashboard')
        Alert.alert('Schedule Success', `Your session will be on ${Data.date}, ${Data.booking_time}`)
      })
      .catch(error => {
        if (error.response) {
          // The server responded with an error (status code 4xx or 5xx)
          console.log('HTTP Status Code:', error.response.status);
          console.log('Error Data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('No response received from the server');
        } else {
          // Something else happened while setting up the request
          console.log('Error:', error.message);
        }
      })
    }
  };


  return (
    
      <Background>
        <BackButton goBack={navigation.goBack} />
        <View
          className="flex items-center justify-center mt-10"
          style={styles.CenterContainer}>
          <Logo />

          <View className="mt-2 flex items-center">
            <Text className="text-center flex text-xl">Create Appointment</Text>
           
            {/* <TextInput
              className="w-[300] mt-3 rounded-md"
              mode="focused"
              label="Full Name"
              left={<TextInput.Icon icon={'account'} />}
              outlineColor="green"
              activeOutlineColor="green"
              onChangeText={val => {setName(val)}}
            />
             */}
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
                  testID='dateTimePicker'
                  value={new Date(date)}
                  mode={mode}
                  is24Hour={false}
                  display='default'
                  onChange={onChange}
                />
              )}


            <View className="flex items-center mt-5">
              <Text className="mb-5 text-lg">Your Appointment Date is:</Text>
              <Text className="flex text-2xl w-100">
                {date.toLocaleString('en-PH')}
              </Text>
            </View>

            <View className="flex items-center justify-center">
              <Btn
                className="flex justify-center items-center"
                bgColor={styles.Colors.third}
                textColor="white"
                btnLabel="Confirm"
                Press={() => handleAppointment(Data)}
              />
            </View>
          </View>
        </View>
        </Background>
    
  );
}