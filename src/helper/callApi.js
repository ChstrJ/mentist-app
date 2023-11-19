import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set up Axios defaults
axios.defaults.baseURL = 'https://mentist.onrender.com/api/v1/';



export const callApi = async (method, url, data) => {
  const api_key = '6grTiS84Dg2LWrnlap2Bs3DZr6tfWCzOqo1ZoML0iKep7kCHanc1ILmHuchIy9WR'
  const token = await AsyncStorage.getItem('token');
  
  const headers = {
    'Authorization': `Token ${token}`,
    'x-api-key': `${api_key}`,
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
