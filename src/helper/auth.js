import AsyncStorage from '@react-native-async-storage/async-storage';
import { callApi } from './callApi';

// auth login
export const storeData = async (token, first_name, id) => {
  AsyncStorage.setItem('token', token);
  AsyncStorage.setItem('first_name', first_name);
  AsyncStorage.setItem('id', id);
  }

  export const getData = async () => {
    await AsyncStorage.getItem('token');
    await AsyncStorage.getItem('first_name');
    await AsyncStorage.getItem('Date')
  }
export const removeData = async () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('first_name');
    AsyncStorage.removeItem('Date')
    return true; // Indicate successful removal
}

export const isValidPhone = (phoneNumber) => {
  const pattern = /^09\d{2}\d{3}\d{4}$/;
  return pattern.test(phoneNumber) ? true : false
}

export const isValidDate = (date) => {
  return date >= new Date()
}


export const setAppoint = async (id, uid, booking_time, date) => {
  await AsyncStorage.setItem('ID', id);
}