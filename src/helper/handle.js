import AsyncStorage from "@react-native-async-storage/async-storage";
import { callApi } from "./callApi";
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation()

export const handleSuccessSignup = () => {
    setLoading(false);
    navigation.push('LogIn');

    setTimeout(() => {
      setSuccessModal(true);
    }, 1000);
  };

  export const handleDatePickerSignup = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (mode === 'date') {
      const formattedDate = currentDate.toLocaleDateString('en-PH');
      setBday(formattedDate);
    }
  };

  export const handleErrorSignup = () => {
    setLoading(false);
    Alert.alert('Something went wrong');
  };

  export const getAppointmentDetails = async () => {
    
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
    }).catch((e) => console.log(e));
  };


  export const confirmAppointmentDetails = () => {
    
  }


