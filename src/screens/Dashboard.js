import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../components/styles';
import Action from '../components/Action';
import {getData, removeData} from '../helper/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Text, Appbar} from 'react-native-paper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {callApi} from '../helper/callApi';
import {s, verticalScale as vs} from 'react-native-size-matters';
import LogoutBtn from '../components/Logout';
import Call from '../components/Call';
import Loader from '../components/Loader';

const Dashboard = ({}) => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

  const [firstName, setFirstName] = useState('');
  const [showMood, setShowMood] = useState(false);
  const [moodHandled, setMoodHandled] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [date, setDate] = useState(new Date());
  const [uid, setUID] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getUser = async () => {
    const firstName = await AsyncStorage.getItem('first_name');
    setFirstName(firstName);
    const user_id = await AsyncStorage.getItem('id');
    setUID(user_id);
  };

  const handleLogout = async () => {
    const removed = removeData();
    removed ? navigation.navigate('Home') : console.log('Error logging out');
  };

  const handleMood = () => {
    setTimeout(() => {
      navigation.navigate('Mental');
    }, 1000);
  };

  const getAppointmentDetails = async () => {
    callApi('get', `/appointment/${uid}`, uid)
      .then(response => {
        const time = response.data.appointments[0].booking_time;
        const date = response.data.appointments[0].date;
        const appId = JSON.stringify(
          response.data.appointments[0].appointment_id,
        );

        AsyncStorage.setItem('uid', uid);
        AsyncStorage.setItem('time', time);
        AsyncStorage.setItem('date', date);
        AsyncStorage.setItem('AppID', appId);
        AsyncStorage.getItem('AppID');
        navigation.push('ConfAppoint');
        setLoading(false);
      })
      .catch(e => console.log(e));
  };
  const getAppoint = () => {
    setLoading(true);
    callApi('get', `/appointment/${uid}`, uid)
      .then(response => {
        const res = JSON.stringify(response.data.appointments);
        console.log(res);

        if (res == '[]') {
          setLoading(false);
          navigation.navigate('Appointment');
        } else {
          getAppointmentDetails();
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser();
    // handleMood();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <Background>
        {loading ? (
          <Loader />
        ) : (
          <View>
            <Appbar.Header>
              <Appbar.Content title="Home" />
              <Appbar.Action
                icon="logout"
                size={30}
                onPress={() => {
                  handleLogout();
                }}
              />
            </Appbar.Header>

            {/* <Call onPress={() => navigation.push('Helplines')} /> */}

            <View style={{marginTop: hp(2)}} className="flex items-center">
              <Logo />
              <Text className="mt-5" style={styles.fontHomeSub}>
                Good to see you here, {firstName}{'!'}
              </Text>
            </View>

            <View className="flex items-center" style={{marginTop: s(5)}}>
              <Action
                actionLabel="Chatbot AI"
                source={require('../assets/chatbot.png')}
                Press={() => navigation.navigate('Chatscreen')}
              />
              <Action
                actionLabel="Appointment"
                source={require('../assets/appointment.png')}
                Press={getAppoint}
              />
              <Action
                actionLabel="My Progress"
                source={require('../assets/development.png')}
                Press={() => navigation.push('Progress')}
              />
            </View>
          </View>
        )}

       
      </Background>
      <View className="justify-center items-center bg-white">
      <Text className=" text-gray-400">© 2023-2024 4B-G4</Text>
      </View>
    </ScrollView>
  );
};

const {height: screenHeight} = Dimensions.get('screen');
const {height: windowHeight} = Dimensions.get('window');
const navbarHeight = screenHeight - windowHeight;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dashboard;
