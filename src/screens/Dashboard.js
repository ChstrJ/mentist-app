import {View, Image} from 'react-native';
import React from 'react';
import Background from './Background';
import { useNavigation } from '@react-navigation/native';

import styles from '../components/styles'
import Action from '../components/Action'

const Dashboard = () => {
    const navigation = useNavigation()
    return (
        <Background>
            
            <View className="flex justify-center items-center w-screen" style={styles.CenterContainer}>
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
                <Action actionLabel="Create Appointment" source={require('../assets/Dashboard/Appointment.png')} Press={() => {}} />
                <Action actionLabel="Check My Progress" source={require('../assets/Dashboard/Progress.png')} Press={() => {}}/>
            </View>
        </Background>
    )
}
export default Dashboard;