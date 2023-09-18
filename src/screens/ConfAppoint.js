import { View, Text, Button, Alert,TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import Background from './Background';
import BackButton from '../components/BackButton';
import styles from '../components/styles';
import Logo from '../components/Logo';
import Btn from '../components/Btn';
import { getData } from '../helper/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../core/theme';
export default function ConfAppoint() {
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
    useEffect(() => {
        AsyncStorage.getItem('Date')
        .then(val => {
            if (val){
                setDate(val)
            }
        })
    }) 
  
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
                Your Appointment is on: {date.toLocaleString()}
            </Text>
            <Btn bgColor={theme.rightColors.primary} btnLabel="Cancel Appointment" textColor='white'/>
          </View>
          </Background>
      
    );
}