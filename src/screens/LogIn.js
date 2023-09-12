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
import Loader from '../components/Loader';
import Logo from '../components/Logo';

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
  const [isloading, setLoading] = useState();

  const logIn = async data => {
    setLoading(true);
    if (username == null || password == null) {
      const response = await callApi('post', '/login', data)
        .then(val =>
          val.status == 200
            ? navigation.push('Dashboard')
            : navigation.push('LogIn'),
        )
        .catch(e => console.log(e.response.data));

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      Alert.alert('Invalid Credentials');
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
              className="w-[350] mt-5 rounded-lg"
              label="Username"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
              onChangeText={values => setUsername(values)}
            />

            <TextInput
              className="w-[350] mt-2 rounded-md"
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
                onPress={() => logIn(Data)}
                style={[styles.submitBtn, {backgroundColor: '#6FF484'}]}>
                <Text style={[styles.submitBtnTxt, styles.fontTitle]}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Background>
      )}
    </ScrollView>
  );
};

export default LogIn;
