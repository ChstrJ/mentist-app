import AsyncStorage from '@react-native-async-storage/async-storage';

// auth login
export const storeData = (token, username) => {
    AsyncStorage.setItem('token', token)
    AsyncStorage.setItem('username', username)
}

export const getData = (token, username) => {
    AsyncStorage.getItem('token', token)
    AsyncStorage.getItem('username', username)
}

