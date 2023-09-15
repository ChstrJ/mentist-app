import AsyncStorage from '@react-native-async-storage/async-storage';

// auth login
export const storeData = async (token, first_name, id) => {
  AsyncStorage.setItem('token', token);
  AsyncStorage.setItem('first_name', first_name);
  AsyncStorage.setItem('id', id);
    
  }

  export const getData = async () => {
    await AsyncStorage.getItem('token');
    await AsyncStorage.getItem('first_name');
    
  }
export const removeData = async () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('first_name');
    return true; // Indicate successful removal
}





