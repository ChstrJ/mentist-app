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
import {darkGreen, green} from '../components/Constant';
import Center from '../components/styles';
import Btn from '../components/Btn';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import styles from '../components/styles';
import callApi from '../helper/callApi';
import {err} from 'react-native-svg/lib/typescript/xml';

const LogIn = () => {
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const Data = {
    username: username,
    password: password,
  };

  const logIn = async data => {
      const response = await callApi('post', '/login', data)
        .then(val =>val.status == 200 ? navigation.push('Dashboard'): navigation.push('LogIn'),
        )
        .catch(e => console.log(e.response.data));
   
  }

  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <View
          className="flex justify-center  w-screen"
          style={Center.CenterContainer}>
          <Image
            className="mt-20"
            source={require('../assets/logo.png')}
            style={{
              width: 250,
              height: 130,
            }}
          />
        </View>

        <View className="flex justify-center items-center mt-10">
          <Text className="text-black text-xl mt-10 mb-2">Login Account</Text>

          <TextInput
            className="w-[350] mt-5 rounded-lg"
            label="Username"
            mode="outlined"
            activeOutlineColor="green"
            left={<TextInput.Icon icon={'account'} />}
            onChangeText={values => setUsername(values)}
          />

          <TextInput
            className="w-[350] mt-2 rounded-md"
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

          <View className="flex items-center justify-center">
            <Text className="text-black mt-5">
              Don't have an account?
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={{
                    color: 'blue',
                    marginVertical: '20',
                  }}>
                  {' Signup here'}
                </Text>
              </TouchableOpacity>
            </Text>

            <View className="flex justify-center items-center">
              <TouchableOpacity
                // onPress={() => navigation.navigate('Dashboard')}
                onPress={() => logIn(Data)}
                style={[styles.submitBtn, {backgroundColor: '#6FF484'}]}>
                <Text style={styles.submitBtnTxt}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </ScrollView>
  );
};

export default LogIn;
