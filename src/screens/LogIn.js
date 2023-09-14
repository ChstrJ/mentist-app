import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import React, {useState} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import styles from '../components/styles';
import callApi from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from "react-redux"
import Loader from '../components/Loader';
import Logo from '../components/Logo';
import { getData, storeData } from '../helper/auth';

const LogIn = ({}) => {
  
  const [hidePass, setHidePass] = useState(true);
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const Data = {
    username: username,
    password: password,
  };
  const [isloading, setLoading] = useState();



  const handleLogin = async (data) => {
    if (username == data.username && password == data.password) {
      setLoading(false);
      const response = callApi('post', '/login', { username, password})
      
        .then(async (response) => {
          // store token in var
          const token = response.data.token
          // const first_name = response.data.first_name
          // store token
          storeData(token)
          console.log(token)
          if (response.status === 200) {
            navigation.push('Dashboard');
          } else {
            navigation.push('LogIn');
          }

        })
        .catch((e) => console.log(e));
    } else {
      Alert.alert("Something went wrong");
    }
  };


  
  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      {isloading ? (
        <Loader />
      ) : (
        <Background>
          <BackButton goBack={navigation.goBack} />
          <View className="flex justify-center mt-10" style={styles.CenterContainer}>
            <Logo/>
         </View>

          <View className="flex justify-center items-center mt-10">
            <Text className="text-white" style={styles.fontTitle}>
              Login Account
            </Text>

            <TextInput
              style={styles.fontField}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Username"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
              onChangeText={values => setUsername(values)}
            />

            <TextInput
              className="flex w-4/5 mt-2 rounded-md"
              style={styles.fontField}
              mode="outlined"
              label="Password"
              activeOutlineColor="green"
              secureTextEntry={hidePass}
              left={<TextInput.Icon icon={'key'} />}
              right={
                <TextInput.Icon
                  icon={hidePass ? 'eye-off' : 'eye'}
                  onPress={togglePasswordVisibility}
                />
              }
              onChangeText={value => setPassword(value)}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>

              <Text style={[{color: 'white'}, styles.fontText]}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={[{ color: 'blue', marginLeft: 5 }, styles.fontText]}>Signup here</Text>

              </TouchableOpacity>
            </View>

            

            <View className="flex justify-center items-center">
              <TouchableOpacity
                onPress={() => handleLogin(Data)}
                disabled={
                  !username || !password
                 
                }
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor:
                      !username || !password ? 'rgba(0, 0, 0, 0.2)' : '#6FF484', }
                ]}>
                <Text style={[styles.submitBtnTxt, styles.fontTitle]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Background>
      )}
    </ScrollView>
  );
};

export default LogIn;
