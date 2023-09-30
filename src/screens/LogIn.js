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
import React, {useState, useEffect} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import { styles } from '../components/styles';
import {callApi} from '../helper/callApi';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../components/Loader';
import Logo from '../components/Logo';
import {storeData} from '../helper/auth';
import LottieView from 'lottie-react-native';

const LogIn = ({}) => {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector(state => state.login.isLoggingIn);
  const error = useSelector(state => state.login.error);

  const [hidePass, setHidePass] = useState(true);
  const navigation = useNavigation();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isButtonDisabled, setButtonDisabled] = useState();
  const Data = {
    username: username,
    password: password,
  };
  const [isloading, setLoading] = useState();

  // const handleLogin = async (data) => {
  //   if (username == data.username && password == data.password) {
  //     setLoading(true);
  //     const response = callApi('post', '/login', { username, password})
  //       .then((response) => {
  //         // store token in var
  //         const token = response.data.token
  //         const first_name = response.data.user.first_name
  //         const id = JSON.stringify(response.data.user.id);
  //         // store token
  //         storeData(token, first_name, id)
  //         console.log(token, first_name, id)
  //         if (response.status === 200) {
  //           navigation.push('Dashboard');
  //         } else {
  //           navigation.push('LogIn');
  //         }

  //       })
  //       .catch((e) => console.log(e));
  //   } else {
  //     Alert.alert("Something went wrong");
  //   }
  // };

  const handleLogin = data => {
    setLoading(true);
    if (username != undefined || password != undefined) {
      const response = callApi('post', '/login', data)
        .then(response => {
          navigation.push('Dashboard');
          dispatch({type: 'LOGIN_SUCCESS', payload: response.data.user});
          const id = JSON.stringify(response.data.user.id);
          storeData(response.data.token, response.data.user.first_name, id);
          setLoginAttempts(loginAttempts);

          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch(error => {
          dispatch({type: 'LOGIN_FAILURE', payload: error.message});
          Alert.alert('Invalid Credentials', 'Please try again later', setLoginAttempts(loginAttempts + 1));
          setLoading(false);
        });
    } else {
      Alert.alert('Invalid Credentials', 'Please try again later', setLoginAttempts(loginAttempts + 1));
      setLoading(false);
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
        setLoginAttempts(0)
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

          <LottieView
            source={require('../assets/animations/login.json')}
            autoPlay
            loop
            style={styles.lottieSmall}
            speed={1}
          />

          <View className="flex justify-center items-center">
            <Text className="text-white" style={styles.fontTitle}>
              Login Account
            </Text>

            <TextInput
              style={[{width: wp(80)}, styles.fontField]}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Username"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
              onChangeText={values => setUsername(values)}
            />

            <TextInput
              className="flex w-4/5 mt-2 rounded-md"
              style={[{width: wp(80)}, styles.fontField]}
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
                marginTop: 30,
              }}>
              <Text style={styles.fontText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={[{color: 'blue', marginLeft: 5}, styles.fontText]}>
                  Signup here
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex justify-center items-center">
              <TouchableOpacity
                onPress={() => handleLogin(Data)}
                disabled={isButtonDisabled}
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor: isButtonDisabled ? 'rgba(255, 0, 0, 0.2)' : '#6FF484',
                  },
                ]}>
                <Text style={[styles.submitBtnTxt, styles.fontBtn]}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Background>
      )}
    </ScrollView>
  );
};

export default LogIn;
