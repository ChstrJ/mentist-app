import { View, Text, Button, Alert,TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import Background from './Background';
import BackButton from '../components/BackButton';
import { styles } from '../components/styles';
import Logo from '../components/Logo';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../core/theme';
import { callApi } from '../helper/callApi'
import Notif from '../components/Notif';
import { getData } from '../helper/auth';


function ConfAppoint() {
    const navigation = useNavigation();
    //declare usestate
  
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [resdate, setResDate] = useState('')
    // const [resdate, setResDate] = useState(new Date());
    const [restime, setresttime] = useState('')
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [appId, setAppId] = useState()
    const [notif, setNotif] = useState(false)
    const [consultant, setConsultant] = useState('');
    const [error, setError] = useState('');
    const [uid, setUID] = useState('')

    const Data = {
      name: this.name, 
      phone: this.phone,
    }
    //create onchange
    useEffect(() => {
        // getData()
        // for date gathering
        AsyncStorage.getItem('date')
        .then(response => {
          setResDate(response)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
        // for time gathering
        AsyncStorage.getItem('time')
        .then(response => {
          setresttime(response)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
        // for appointment id
        AsyncStorage.getItem('AppID')
        .then(response => {
          setAppId(response)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }, []) 
    
    const cancelApp = (appId) => {
      callApi('put', `/appointment/cancel/${appId}`, appId)
      .then(reponse => {
        AsyncStorage.removeItem('AppID')
        navigation.navigate('Dashboard')
      })
      .catch(e => {
        if (e.response){
          console.log('HTTP Status Code:', e.response.status);
          console.log('Error Data:', e.response.data);
        }
        else if (e.request){
          console.log("HTTP STATUS Code: ", e.response.status)
          console.log('Error Data: ', e.response.data)
          Alert.alert('Error', e.response.data)
        }
        else{
          console.log(e, "Eto yun baket? ")
        }
      })
    // const showMode = modeToShow => {
    //   setMode(modeToShow);
    //   setShow(true);
    // };
  }
    return (
        <Background>
          <BackButton goBack={navigation.goBack} />
          <View
            className="flex items-center justify-center mt-10"
            style={styles.CenterContainer}>
            <Logo />
            <Text style={styles.textAppoint}>
                Your Appointment is on: {resdate + " "}
                <Text>
                {restime}
                </Text>
            </Text>
            <Btn 
              bgColor={theme.rightColors.primary} 
              btnLabel="Cancel Appointment" 
              textColor='white'
              onPress={() => cancelApp(appId)}
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
export default ConfAppoint;
