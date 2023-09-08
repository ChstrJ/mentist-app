import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios';


//Axios Header
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
// Axios URL
axios.defaults.baseURL = 'https://mentist.onrender.com/api/v1/'

//Axios Token Interceptor
// axios.interceptors.request.use(
//     async config => {
//         const token = await AsyncStorage.getItem('token')
//         if (token) {
//             config.headers.Authorization = "Bearer " + token
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

//Axios function API
export const callApi = async (method, url, data) => {
    return axios({
        method, url, data
    }) 
}

export default callApi
