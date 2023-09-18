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
    dispatch({type: 'LOGIN_REQUEST'});
    setLoading(true);

    callApi('post', '/login', data)
      .then(response => {
        dispatch({type: 'LOGIN_SUCCESS', payload: response.data.user});
        const id = JSON.stringify(response.data.user.id);
        storeData(response.data.token, response.data.user.first_name, id);
        navigation.push('Dashboard');
      })
      .catch(error => {
        dispatch({type: 'LOGIN_FAILURE', payload: error.message});
        Alert.alert('Invalid Credentials');
      });
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor: '#6FF484',
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
