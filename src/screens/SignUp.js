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
import { styles } from '../components/styles';
import BackButton from '../components/BackButton';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {callApi} from '../helper/callApi';
import Loader from '../components/Loader';
import { signupSucess, signupFailure } from '../actions/Action';
import {storeData} from '../helper/auth';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Btn from '../components/Btn';
import Registerpic from '../assets/register.svg'


const SignUp = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();


  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState('');

  const Data = {
    username: username,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phone_no,
    password: password,
  };


  // const validationSchema = Yup.object().shape({
  //   username: Yup.string().required('Username is required'),
  //   password: Yup.string().required('Password is required'),
  //   email: Yup.string()
  //   .email('Invalid Email')
  //   .required('This field is required')
  // });

  

  const handleSubmit = data => {
  //   if (firstName.length <= 0){
  //      Alert.alert('Error', 'Invalid First Name!');
  //      return 
  //   }
  //   if (lastName.length <= 0){
  //     Alert.alert('Error', 'Invalid Last Name!');
  //     return 
  //  }
  //   if (username.length > 8 || username.length <= 0) {
  //     Alert.alert('Error', 'Invalid Username!');
  //     return;
  //   }
  //   if (email.length <= 0) {
  //     Alert.alert('Error', 'Invalid Email!');
  //     return;
  //   }
  //   if (password.length <= 0){
  //     Alert.alert('Error', 'Invalid Password!');
  //     return
  //   }
  //   if (confirmPassword.length <= 0 || confirmPassword != password){
  //     Alert.alert('Error', 'Invalid, Must be same with Password!');
  //     return
  //   }
    if (password === confirmPassword) {
    setLoading(true);
    const api = callApi('post', '/register', data)
      .then(response => {
        navigation.push('LogIn');
        dispatch(signupSucess(response.data))
        Alert.alert("Registration Successful");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch(error => {
        dispatch(signupSucess(error.message))
        Alert.alert("Error", error.message)
        setLoading(false)
      });
  } else {
    Alert.alert("Password doesn't match");
  }
  };

  // for showing and hiding pass
  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  // toggle hide pass
  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };

  const togglePasswordVisibility2 = () => {
    setHidePass2(!hidePass2);
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
            className="flex items-center justify-center mt-10">
            <Registerpic width={250} height={250}  />
          </View>

          <View className="flex justify-center items-center">
            <Text
              style={styles.fontTitle}
              className=" text-black text-xl mt-10">
              Create an account
            </Text>
        
            <TextInput
              style={[{width: wp(80)}, styles.fontField]}
              className="flex w-4/5 mt-5 rounded-xl"
              label="First Name"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
              onChangeText={value => setFirstName(value)}
            />

            <TextInput
              style={[{width: wp(80)}, styles.fontField]}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Last Name"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
              onChangeText={values => setlastName(values)}
            />

            <TextInput
              style={[{width: wp(80)}, styles.fontField]}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Username"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
              onChangeText={values => setUsername(values)}
            />
            {/* {errorMessage ? (<Text style={styles.errorTxt}>{errorMessage}</Text>) : null} */}

            <TextInput
              style={[{width: wp(80)}, styles.fontField]}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Email"
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'email'} />}
              onChangeText={values => setEmail(values)}
            />

            <TextInput
              style={[{width: wp(80)}, styles.fontField]}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Phone No."
              mode="outlined"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'phone'} />}
              onChangeText={values => setPhone_no(values)}
            />

            <TextInput
              style={[{width: wp(80)}, styles.fontField]}
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
              style={[{width: wp(80)}, styles.fontField]}
              className="flex w-4/5 mt-5 rounded-lg"
              label="Confirm Password"
              mode="outlined"
              activeOutlineColor="green"
              secureTextEntry={hidePass2}
              left={<TextInput.Icon icon={'key'} />}
              right={
                <TextInput.Icon
                  icon={hidePass2 ? 'eye-off' : 'eye'}
                  onPress={togglePasswordVisibility2}
                />
              }
              onChangeText={value => setConfirmPassword(value)}
            />
            {/* <Formik
              initialValues={{ firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: ''}}
              onSubmit={(val) =>{}}

            >
              {(props) => { 
                <View> 
                  <TextInput 
                    style={[{width: wp(80)}, styles.fontField]}
                    placeholder='First Name'
                    onChangeText={ props.handleChange('firstName')}
                    value={props.values.firstName}
                  />
                  <TextInput 
                    style={[{width: wp(80)}, styles.fontField]}
                    placeholder='Last Name'
                    onChangeText={ props.handleChange('lastName')}
                    value={props.values.lastName}
                  />
                  <TextInput 
                    style={[{width: wp(80)}, styles.fontField]}
                    placeholder='Username'
                    onChangeText={ props.handleChange('username')}
                    value={props.values.username}
                  />
                  <TextInput 
                    style={[{width: wp(80)}, styles.fontField]}
                    placeholder='First Name'
                    onChangeText={ props.handleChange('email')}
                    value={props.values.email}
                  />
                  <TextInput 
                    style={[{width: wp(80)}, styles.fontField]}
                    placeholder='First Name'
                    onChangeText={ props.handleChange('password')}
                    value={props.values.password}
                  />
                  <TextInput 
                    style={[{width: wp(80)}, styles.fontField]}
                    placeholder='First Name'
                    onChangeText={ props.handleChange('confirmPassword')}
                    value={props.values.confirmPassword}
                  />
                <Btn
                onPress={() => handleSubmit(Data)}
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor: '#6FF484',
                  },
                ]}
                btnLabel="Register"
              />
                </View>
              }}
            </Formik> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={styles.fontText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={[{color: 'green', marginLeft: 5}, styles.fontText]}>
                  Login here
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex justify-center items-center">
              <Btn
                onPress={() => handleSubmit(Data)}
                btnLabel="Register"
              />
            
              
            </View>
          </View>
        </Background>
      )}
    </ScrollView>
  );
};

export default SignUp;
