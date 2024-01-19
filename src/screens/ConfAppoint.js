import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Alert, StyleSheet} from 'react-native';
import BackButton from '../components/BackButton';
import {styles} from '../components/styles';
import theme from '../core/theme';
import {callApi} from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';
import Card from '../components/Card';
import CalendarPic from '../assets/Calendar-bro.svg';
import BtnCancel from '../components/BtnCancel';
import OptionsModal from '../components/Modals/OptionsModal';
import SuccessModal from '../components/Modals/SuccessModal';
import {useDispatch} from 'react-redux';
import Background from './Background';
import BackBack from '../components/BackBack';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { scale as s, verticalScale as vs, moderateScale as ms } from 'react-native-size-matters';

import Entypo from 'react-native-vector-icons/Entypo';

function ConfAppoint({navigation = useNavigation()}) {
  const dispatch = useDispatch();

  // declare useState
  const [resdate, setResDate] = useState('');
  const [restime, setRestTime] = useState('');
  const [conName, setConName] = useState('');
  const [prof, setProf] = useState('');
  const [moodHandled, setMoodHandled] = useState(false);
  const [appId, setAppId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const closeModal = () => {
    setShowOptionsModal(false);
  };

  const showModal = () => {
    setShowOptionsModal(true);
  };

  const handleSuccess = () => {
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 2000);

    console.log('remove success');
  };

  const confirmAppointmentDetails = async () => {
    const conName = await AsyncStorage.getItem('conName');
    const profName = await AsyncStorage.getItem('profName');
    const date = await AsyncStorage.getItem('date');
    const time = await AsyncStorage.getItem('time');
    const AppID = await AsyncStorage.getItem('AppID');

    setResDate(date);
    console.log(resdate)
    setRestTime(time);
    console.log(restime)
    setAppId(AppID);
    console.log(appId)
    setConName(conName);
    console.log(conName)
    setProf(profName);
    console.log(prof)
  };

  // useEffect for data retrieval
  useEffect(() => {
    confirmAppointmentDetails();
  }, []);

  console.log(appId);

  const cancelAppointment = async () => {
    setLoading(true);
    callApi('put', `appointment/cancel/${appId}`)
      .then(response => {
        console.log(response.data);
        const remove = AsyncStorage.removeItem('AppID');
        if (remove) {
          setSuccessModal(true);
          handleSuccess();
        } else {
          console.log('remove failed');
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error.response);
        setLoading(false);
      });
  };

  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : (
        //wrapper
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <Background>
            <BackBack onPress={() => navigation.navigate('Dashboard')} />
            <View className="flex items-center mt-24">
              <CalendarPic width={250} height={250} />
              <View className="items-center">
                <Card>
                  <Text style={styles.textAppoint}>
                    My Appointment Schedule
                  </Text>
                  <View className="flex-start mx-auto justify-center">



                    <View className=" flex-row items-center">
                      <Fontisto name="doctor" size={25} color="#48444E" />
                      <Text style={styles.consultantLabel}>
                        Name: 
                      </Text>
                      <Text style={styles.conName}>{conName}</Text>
                    </View>

                    <View className=" flex-row items-center">
                      <Entypo name="suitcase" size={25} color="#48444E" />
                      <Text style={styles.consultantLabel}>
                        Profession: 
                      </Text>
                      <Text style={styles.conName}>{prof}</Text>
                    </View>

                    <View className=" flex-row items-center">
                      <Fontisto name="calendar" size={25} color="#48444E" />
                      <Text style={styles.consultantLabel}>
                        Date:
                      </Text>
                      <Text style={styles.conName}>{resdate}</Text>
                    </View>

                    <View className=" flex-row items-center">
                      <Fontisto name="clock" size={25} color="#48444E" />
                      <Text style={styles.consultantLabel}>
                        Time: 
                      </Text>
                      <Text style={styles.conName}>{restime}</Text>
                    </View>
                  </View>

                  <View className="items-center">
                    <BtnCancel
                      bgColor={theme.rightColors.primary}
                      btnLabel="Cancel Appointment"
                      textColor="white"
                      onPress={() => showModal()}
                    />
                  </View>
                </Card>
              </View>
            </View>
          </Background>
        </ScrollView>
      )}

      <SuccessModal
        textHeader={'Success!'}
        textBody={'Appointment Cancelled'}
        visible={successModal}
        onClose={() => {
          setSuccessModal(false);
        }}
        btnLabel={'Close'}></SuccessModal>

      <OptionsModal
        visible={showOptionsModal}
        onCancel={() => {
          setShowOptionsModal(false);
          cancelAppointment();
        }}
        onConfirm={() => {
          setShowOptionsModal(false);
        }}
        textHeader={'Warning!'}
        textBody={'Are you sure you want to cancel your appointment?'}
        onConfirmLabel={'No'}
        onCancelLabel={'Yes'}></OptionsModal>
    </View>
  );
}

export default ConfAppoint;

const styles1 = StyleSheet.create({
  consultantLabel: {
    fontSize: s(18),
    marginLeft: 7,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 10,
    color: 'black',
  },
  conName: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
});
