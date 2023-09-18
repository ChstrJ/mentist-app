import {View, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Background from './Background';
import { useNavigation } from '@react-navigation/native';
import Logout from '../components/Logout';
import styles from '../components/styles'
import Action from '../components/Action'
import { getData, removeData } from '../helper/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import { Text } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Dashboard = () => {
    const navigation = useNavigation()
    const [firstName, setFirstName] = useState('');
    const [date, setDate] = useState(new Date())


    const handleLogout = async () => {
        const removed = removeData()
        // console.log(token, first_name)
      removed ? navigation.navigate('Home'):console.log("Error logging out");
    }

   
    const getUser = async () => {
          const first_name = await AsyncStorage.getItem('first_name')
            setFirstName(first_name) 
      }
      useEffect(() => {
        getUser()
      }, []);
    
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
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
        <Background>
            <View className="mt-5" style={styles.CenterContainer}>
        <Logo/>
      <Text 
      className="mt-5"
      style={styles.fontTitle}> Good to see you here, {firstName}</Text>
      </View>
    
            <View className="mt-5" style={styles.CenterContainer}>
                <Action actionLabel="Ask Question" source={require('../assets/Dashboard/Ask.png')} Press={() => navigation.push("Chat")}/>
                <Action actionLabel="Create Appointment" source={require('../assets/Dashboard/Appointment.png')} Press={() => navigation.push('Appointment')}/>
                <Action actionLabel="Check My Progress" source={require('../assets/Dashboard/Progress.png')} Press={() => navigation.push('Progress')}/>
                <Logout actionLabel="Log Out" Press={() => handleLogout()}/>
            </View>
        </Background>
        </ScrollView>
    )
}
export default Dashboard;