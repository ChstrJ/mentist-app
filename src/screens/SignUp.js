import {View, Image, ScrollView, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Text} from 'react-native-paper';
import styles from '../components/styles';
import BackButton from '../components/BackButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUp = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState()
  const [lastName, setlastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const Data = {
        username: 'asdasd',
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      };

  // const handleSubmit = async values => {
  //   const apiUrl = 'https://mentist.onrender.com/api/v1/register';

  //   // Data to be sent in the POST request
  //   const postData = {
  //     username: 'asdasd',
  //     first_name: val => firstName,
  //     second_name: val => secondName,
  //     email: val => email,
  //     password: val => password,
  //   };

  //   // Make a POST request using fetch
  //   fetch(apiUrl, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(postData),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // Handle the response data here
  //       console.log('API Response:', data);
  //     })
  //     .catch(error => {
  //       console.error('Fetch Error:', error.message);
  //     });
  // };

  const handleSubmit = async (data) => {
    if (password == confirmPassword)
      return await axios('post', '/register/', ...data)
      .then(val => console.log(val))
    else {
      Alert.alert("Password doesn't match")
    }
  }

  // for showing and hiding pass
  const [hidePass, setHidePass] = useState(true);

  // toggle hide pass
  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };

  //schema for validation
  // const SignupSchema = Yup.object().shape({
  //   firstName: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required('Please enter your first name.'),
  //   lastName: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required('Please enter your last name.'),
  //   email: Yup.string()
  //     .email('Invalid email')
  //     .required('Please enter your email.'),
  //   password: Yup.string()
  //     .min(8)
  //     .required('Invalid password')
  //     .matches(
  //       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  //       'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
  //     ),
  //   confirmPassword: Yup.string()
  //     .min(8)
  //     .required('Invalid password')
  //     .oneOf([Yup.ref('password')], 'Passwords must match'),
  // });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      {/* <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          isValid,
        }) => ( */}
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
              <Text className=" text-black text-xl mt-10">
                Create an account
              </Text>

              <TextInput
                className="w-[350] mt-5 rounded-lg"
                label="First Name"
                mode="outlined"
                activeOutlineColor="green"
                left={<TextInput.Icon icon={'account'} />}
                onChangeText={value => setFirstName(value)}
              />

              {/* {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )} */}

              <TextInput
                className="w-[350] mt-5 rounded-lg"
                label="Last Name"
                mode="outlined"
                activeOutlineColor="green"
                left={<TextInput.Icon icon={'account'} />}
                onChangeText={values => setlastName(values)}
              />
{/* 
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )} */}

              <TextInput
                className="w-[350] mt-5 rounded-lg"
                label="Email"
                mode="outlined"
                activeOutlineColor="green"
                left={<TextInput.Icon icon={'email'} />}
                onChangeText={values => setEmail(values)}
          
              />
              {/* {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )} */}

              <TextInput
                className="w-[350] mt-5 rounded-lg"
                label="Password"
                mode="outlined"
                activeOutlineColor="green"
                left={<TextInput.Icon icon={'key'} />}
                right={
                  <TextInput.Icon
                    icon={hidePass ? 'eye-off' : 'eye'}
                    onPress={togglePasswordVisibility}
                  />
                }
                onChangeText={value => setPassword(value)}
               
              />
              {/* {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )} */}

              <TextInput
                className="w-[350] mt-5 rounded-lg"
                label="Confirm Password"
                mode="outlined"
                activeOutlineColor="green"
                left={<TextInput.Icon icon={'key'} />}
                right={
                  <TextInput.Icon
                    icon={hidePass ? 'eye-off' : 'eye'}
                    onPress={togglePasswordVisibility}
                  />
                }
                onChangeText={value => setConfirmPassword(value)}
                
              />

              {/* {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )} */}

              <View className="flex justify-center items-center">
                <TouchableOpacity
                  onPress={() => handleSubmit(Data)}
                  // disabled={!isValid}
                  style={[
                    styles.submitBtn,
                    {backgroundColor: '#6FF484'}
                  ]}>
                  <Text style={styles.submitBtnTxt}>Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Background>
      {/* //   )}
      // </Formik> */}
    </ScrollView>
  );
};

export default SignUp;
