import AsyncStorage from '@react-native-async-storage/async-storage';

// auth login
export const login = (username, password) => () => {
    return callApi('post', '/login', { username, password })
    .then((response) => {
        AsyncStorage.setItem('token', response.token)
        AsyncStorage.setItem('username', response.username)
    })
    
}

export const getData = (token, username) => {
    AsyncStorage.getItem('token', token)
    AsyncStorage.getItem('username', username)
}

export const removeData = (token, username) => {
    AsyncStorage.removeItem('token', token)
    AsyncStorage.removeItem('username', username)
}




