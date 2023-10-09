import { View, Text, Button, Alert,TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import Background from './Background';
import BackButton from '../components/BackButton';
import { styles } from '../components/styles';
import Logo from '../components/Logo';
import Btn from '../components/Btn';
import { getData } from '../helper/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../core/theme';
import { callApi } from '../helper/callApi'
import Notif from '../components/Notif';
export default function ConfAppoint() {
    const navigation = useNavigation();
    //declare usestate
  
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [resdate, setResDate] = useState(new Date());
    const [restime, setresttime] = useState(new Date())
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [appId, setAppId] = useState()
    const [notif, setNotif] = useState(false)
    const Data = {
      name: this.name, 
      phone: this.phone,
    }
    //create onchange
    useEffect(() => {
        AsyncStorage.getItem('resDate')
        .then(val => {
            if (val){
                setResDate(val)
            }
        })
        AsyncStorage.getItem('resTime')
        .then(val => {
            if (val){
                setresttime(val)
            }
        })
        AsyncStorage.getItem('AppID')
        .then(val=> {
          setAppId(val)
        })
        
    }, []) 
    
    const cancelApp = (appId) => {
      // console.log(appId, "null nga ")
      // AsyncStorage.removeItem('Date')
      // navigation.navigate('Dashboard')
      // if (appId){
      //   await callApi('put', '/appointment/cancel', appId)
      // }
      // AsyncStorage.getItem
      // AsyncStorage.getItem('AppID')
      // .then(val => setAppId(val))
      // .catch(e => console.log(e))
      if (appId){
        callApi('put', `/appointment/cancel/${appId}` )
        .then(res => {
          AsyncStorage.removeItem('AppID')
          .then(val => console.log(val))
          .catch(e => console.log(e))
          // navigation.navigate('Dashboard')
          setNotif(true)
        })
        .catch(e => {
          if (e.response){
            console.log('HTTP Status Code:', e.response.status);
            console.log('Error Data:', e.response.data);
          }
          else if(e.request){
            console.log("HTTP STATUS Code: ", e.response.status)
            console.log('Error Data: ', e.response.data)
          }
          console.log(e + " eto error"), 
          console.log(appId)})
            
      }
    //   if (appId){
    //   await callApi('put', `/appointment/cancel${appId}`)
    //   .then(val => {
    //     AsyncStorage.removeItem('Date')
    //     setNotif(true)
    //     console.log("Appointment canceled", val)
    //   }).catch(e => {
    //     if (e.response){
    //       console.log("HTTP STATUS Code: ", e.response.status)
    //       console.log('Error Data: ', e.response.data)
    //       console.log(appId)
    //     }
    //     else if (e.request){
    //       console.log('No response received from the server');
    //     } else {
    //       // Something else happened while setting up the request
    //       console.log('Error:', error.message);
    //     }
      
    //   })
    // } else{
    //   console.log(appId + " null nga e")
    // }
    }
    const showMode = modeToShow => {
      setMode(modeToShow);
      setShow(true);
    };
    
    return (
      
        <Background>
          <BackButton goBack={navigation.goBack} />
          <View
            className="flex items-center justify-center mt-10"
            style={styles.CenterContainer}>
            <Logo />
            <Text style={styles.textAppoint}>
                Your Appointment is on: {resdate.toLocaleString()}
                {restime.toLocaleString()}
            </Text>
            <Btn 
              bgColor={theme.rightColors.primary} 
              btnLabel="Cancel Appointment" 
              textColor='white'
              onPress={() => {cancelApp(appId), navigation.navigate('Dashboard')}}
            />
              <Notif 
                visible={notif} 
                onRequestClose={() => setNotif(false)}
                header="Success!"
                body="Cancel Success!"
                press={() => setNotif(false)}
                label="OK"
              />
          </View>
          </Background>
      
    );
}