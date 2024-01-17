import {callApi} from '../helper/callApi';
import {getData, storeData} from '../helper/auth';
import {Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';



export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';



export const loginUser = (username, password, navigate, setLoading, loginAttempts, setLoginAttempts) => async dispatch => {
    try {
      const response = await callApi('post', '/login', { username, password }); 
      const token = response.data.token;
      const first_name = response.data.user.first_name;
      const phone_no = response.data.user.phone_number;
      const id = JSON.stringify(response.data.user.id);
      const uname = response.data.user.username;

      
  
      // Store in async storage
      storeData(token, first_name, id, phone_no, uname);
      getData()
      dispatch({ type: 'LOGIN_SUCCESS', payload: { username, password } });
      navigate('Dashboard');
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status !== 200) {
        Alert.alert('Invalid Credentials', 'Please try again later');
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        setLoginAttempts(loginAttempts + 1)
      }
    }
  };