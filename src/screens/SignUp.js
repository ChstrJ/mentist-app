import {View, Image, ScrollView, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Text} from 'react-native-paper';
import {styles} from '../components/styles';
import BackButton from '../components/BackButton';
import {callApi} from '../helper/callApi';
import Loader from '../components/Loader';
import {useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Btn from '../components/Btn';
import Registerpic from '../assets/register.svg';
import SuccessModal from '../components/Modals/SuccessModal';
import {Formik} from 'formik';
import Paper from '../components/Paper';
import {SignupSchema, initialValue} from '../components/Validation/Validation';

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
  const [successModal, setSuccessModal] = useState(false);

  const Data = {
    username: username,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phone_no,
    password: password,
  };

  const handleSuccess = () => {
    setLoading(false);
    navigation.push('LogIn');
    setTimeout(() => {
      setSuccessModal(true);
    }, 1000);
  };

  const closeModal = () => {
    setSuccessModal(false);
  };

  const handleError = () => {
    setLoading(false);
    navigation.push('SignUp');
    Alert.alert('Something went wrong');
  };

  const handleSubmit = () => {
    if (Data !== null) {
      setLoading(true);
      const api = callApi('post', '/register', Data)
        .then(response => {
          response.status === 200 ? handleSuccess() : handleError();
        })
        .catch(error => {
          handleError();
          console.log(error);
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
          <View className="flex items-center justify-center mt-10">
            <Registerpic width={170} height={170} />
          </View>

          <Formik
            initialValues={initialValue}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}>
            {({handleChange, errors, touched, setFieldTouched}) => (
              <View className="flex justify-center items-center">
                <Text
                  style={styles.fontTitle}
                  className=" text-black text-xl mt-5">
                  Create an account
                </Text>

                <View
                style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Paper
                    label={'First Name'}
                    icon={'account'}
                    value={firstName}
                    onChangeText={value => {
                      setFirstName(value);
                      handleChange('firstName')(value);
                    }}
                    errors={touched.firstName && errors.firstName}
                    touched={touched.firstName}
                    onBlur={() => setFieldTouched('firstName')}
                    style={{width: wp(40), marginHorizontal: 5}}
                  />

                  <Paper
                    label={'Last Name'}
                    icon={'account'}
                    value={lastName}
                    onChangeText={value => {
                      setlastName(value);
                      handleChange('lastName')(value);
                    }}
                    errors={touched.lastName && errors.lastName}
                    touched={touched.lastName}
                    onBlur={() => setFieldTouched('lastName')}
                    style={{width: wp(40), marginHorizontal: 5}}
                  />
                </View>

                <Paper
                  label={'Username'}
                  icon={'account-box'}
                  value={username}
                  onChangeText={value => {
                    setUsername(value);
                    handleChange('username')(value);
                  }}
                  errors={touched.username && errors.username}
                  touched={touched.username}
                  onBlur={() => setFieldTouched('username')}
                />

                <Paper
                  label={'Email'}
                  icon={'email'}
                  value={email}
                  onChangeText={value => {
                    setEmail(value);
                    handleChange('email')(value);
                  }}
                  errors={touched.email && errors.email}
                  touched={touched.email}
                  onBlur={() => setFieldTouched('email')}
                />

                <Paper
                  label={'Phone Number'}
                  icon={'phone'}
                  keyboardType={'numeric'}
                  maxLength={11}
                  value={phone_no}
                  onChangeText={value => {
                    setPhone_no(value);
                    handleChange('phone_number')(value);
                  }}
                  errors={touched.phone_number && errors.phone_number}
                  touched={touched.phone_number}
                  onBlur={() => setFieldTouched('phone_number')}
                />

                <Paper
                  label={'Password'}
                  icon={'key'}
                  value={password}
                  onChangeText={value => {
                    setPassword(value);
                    handleChange('password')(value);
                  }}
                  errors={touched.password && errors.password}
                  touched={touched.password}
                  onBlur={() => setFieldTouched('password')}
                  secureTextEntry={hidePass}
                  right={
                    <TextInput.Icon
                      icon={hidePass ? 'eye-off' : 'eye'}
                      onPress={togglePasswordVisibility}
                    />
                  }
                />

                <Paper
                  label={'Confirm Password'}
                  icon={'key'}
                  secureTextEntry={hidePass2}
                  errors={touched.confirmPassword && errors.confirmPassword}
                  touched={touched.confirmPassword}
                  onChangeText={value => {
                    handleChange('confirmPassword')(value);
                  }}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  right={
                    <TextInput.Icon
                      icon={hidePass2 ? 'eye-off' : 'eye'}
                      onPress={togglePasswordVisibility2}
                    />
                  }
                />

                

                <SuccessModal
                  textHeader={'Welcome!'}
                  textBody={'Registration Success'}
                  visible={successModal}
                  onClose={closeModal}
                  btnLabel={'Close'}></SuccessModal>

                <View className="mt-5 flex justify-center items-center">
                  <Btn onPress={() => handleSubmit()} btnLabel="Register" />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                    marginBottom: 5
                  }}>
                  <Text style={styles.fontText}>Already have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.push('LogIn')}>
                    <Text
                      style={[
                        {color: 'green', marginLeft: 5},
                        styles.fontText,
                      ]}>
                      Login here
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
            )}
            
          </Formik>
        </Background>
      )}
    </ScrollView>
  );
};

export default SignUp;
