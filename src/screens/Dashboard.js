import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Background from './Background';
import {darkGreen, green} from '../components/Constant';
import Btn from '../components/Btn';
import { useNavigation } from '@react-navigation/native';
import Logo from '../components/Logo';

const Dashboard = () => {
    const navigation = useNavigation()
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
        
        </Background>
    )
}
export default Dashboard;