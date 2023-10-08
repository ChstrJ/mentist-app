import {View, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, Platform} from 'react-native';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {TextInput, Text} from 'react-native-paper';
import Logo from '../components/Logo';
import {styles} from '../components/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Stack} from '@react-native-material/core';
import Btn from '../components/Btn';
import {getData, isValidPhone, isValidDate, setAppoint} from '../helper/auth';
import {callApi} from '../helper/callApi';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfAppoint from './ConfAppoint';
import Loader from '../components/Loader';
import Notif from '../components/Notif';

export default function Appointment() {
  const navigation = useNavigation();
  //declare usestate

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [appId, setAppId] = useState('');
  const [error, setError] = useState(false);
  const [conName, setConName] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    getData();
    try {
      AsyncStorage.getItem('id')
        .then(value => {
          setId(value);
        })
        .catch(e => console.log(e));
    } catch (error) {
      console.log(error);
    }
    AsyncStorage.getItem('first_name')
      .then(value => {
        if (value) {
          setFirstName(value);
        }
      })
      .catch(e => console.log(e));

    AsyncStorage.getItem('phone_no')
      .then(value => {
        if (value) {
          setPhoneNumber(value);
        }
      })
      .catch(e => console.log(e));
  }, []);
  const Data = {
    consultant_id: 1,
    user_id: id,
    phone_number: phoneNumber,
    date: date.toISOString().split('T')[0],
    booking_time: date.toISOString().split('T')[1].split('.')[0],
  };

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

  const handleAppointment = async data => {
    const id = 0;
    if (!isValidPhone(phoneNumber) || !isValidDate(date)) {
      Alert.alert(
        'Invalid Credential',
        'Please provide a valid date and number!',
      );
    } else {
      callApi('post', '/appointment', data)
        .then(response => {
          AsyncStorage.setItem('Date', response.data.date)
            .then(value => {
              setDate(value);
            })
            .catch(e => {
              console.log(e);
            });
          id = response.data.appointment_id;
          console.log(id);
          AsyncStorage.setItem('AppointID', id).then(res => {
            setAppId(res);
          });
          navigation.push('Dashboard');
          // Alert.alert('Schedule Success', `Your session will be on ${response.data.date}, ${response.data.time}, with ${response.data.consultant.name}`)
          setConName(response.data.consultant.name);
          setTime(response.data.time);
          setDate(response.data.date);
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
        });
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

          <TextInput
            style={[{width: wp(80)}, styles.fontField]}
            className="mt-5"
            mode="outlined"
            disabled={true}
            label="Name"
            value={firstName}
            left={<TextInput.Icon icon={'account'} />}
          />

          <TextInput
            style={[{width: wp(80)}, styles.fontField]}
            className="mt-5"
            mode="outlined"
            disabled={true}
            label="Phone No."
            value={phoneNumber}
            left={<TextInput.Icon icon={'phone'} />}
            onChangeText={phoneNumber => {
              setPhoneNumber(phoneNumber);
            }}
            
          />

          <View style={[{width: wp(80)}, styles.fontField]} className="mt-5">
            <Btn
              btnLabel="Choose Date"
              onPress={() => showMode('date')}
            />
          </View>

          <View style={[{width: wp(80)}, styles.fontField]} >
            <Btn
              
              
              btnLabel="Choose Time"
              activeOutlineColor="green"
              onPress={() => showMode('time')}
            />
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(date)}
              mode={mode}
              is24Hour={false}
              display="default"
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
            <Btn onPress={() => handleAppointment(Data)} btnLabel="Confirm" />
          </View>
        </View>
      </View>
    </Background>
  );
}
