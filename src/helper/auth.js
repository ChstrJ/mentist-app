import AsyncStorage from '@react-native-async-storage/async-storage';

// auth login
export const storeData = (token, username) => {
    AsyncStorage.setItem('token', response.data.token)
    AsyncStorage.setItem('username', response.data.username)
}

export const getData = (token, username) => {
    AsyncStorage.getItem('token', response.data.token)
    AsyncStorage.getItem('username', response.data.username)
}

