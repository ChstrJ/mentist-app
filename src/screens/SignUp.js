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

const SignUp = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(true);

  const Data = {
    username: username,
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  const handleSubmit = async data => {
    // loading
    setLoading(true);

    try {
      if (password === confirmPassword) {
        const response = await callApi('post', '/register', data);
        Alert.alert('Registration Successful');
        console.log(response.data);
        // setUsername('');
        // setFirstName('');
        // setlastName('');
        // setEmail('');
        // setPassword('');
        // setConfirmPassword('');
      } else {
        Alert.alert("Password doesn't match");
      }
    } catch (error) {
      // handle errors
      if (error.response) {
        Alert.alert('An error occurred', error.response);
      } else {
        Alert.alert('An error occurred', error.response);
      }
    } finally {
      setLoading(true);
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
      <Background>
        <BackButton goBack={navigation.goBack} />
        <View style={styles.CenterContainer}>
          <Image
            className="mt-20"
            source={require('../assets/logo.png')}
            style={{
              width: 250,
              height: 130,
            }}
          />
        </View>

        <View className="flex justify-center items-center">
          <Text className=" text-black text-xl mt-10">Create an account</Text>

          <TextInput
            className="w-[350] mt-5 rounded-lg"
            label="First Name"
            mode="outlined"
            activeOutlineColor="green"
            left={<TextInput.Icon icon={'account'} />}
            onChangeText={value => setFirstName(value)}
          />

          <TextInput
            className="w-[350] mt-5 rounded-lg"
            label="Last Name"
            mode="outlined"
            activeOutlineColor="green"
            left={<TextInput.Icon icon={'account'} />}
            onChangeText={values => setlastName(values)}
          />

          <TextInput
            className="w-[350] mt-5 rounded-lg"
            label="Username"
            mode="outlined"
            activeOutlineColor="green"
            left={<TextInput.Icon icon={'account'} />}
            onChangeText={values => setUsername(values)}
          />

          <TextInput
            className="w-[350] mt-5 rounded-lg"
            label="Email"
            mode="outlined"
            activeOutlineColor="green"
            left={<TextInput.Icon icon={'email'} />}
            onChangeText={values => setEmail(values)}
          />

          <TextInput
            className="w-[350] mt-5 rounded-lg"
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
            className="w-[350] mt-5 rounded-lg"
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
                      ? '#c1f0d0'
                      : '#6FF484',
                },
              ]}>
              <Text style={styles.submitBtnTxt}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </ScrollView>
  );
};

export default SignUp;
