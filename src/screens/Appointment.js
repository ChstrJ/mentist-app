import {View, Button, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, Platform, ScrollView} from 'react-native';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {TextInput, Text} from 'react-native-paper';
import Logo from '../components/Logo';
import {styles} from '../components/styles';
import Btn from '../components/Btn';
import {getData, isValidPhone, isValidDate, setAppoint} from '../helper/auth';
import {callApi} from '../helper/callApi';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import Appointpic from '../assets/Schedule-bro.svg';
import {SelectList} from 'react-native-dropdown-select-list';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Paper from '../components/Paper';
import {s} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import BelowLabel from '../components/BelowLabel';
import Helplines from './Helplines';

export default function Appointment() {
  const navigation = useNavigation();
  //declare usestate

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [concern, setConcern] = useState('');

  const [selConst, setSelConst] = useState('');
  const [selectedConsultantTime, setSelectedConsultantTime] = useState('');
  const [chosenDateText, setChosenDateText] = useState('');
  // const [chosenTimeText, setChosenTimeText] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const [consultData, setConsultantData] = useState([]);
  const [consult, setConsultant] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [consultantTime, setConsultantTime] = useState([]);

  const getUserInfo = async () => {
    const uid = await AsyncStorage.getItem('id');
    const fname = await AsyncStorage.getItem('first_name');
    const phone = await AsyncStorage.getItem('phone_no');
    setId(uid);
    setFirstName(fname);
    setPhoneNumber(phone);
  };

  useEffect(() => {
    getUserInfo();
    getConsultant();
    handleDatePicker();
  }, []);

  // const splitDate = date.toISOString()

  const handleDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (mode === 'date') {
      const formattedDate = currentDate.toLocaleDateString('en-PH');
      setChosenDateText(formattedDate);
      // } else if (mode === 'time') {
      //   const formattedTime = new Date(currentDate).toLocaleTimeString('en-PH', {
      //     hour12: true,
      //     hour: 'numeric',
      //     minute: 'numeric',
      //     timeZone: 'Asia/Manila',
      //   });
      //   setChosenTimeText(formattedTime);
    }
  };

  const Data = {
    consultant_id: selConst,
    user_id: id,
    phone_number: phoneNumber,
    date: date.toISOString().split('T')[0],
    concern: concern,
    booking_time: selectedConsultantTime // date.toISOString().split('T')[1].split('.')[0],
  };

  const getConsultant = async () => {
    try {
      const response = await callApi('get', '/consultant');
      const consultants = response.data.consultants;

      const consultantData = consultants.map(consultant => ({
        id: consultant.id,
        name: consultant.name,
        date: consultant.date,
        available_time: consultant.available_time,
      }));

      //if else condition? if the date is not weekend and the time is not 7am-5pm, show the time in future dates
      
      setConsultantData(consultantData);
      console.log(consultantData);
    } catch (error) {
      console.log(error);
    }
  };


  const getConsultantTime = async time => {
    try {
      const constTime = time.map(min => {
        // Remove "PM " from the time string ADD AM ALSO
        const twentyfourformat = min //convert mo dito re

        return {
          //eto ung sinesend sa api na ggwing 24 hr format
          avail: twentyfourformat,
          //eto ung pang display lang sa dropdown na mag ddisplay ng PM AT AM
          label: min
        };
      });

      // Check if constTime is not an empty array
      constTime.length === 0
        ? setConsultantTime('None')
        : setConsultantTime(constTime);
    } catch (error) {
      console.log(error);
    }
  };


  const showModeDate = () => {
    setShow(true);
    setMode('date');
  };

  const showModeTime = () => {
    setShow(true);
    setMode('time');
  };
  const renderData = async data => {
    console.log(JSON.stringify(data))
  };


  const handleAppointment = async data => {
    console.log(Data)
    setLoading(true);
    renderData(data)
    await callApi('post', '/appointment', data)
      .then(response => {
        navigation.navigate('Dashboard');
        Alert.alert(
          'Schedule Success!',
          'Please wait for your appointment schedule',
        );
        const conName = response.data.consultant.name;
        const profName = response.data.consultant.profession;

        AsyncStorage.setItem('profName', profName);
        AsyncStorage.setItem('conName', conName);

        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        if (error.response) {
          const errorMessage = error.response.data.error.date
            ? error.response.data.error.date
            : error.response.data.error.booking_time;
          console.error('HTTP Status Code:', error.response.status);
          console.error('Error Message:', errorMessage);
          Alert.alert('Something went wrong', errorMessage);
          if (errorMessage === undefined) {

            const errorDetails = Object.keys(error.response.data.error).map(key => {
              const value = error.response.data.error[key]

              return { key, modifiedValue: value}
            });
            Alert.alert(
              'Error',
              "You've already booked a session with this consultant today.",
            );
            console.log(errorDetails)
            /* Alert.alert('Something went wrong', 'Error Details: ' + JSON.stringify(error.response.data.error));
            console.log(JSON.stringify(error.response.data.error)); */
          }
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

              <Paper
                label={'Concern'}
                icon={'message'}
                value={concern}
                onChangeText={concern => {
                  setConcern(concern);
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
                  <Dropdown
                    style={[style.dropdown, {borderWidth: 1, color: 'black'}]}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    showsVerticalScrollIndicator={true}
                    data={consultData}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'Choose Consultant'}
                    value={selConst}
                    renderLeftIcon={() => (
                      <Fontisto
                        style={style.icon}
                        name="doctor"
                        size={25}
                        color="#48444E"
                      />
                    )}
                    onChange={item => {
                      setSelConst(item.id);
                      console.log(item.available_time, ' name ', item.name);
                      getConsultantTime(item.available_time);

                    }}
                  />
                </View>
              </View>

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
                  <Dropdown
                    style={[style.dropdown, {borderWidth: 1, color: 'black'}]}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    showsVerticalScrollIndicator={true}
                    data={consultantTime}
                    maxHeight={300}
                    labelField="label" // dito pinalitan ko ng label
                    valueField="avail" //eto lang ung sinsend sa api
                    placeholder={'Choose Available Time'}
                    value={selectedConsultantTime}
                    renderLeftIcon={() => (
                      <Fontisto
                        style={style.icon}
                        name="clock"
                        size={25}
                        color="#48444E"
                      />
                    )}
                    onChange={(item) => {
                      setSelectedConsultantTime(item.avail)
                    }}
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



              {show && (
                <RNDateTimePicker
                  themeVariant="dark"
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display="default"
                  timeZoneName={'Asia/Singapore'}
                  onChange={handleDatePicker}
                />
              )}

              <View className="flex items-center justify-center mt-5">
                <Btn
                  onPress={() => {
                    handleAppointment(Data)
                    renderData(Data)
                  }
                }
                  btnLabel="Confirm"
                  style={{zIndex: 0}}
                />
              </View>
            </View>
          </View>
                <BelowLabel
                  onPress={() => navigation.navigate('Helplines')}
                  text={'For urgent psychosocial support,'}
                  highlightText={'Helplines'}
                />
        </Background>
      )}
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#533483',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,

    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  icon: {
    paddingHorizontal: 7,
  },
  label: {
    position: 'absolute',
    borderWidth: 1,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: s(14),
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  placeholderStyle: {
    fontSize: s(14),
    fontFamily: 'Poppins Regular',
    color: 'black',
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: s(14),
    fontFamily: 'Poppins Regular',
    color: 'black',
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});
