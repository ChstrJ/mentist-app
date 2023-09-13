import AsyncStorage from '@react-native-async-storage/async-storage';

// auth login
export const storeData = async (token) => {
    await AsyncStorage.setItem('token', token);
    // await AsyncStorage.setItem('username', username);

    
    return { token };
  }

export const getData = async () => {
  const token = await AsyncStorage.getItem('token', token);
    
    return { token };
  }
export const removeData = async () => {
    // AsyncStorage.removeItem('token', token)
    // AsyncStorage.removeItem('username', username)
    try {
      await AsyncStorage.removeItem('token', token)
      return true
    } catch(error){
      console.log("Error removing token", error)
      return false
    }
    // return { token, username };
}




