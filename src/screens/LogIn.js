import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {styles} from '../components/styles';
import {callApi} from '../helper/callApi';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../components/Loader';
import {storeData} from '../helper/auth';
import Btn from '../components/Btn';
import Loginpic from '../assets/Login-broo.svg';

import {loginUser} from '../actions/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Paper from '../components/Paper';

const LogIn = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [hidePass, setHidePass] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isButtonDisabled, setButtonDisabled] = useState();
  const [isloading, setLoading] = useState();

  const Data = {
    username: username,
    password: password,
  };

  const handleSuccess = () => {
    navigation.push('Dashboard');
    setLoading(false);
  };

  const handleError = () => {
    navigation.push('LogIn');
    Alert.alert('Something went wrong');
  };

  const handleLogin = async () => {
    if (username != undefined && password != undefined) {
      setLoading(true);
      dispatch(
        loginUser(
          username,
          password,
          navigation.navigate,
          setLoading,
          loginAttempts,
          setLoginAttempts,
        ),
      );
    } else {
      Alert.alert(
        'Invalid Credentials',
        'Please try again later',
        setLoginAttempts(loginAttempts + 1),
      );
    }
  };

  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };

  useEffect(() => {
    if (loginAttempts >= 3) {
      setButtonDisabled(true);
      Alert.alert('Exceeded Login Attempts', 'Try again 15s');
      const timeout = setTimeout(() => {
        setLoginAttempts(0);
        setButtonDisabled(false);
      }, 15000); // 15 secs
      // reset it to 0
      return () => clearTimeout(timeout);
    }
  }, [loginAttempts]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      {isloading ? (
        <Loader />
      ) : (
        <Background>
          <BackButton goBack={navigation.goBack} />
          <View className=" flex items-center mt-5">
            <Loginpic width={300} height={300} />
          </View>

          {/* form */}
          <View className="flex justify-center items-center">
            <Text className="text-white" style={styles.fontTitle}>
              Login Account
            </Text>

            <Paper
              label={'Username'}
              icon={'account'}
              value={username}
              onChangeText={values => setUsername(values)}
            />

            <Paper
              label={'Password'}
              icon={'key'}
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry={hidePass}
              right={
                <TextInput.Icon
                  icon={hidePass ? 'eye-off' : 'eye'}
                  onPress={togglePasswordVisibility}
                />
              }
            />


            <View className="mt-4 flex justify-center items-center">
              <Btn
                onPress={() => handleLogin(Data)}
                disabled={isButtonDisabled}
                btnLabel={'Login'}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <Text style={styles.fontText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('SignUp')}>
              <Text style={[{color: 'green', marginLeft: 5}, styles.fontText]}>
                Register here
              </Text>
            </TouchableOpacity>
          </View>
        </Background>
      )}
    </ScrollView>
  );
};

export default LogIn;
