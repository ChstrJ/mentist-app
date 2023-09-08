import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = 'https://mentist.onrender.com/api/v1/'

export const callApi = async (method, url, data) => {
    return axios({
        method, url, data
    }) 
}

export default callApi
