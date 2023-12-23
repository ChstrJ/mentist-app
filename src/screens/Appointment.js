import {View, Button, Alert, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, Platform, ScrollView} from 'react-native';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {TextInput, Text} from 'react-native-paper';
import Logo from '../components/Logo';
import {styles} from '../components/styles';
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
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Paper from '../components/Paper';
import { s } from 'react-native-size-matters';

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
  const [consult, setConsultant] = useState('');
  const [day, setDay] = useState('');
  const [conName, setConName] = useState('');
  const [selConst, setSelConst] = useState(null);
  const [chosenDateText, setChosenDateText] = useState('');
  const [chosenTimeText, setChosenTimeText] = useState('');

  useEffect(() => {
    getData();
    getConsultant();
    handleDatePicker();
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

  const handleDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (mode === 'date') {
      const formattedDate = currentDate.toLocaleDateString('en-PH');
      setChosenDateText(formattedDate);
    } else if (mode === 'time') {
      const formattedTime = new Date(currentDate).toLocaleTimeString('en-PH', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Manila',
      });

      setChosenTimeText(formattedTime);
    }
  };

  const Data = {
    consultant_id: selConst,
    user_id: id,
    phone_number: phoneNumber,
    date: date.toISOString().split('T')[0],
    booking_time: date.toISOString().split('T')[1].split('.')[0],
  };

  const getConsultant = async () => {
    const reponse = await callApi('get', '/consultant')
      .then(response => {
        const res = response.data.consultants;
        const listCont = res.map(item => {
          return {key: item.id, value: `${item.name}`};
        });
        setConsultant(listCont);
        console.log(consult + 'const and listCont ' + listCont);
      })

      .catch(e => console.log(e));
  };
  const handleConsult = selectedValue => {
    const selectedConsultant = consult.find(
      item => item.value === selectedValue,
    );
    if (selectedConsultant) {
      setSelConst(selectedConsultant.key);
    }
  };
  //create onchange
  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios' ? true : false);

    setDate(currentDate);
  };

  const showModeDate = () => {
    setShow(true);
    setMode('date');
  };

  const showModeTime = () => {
    setShow(true);
    setMode('time');
  };

  const handleAppointment = async data => {
    callApi('post', '/appointment', data)
      .then(response => {
        setLoading(true);
        const res = JSON.stringify(response);
        const respo = JSON.stringify(response.data.appointment_id);
        console.log(respo + ' ' + res);

        navigation.push('Dashboard');
        const resDate = response.data.date;
        const resTime = response.data.booking_time;
        setNotif(true);
        Alert.alert(
          'Schedule Success',
          `Your session will be on ${response.data.date}, ${response.data.booking_time}, with ${response.data.consultant.name}`,
        );
        AsyncStorage.setItem('resTime', resTime);
        AsyncStorage.setItem('resDate', resDate);
      })
      .catch(error => {
        if (error.response) {
          const errorMessage = error.response.data.error.date
            ? error.response.data.error.date
            : error.response.data.error.booking_time;
          console.log('HTTP Status Code:', error.response.status);
          console.log('Error Message:', errorMessage);
          Alert.alert('Error!', errorMessage);
          setLoading(false);
        }
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <Background>
          <BackButton goBack={navigation.goBack} />
          <View className="flex items-center justify-center mt-10">
            <View className=" flex items-center">
              <Appointpic width={200} height={200} />
            </View>

            <View className="flex justify-center items-center">
              <Text style={styles.fontHomeSub}>Create Appointment</Text>

              <Paper
                label={'Name'}
                icon={'account'}
                value={firstName}
                disabled={true}
              />

              <Paper
                label={'Phone Number'}
                icon={'phone'}
                value={phoneNumber}
                disabled={true}
                onChangeText={phoneNumber => {
                  setPhoneNumber(phoneNumber);
                }}
              />

              <View
                style={[
                  {
                    width: wp(80),
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 8,
                  },
                ]}
                className="flex mt-5">
                <View style={{width: s(290), flex: 1}}>
                  <SelectList
                    placeholder="Choose Consultant"
                    data={consult}
                    save="value"
                    setSelected={val => {
                      setConName(val);
                      handleConsult(val);
                      console.log(val);
                    }}
                    style={{zIndex: 200, width: '100%'}} // Use width: '100%' to maintain the size
                    searchPlaceholder="Choose Consultant"
                    searchicon={false}
                  />
                </View>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    showModeDate();
                  }}>
                  <TextInput
                    style={[{width: s(290)}, styles.fontField]}
                    className="mt-5"
                    label="Chosen Date"
                    value={chosenDateText}
                    outlineStyle={{borderRadius: 13}}
                    mode="outlined"
                    left={<TextInput.Icon icon={'calendar'} />}
                    activeOutlineColor="green"
                    editable={false}
                  />

                  
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    showModeTime();
                  }}>
                  <TextInput
                    className="mt-5"
                    style={[{width: s(290)}, styles.fontField]}
                    label="Chosen Time"
                    value={chosenTimeText}
                    mode="outlined"
                    outlineStyle={{borderRadius: 13}}
                    left={<TextInput.Icon icon={'watch'} />}
                    editable={false}
                    activeOutlineColor="green"
                  />
                </TouchableOpacity>
              </View>

              {show && (
                <RNDateTimePicker
                  style={{}}
                  themeVariant="dark"
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display="spinner"
                  timeZoneName={'Asia/Singapore'}
                  onChange={handleDatePicker}
                />
              )}

              <View className="flex items-center justify-center mt-5">
                <Btn
                  onPress={() => handleAppointment(Data)}
                  btnLabel="Confirm"
                  style={{zIndex: 0}}
                />
              </View>
            </View>
          </View>
        </Background>
      )}
    </ScrollView>
  );
}
