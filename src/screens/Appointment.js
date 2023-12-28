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
import { s } from 'react-native-size-matters';
import { Dropdown} from 'react-native-element-dropdown'


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
  ;
  const [day, setDay] = useState('');
  const [conName, setConName] = useState('');
  const [selConst, setSelConst] = useState(null);
  const [chosenDateText, setChosenDateText] = useState('');
  const [chosenTimeText, setChosenTimeText] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const [consultData, setConsultantData] = useState([])
  const [consult, setConsultant] = useState([])
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
    const getConsultant = async() => {
      const conf = await callApi('get', '/consultant')
        .then(response => {
            // console.log(JSON.stringify(response.data))
            const res = response.data.consultants
            console.log(res[1].schedule)
            // console.log(res)

            let count = Object.keys(res).length
            let constArr = []

            for (let i = 0; i < count; i++){
              constArr.push({
                id: res[i].id,
                name: res[i].name, 
                schedule: res[i].schedule
              })
              // console.log(constArr.id)
            }
            setConsultantData(constArr)
            console.log(consult)
            // console.log(consult, "wala") 
        })
        .catch(e => {
          console.log(e)
        })
      
    }


  // const handleConsult = selectedValue => {
  //   const selectedConsultant = consult.find(
  //     item => item.value === selectedValue,
  //   );
  //   if (selectedConsultant) {
  //     setSelConst(selectedConsultant.key);
  //   }
  // };

  const arr = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
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
                <View style={{width: s(310), flex: 1}}>
                  {/* <SelectList
                    placeholder="Choose Consultant"
                    data={consult}
                    save="value"
                    setSelected={val => {
                      setConName(val);
                      handleConsult(val);
                      console.log(val);
                    }}
                    style={{zIndex: 200, width: '100%', flex: 1,}} // Use width: '100%' to maintain the size
                    searchPlaceholder="Choose Consultant"
                    searchicon={false}
                  /> */}
                  <Dropdown
                    style={[style.dropdown, {borderWidth: 1} ]}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={consultData}
                    // search
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={!isFocus ? 'Choose Consultant' : 'Choosing...'}
                    searchPlaceholder="Search..."
                    value={consult}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      console.log(item.name, "gago")
                      setConsultant(item.name);
                      console.log(consult, "wala")
                      setIsFocus(false);
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
      alignContent: 'center'
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      margin: 10
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });