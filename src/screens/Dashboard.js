import {View, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Background from './Background';
import { useNavigation } from '@react-navigation/native';
import Logout from '../components/Logout';
import { styles } from '../components/styles'
import Action from '../components/Action'
import { getData, removeData } from '../helper/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import { Text } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BtnOutline from '../components/BtnOutline';


const Dashboard = () => {
    const navigation = useNavigation()
    const [firstName, setFirstName] = useState('');
    const [date, setDate] = useState(new Date())
    const [appId, setAppId] = useState('')
    
    const handleLogout = async () => {
        const removed = removeData()
        // console.log(token, first_name)
      removed ? navigation.navigate('Home'):console.log("Error logging out");
    }

   
    const getUser = async () => {
          const first_name = await AsyncStorage.getItem('first_name')
            setFirstName(first_name) 
      }
    
        getUser()
    
    
    const getAppoint = () => {
      try {
        AsyncStorage.getItem('Date')
        .then(value => {
          if (value != null){
            setDate(value)
            navigation.push('ConfAppoint')
          }
          else{
            navigation.push('Appointment')
          }
        })
      } catch (error) {
        
      }
    }

    return (
     
        <Background>
            <View className="flex items-center">
       
          <Logo/>
      <Text 
      className="mt-5"
      style={styles.fontHomeSub}> Good to see you here, {firstName}</Text>
        
      </View>
            <View className="flex items-center" style={{height: hp(80)}}>
                <Action actionLabel="Chatbot AI" source={require('../assets/chatbot.png')} Press={() => navigation.push("Chatscreen")}/>
                <Action actionLabel="Create Appointment" source={require('../assets/appointment.png')} Press={() =>{date == null ? navigation.push('Appointment') : navigation.push('ConfAppoint')}}/>
                <Action actionLabel="My Progress" source={require('../assets/development.png')} Press={() => navigation.push('Progress')}/>
                <BtnOutline
                  btnLabel='Logout'
                  onPress={() => handleLogout()}
                />
            </View>
        </Background>
       
    )
}
export default Dashboard;