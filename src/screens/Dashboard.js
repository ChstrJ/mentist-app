import {View, Image} from 'react-native';
import React from 'react';
import Background from './Background';
import { useNavigation } from '@react-navigation/native';
import Logout from '../components/Logout';
import styles from '../components/styles'
import Action from '../components/Action'
import { getData, removeData } from '../helper/auth';



const Dashboard = () => {
    const navigation = useNavigation()

    const handleLogout = async () => {
        const token = await getToken()
        
        if (token){
            const success = await removeData()
            if (success){
                navigation.navigate('Home')
            } else{
                console.log("error")
            }
        }

    }
    const getToken = async () => {
        try{
            const data = await getData()
            return data.token
        }
        catch(e){
            console.log('error getting token ', e)
        }
    }
    return (
        <Background>
            
            <View className="flex justify-center items-center w-screen">
                <Image
                className="mt-20"
                source={require('../assets/logo.png')}
                style={{
                    width: 250,
                    height: 130,
                }}
                />
            </View>
            <View className="mt-10" style={styles.CenterContainer}>
                <Action actionLabel="Ask Question" source={require('../assets/Dashboard/Ask.png')} Press={() => navigation.navigate("MessageScreen")}/>
                <Action actionLabel="Create Appointment" source={require('../assets/Dashboard/Appointment.png')} Press={() => navigation.navigate('Appointment')}/>
                <Action actionLabel="Check My Progress" source={require('../assets/Dashboard/Progress.png')} Press={() => navigation.navigate('Progress')}/>
                <Logout actionLabel="Log Out" Press={() => handleLogout()}/>
            </View>
        </Background>
    )
}
export default Dashboard;