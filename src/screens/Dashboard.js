import {View, Image} from 'react-native';
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



const Dashboard = () => {
    const navigation = useNavigation()
    const [firstName, setFirstName] = useState('');


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
    
    return (
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
    )
}
export default Dashboard;