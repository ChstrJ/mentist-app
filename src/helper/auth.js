import AsyncStorage from '@react-native-async-storage/async-storage';

// auth login
export const storeData = async (token) => {
    await AsyncStorage.setItem('token', token);
    // await AsyncStorage.setItem('first_name', first_name);
    
  }

export const getData = async () => {
  const token = await AsyncStorage.getItem('token', token);
    
   
  }

export const removeData = async () => {
    AsyncStorage.removeItem('token');
    return true; // Indicate successful removal
}





