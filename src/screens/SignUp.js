import {
  View,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Text} from 'react-native-paper';
import styles from '../components/styles';
import BackButton from '../components/BackButton';
import callApi from '../helper/callApi';
import Loader from '../components/Loader';
import Logo from '../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from '../helper/auth';

const SignUp = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setLoading] = useState();

  const Data = {
    username: username,
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  //signup button
  // const handleSubmit = async data => {
  //   if (password === confirmPassword) {
  //     setLoading(true);
  //     const response = await callApi('post', '/register', data);
      // .then(val => val.status == 200 ? navigation.push('LogIn') : navigation.push('SignUp'),
      // )
      
  //     if (val => val.status == 200) {
  //       navigation.push('LogIn');
  //       console.log(response.data)
  //     } else {
  //       navigation.push('SignUp')
  //       Alert.alert(console.log(response.data))
  //     }
      
  //       // set loading to false when authenticated
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 500);
    
  //   } else {
  //     Alert.alert("Something went wrong");
  //   }
  // };


  const handleSubmit = async data => {
    if (password === confirmPassword) {
      setLoading(false);
      const response = await callApi('post', '/register', data)
        .then(val => val.status == 200 ? navigation.push('LogIn') : navigation.push('SignUp'),)
        .catch(e => console.log(e.response.data))
          setTimeout(() => {
            setLoading(false);
          }, 500);
       
    } else {
      Alert.alert("Password doesn't match");
    }
  };
  // for showing and hiding pass
  const [hidePass, setHidePass] = useState(true);

  // toggle hide pass
  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <Background>
          <BackButton goBack={navigation.goBack} />
          <View
            className="flex justify-center mt-10"
            style={styles.CenterContainer}>
            <Logo />
          </View>

          <View className="flex justify-center items-center">
            <Text
              style={styles.fontTitle}
              className=" text-black text-xl mt-10">
              Create an account
            </Text>

         
            <TextInput
              style={styles.fontField}
              className="flex w-4/5 mt-5 rounded-xl"
              label="First Name"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
              onChangeText={value => setFirstName(value)}
            />
            {errorMessage && <Text>{errorMessage}</Text>}

            <TextInput
              style={styles.fontField}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Last Name"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
              onChangeText={values => setlastName(values)}
            />

            <TextInput
              style={styles.fontField}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Username"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
              onChangeText={values => setUsername(values)}

            />
              {errorMessage ? (<Text style={styles.errorTxt}>{errorMessage}</Text>) : null}


            <TextInput
              style={styles.fontField}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Email"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'email'} />}
              onChangeText={values => setEmail(values)}
            />

            <TextInput
              style={styles.fontField}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Password"
              mode="outlined"
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

            <TextInput
              style={styles.fontField}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Confirm Password"
              mode="outlined"
              activeOutlineColor="green"
              secureTextEntry={hidePass}
              left={<TextInput.Icon icon={'key'} />}
              right={
                <TextInput.Icon
                  icon={hidePass ? 'eye-off' : 'eye'}
                  onPress={togglePasswordVisibility}
                />
              }
              onChangeText={value => setConfirmPassword(value)}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text style={[{color: 'white'}, styles.fontText]}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={[{color: 'blue', marginLeft: 5}, styles.fontText]}>
                  Login here
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex justify-center items-center">
              <TouchableOpacity
                onPress={() => handleSubmit(Data)}
                disabled={
                  !username ||
                  !firstName ||
                  !lastName ||
                  !email ||
                  !password ||
                  !confirmPassword
                }
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor:
                      !username ||
                      !firstName ||
                      !lastName ||
                      !email ||
                      !password ||
                      !confirmPassword
                        ? 'rgba(0, 0, 0, 0.2)'
                        : '#6FF484',
                  },
                ]}>
                <Text style={[styles.submitBtnTxt, styles.fontTitle]}>
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Background>
      )}
    </ScrollView>
  );
};

export default SignUp;
