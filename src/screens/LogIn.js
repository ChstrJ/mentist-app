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
import Logo from '../components/Logo';
import {storeData} from '../helper/auth';
import {loginSuccess, loginFailure} from '../actions/Action';
import LottieView from 'lottie-react-native';
import Btn from '../components/Btn';
import Loginpic from '../assets/Login-broo.svg';

const LogIn = ({}) => {
  const dispatch = useDispatch();

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

  const handleLogin = async data => {
    if (username != undefined && password != undefined) {
      setLoading(true);
      const response = callApi('post', '/login', {username, password})
        .then(response => {
          // store token in var
          const token = response.data.token;
          const first_name = response.data.user.first_name;
          const phone_no = response.data.user.phone_number;
          const id = JSON.stringify(response.data.user.id);
          const uname = response.data.user.username; 
          // store in async
          storeData(token, first_name, id, phone_no, uname);
          console.log(uname)
          const isSuccess = response.status === 200;
          isSuccess ? (navigation.push('Dashboard'), dispatch(loginSuccess(response.data))) : (navigation.push('LogIn'), dispatch(loginFailure(error.message)));
          console.log(token)
        })
        .catch(e => console.log(e));
    } else {
      Alert.alert('Invalid Credentials','Please try again later', setLoginAttempts(loginAttempts + 1),
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
          <View className=" flex items-center mt-10">
            <Loginpic width={300} height={300} />
          </View>

          {/* form */}
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
                marginTop: 20,
              }}>
              <Text style={styles.fontText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={[{color: 'green', marginLeft: 5}, styles.fontText]}>
                  Register here
                </Text>
              </TouchableOpacity>
            </View>
            
            <View className="flex justify-center items-center">
              <Btn
                onPress={() => handleLogin(Data)}
                disabled={isButtonDisabled}
                btnLabel={'Login'}
              />
            </View>
          </View>
        </Background>
      )}
    </ScrollView>
   
  );
};

export default LogIn;
