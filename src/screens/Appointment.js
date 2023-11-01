import {View, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, Platform, ScrollView} from 'react-native';
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
import Appointpic from '../assets/Schedule-bro.svg';
import {SelectList} from 'react-native-dropdown-select-list';
import BtnOutline from '../components/BtnOutline';

export default function Appointment() {
  const navigation = useNavigation();
  //declare usestate

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setLoading] = useState('');
  const [notif, setNotif] = useState(false);


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

  // const splitDate = date.toISOString()

  const Data = {
    consultant_id: 2,
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
    // if (!isValidPhone(phoneNumber) || !isValidDate(date)) {
    //   Alert.alert(
    //     'Invalid Credential',
    //     'Please provide a valid date and number!',
    //   );
    // } else {
    // console.log(Data.booking_time)
    callApi('post', '/appointment', data)
      .then(response => {
        setLoading(true);
        const res = JSON.stringify(response);
        const respo = JSON.stringify(response.data.appointment_id);
        console.log(respo + ' ' + res);

        navigation.navigate('Dashboard');
        const resDate = response.data.date;
        const resTime = response.data.booking_time;
        setNotif(true);
        Alert.alert(
          'Schedule Success',
          `Your session will be on ${response.data.date}, ${response.data.booking_time}, with ${response.data.consultant.name}`,
        );
        AsyncStorage.setItem('resTime', resTime); // need to put pass in async items
        AsyncStorage.setItem('resDate', resDate); // need to put pass in async items
      })
      .catch(error => {
        if (error.response) {
          console.log('HTTP Status Code:', error.response.status);
          console.log('Error Data:', error.response.data);
        }
      });
    // }
  };
  let data = []
  

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <Background>
          <BackButton goBack={navigation.goBack} />
          <View
            className="flex items-center justify-center mt-10"
            style={styles.CenterContainer}>
            <View className=" flex items-center">
              <Appointpic width={200} height={200} />
            </View>

            <View className="flex justify-center items-center">
              <Text style={styles.fontHomeSub}>Create Appointment</Text>

              <TextInput
                style={[{width: wp(80)}, styles.fontField]}
                className="mt-5"
                mode="outlined"
                disabled={true}
                label="Name"
                value={firstName}
                left={<TextInput.Icon icon={'account'} />}
              />
              <Notif
                visible={notif}
                onRequestClose={true}
                header="Success"
                body="Noice"
                label="OK"
                
              />
              <TextInput
                style={[{width: wp(80)}, styles.fontField]}
                className="mt-5"
                mode="outlined"
                label="Phone No."
                value={phoneNumber}
                disabled={true}
                keyboardType="numeric"
                maxLength={11}
                left={<TextInput.Icon icon={'phone'} />}
                onChangeText={phoneNumber => {
                  setPhoneNumber(phoneNumber);
                }}
              />

              <View style={[{width: wp(80)}]} className="flex mt-5">
                <SelectList
                  placeholder="Choose Consultant"
                  data={() => resData}
                  save="value"
                  setSelected={val => setConName(val)}
                  style={{zIndex: 200, flex: 1}}
                  searchPlaceholder='Choose Consultant'
                  searchicon={false}
                />
              </View>

              <View
                style={[{width: wp(80)}, styles.fontField]}
                className="mt-2">
                <BtnOutline
                  btnLabel="Choose Date"
                  onPress={() => showMode('date')}
                />
              </View>

              <View style={[{width: wp(80)}, styles.fontField]}>
                <BtnOutline
                  btnLabel="Choose Time"
                  activeOutlineColor="green"
                  onPress={() => showMode('time')}
                />
              </View>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display="spinner"
                  onChange={onChange}
                />
              )}

              <View className="flex items-center justify-center">
                <Btn
                  onPress={() => handleAppointment(Data)}
                  btnLabel="Confirm"
                />
              </View>
            </View>
          </View>
        </Background>
      )}
    </ScrollView>
  );
}
