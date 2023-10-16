import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set up Axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.baseURL = 'https://mentist.onrender.com/api/v1/';



export const callApi = async (method, url, data) => {
  const token = await AsyncStorage.getItem('token');
  
  const headers = {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  return axios({
    method,
    url,
    data,
    headers,
  });
};
