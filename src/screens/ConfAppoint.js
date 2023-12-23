import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Background from './Background';
import BackButton from '../components/BackButton';
import {styles} from '../components/styles';
import Logo from '../components/Logo';
import Btn from '../components/Btn';
import theme from '../core/theme';
import {callApi} from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modals from '../components/Modals';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';
import Card from '../components/Card';
import CalendarPic from '../assets/Calendar-bro.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnCancel from '../components/BtnCancel';
import OptionsModal from '../components/Modals/OptionsModal';
import SuccessModal from '../components/Modals/SuccessModal';
import { useDispatch } from 'react-redux';
import { modalReducer } from '../reducers/setSuccessModal';


function ConfAppoint() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // declare useState
  const [resdate, setResDate] = useState('');
  const [restime, setRestTime] = useState('');
  const [appId, setAppId] = useState('');
  const [notif, setNotif] = useState(false);
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
    navigation.push('Dashboard');
    setLoading(false);
    setSuccessModal(true);
  };

  // useEffect for data retrieval
  useEffect(() => {
    AsyncStorage.getItem('date')
      .then(response => {
        setResDate(response);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    AsyncStorage.getItem('time')
      .then(response => {
        setRestTime(response);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    AsyncStorage.getItem('AppID')
      .then(response => {
        setAppId(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const cancelAppointment = async () => {
    setLoading(true);
    const response = await callApi('put', `appointment/cancel/${appId}`)
      .then(res => {
        const remove = AsyncStorage.removeItem('AppID');
        if (remove) {
          setLoading(false);
          setSuccessModal(true)
          setTimeout(() => {
            navigation.navigate('Dashboard'); 
          }, 1000);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View>
      <BackButton goBack={navigation.goBack} />

      {isLoading ? (
        <Loader />
      ) : (
        //wrapper
        <View className="flex items-center mt-24">
          <CalendarPic width={250} height={250} />
          <View className="items-center">
            <Card>
              <Text style={styles.textAppoint}>My Appointment Schedule</Text>
              <View className="flex items-center">
                <Text style={styles.textAppointBody}>Date: {resdate}</Text>
                <Text style={styles.textAppointBody}>Time: {restime}</Text>
              </View>

              <View className="items-center">
                <BtnCancel
                  bgColor={theme.rightColors.primary}
                  btnLabel="Cancel Appointment"
                  textColor="white"
                  onPress={() => showModal()}
                />
              </View>
              {/* <Modals
            visible={notif}
            ModalLabel="Success"
            src={require('../assets/checked.png')}
            Message="Cancel Success"
            Press={() => setNotif(false)}
          /> */}
            </Card>
          </View>
        </View>
      )}

      <SuccessModal
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
