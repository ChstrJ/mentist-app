import AsyncStorage from '@react-native-async-storage/async-storage';
import { callApi } from './callApi';

// auth login
export const storeData = async (token, first_name, id, phone_no, user_name) => {
  AsyncStorage.setItem('token', token);
  AsyncStorage.setItem('first_name', first_name);
  AsyncStorage.setItem('id', id);
  AsyncStorage.setItem('phone_no', phone_no);
  AsyncStorage.setItem('UserName', user_name)
  }

  export const getData = async () => {
    await AsyncStorage.getItem('token');
    await AsyncStorage.getItem('first_name');
    await AsyncStorage.getItem('Date')
  }
export const removeData = async () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('first_name');
    AsyncStorage.removeItem('UserName')
    AsyncStorage.removeItem('uid')
    AsyncStorage.removeItem('date')
    AsyncStorage.removeItem('time')
    AsyncStorage.removeItem('AppID')
    return true; // Indicate successful removal
}

export const isValidName = (name) => {
  const pattern = /^[A-Za-z]+$/;
  return pattern.test(name);
};


export const isValidPhone = (phoneNumber) => {
  const pattern = /^09\d{2}\d{3}\d{4}$/;
  return pattern.test(phoneNumber) ? true : false
}

export const isValidEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email) ? true : false;
};

export const isValidPass = (password) => {
  const pattern = /^(?=.*\d).{8,}$/;
  return pattern.test(password) ? true : false;
};


export const isValidDate = (date) => {
  return date >= new Date()
}


export const setAppoint = async (id, uid, booking_time, date) => {
  await AsyncStorage.setItem('ID', id);
}