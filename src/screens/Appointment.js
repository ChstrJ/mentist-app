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

export default function Appointment() {
  const navigation = useNavigation();
  //declare usestate

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [notif, setNotif] = useState(false);
  const [day, setDay] = useState('');

  const [selConst, setSelConst] = useState(null);
  const [chosenDateText, setChosenDateText] = useState('');
  const [chosenTimeText, setChosenTimeText] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const [consultData, setConsultantData] = useState([]);
  const [consult, setConsultant] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [schedule, setSchedule] = useState([]);

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

  // const getConsultant = async () => {
  //   const reponse = await callApi('get', '/consultant')
  //     .then(response => {
  //       const res = response.data.consultants;
  //       const listCont = res.map(item => {
  //         return {key: item.id, value: `${item.name}`};
  //       });
  //       setConsultant(listCont);
  //       console.log(consult + 'const and listCont ' + listCont);
  //     })
  //     .catch(e => console.log(e));
  // };
  const getConsultant = async () => {
    const conf = await callApi('get', '/consultant')
      .then(response => {
        const res = response.data.consultants;
        // getting all the count response
        let count = Object.keys(res).length;
        // creating empty array for object response
        let constArr = [];

        for (let i = 0; i < count; i++) {
          // pushing through the empty array
          constArr.push({
            id: res[i].id, // id object
            name: res[i].name, // creating name object
          });
        }
        setConsultantData(constArr); // setting data for consultant
      })
      .catch(e => {
        console.log(e);
      });
  };
  const handleSchedule = async () => {
    const conf = await callApi('get', '/consultant')
      .then(response => {
        const res = response.data.consultants;

        let count = Object.keys(res).length;
        let schedArr = [];

        for (let i = 0; i < count; i++) {
          schedArr.push({
            schedule: res[i].schedule,
          });
        }
        setScheduleData(schedArr);
        console.log(schedArr);
      })
      .catch(e => console.log(e));
  };

  // const handleConsult = selectedValue => {
  //   const selectedConsultant = consult.find(
  //     item => item.value === selectedValue,
  //   );
  //   if (selectedConsultant) {
  //     setSelConst(selectedConsultant.key);
  //   }
  // };

  const arr = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
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
    setLoading(true);
    await callApi('post', '/appointment', Data)
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
            Alert.alert('Something went wrong', 'Please select a consultant');
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
                    searchPlaceholder="Search..."
                    value={consult.name}
                    renderLeftIcon={() => (
                      <Fontisto
                        style={style.icon}
                        name="doctor"
                        size={25}
                        color="#48444E"
                      />
                    )}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setSelConst(item.id);
                      console.log(item.id);
                      setConsultant(item.name);
                      setIsFocus(false);
                    }}
                  />

                  {/* <Dropdown
                    style={[style.dropdown, {borderWidth: 1} ]}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={consultData}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'Choose Schedule'}
                    searchPlaceholder="Search..."
                    value={schedule}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setConsultant(item.name);
                      setIsFocus(false);
                    }}
                /> */}
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
                    left={<TextInput.Icon icon={'clock'} />}
                    editable={false}
                    activeOutlineColor="green"
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
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Poppins Regular',
    color: 'black',
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
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
