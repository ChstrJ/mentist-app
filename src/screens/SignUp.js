import {View, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Text} from 'react-native-paper';
import {styles} from '../components/styles';
import BackButton from '../components/BackButton';
import {s} from 'react-native-size-matters';
import {callApi} from '../helper/callApi';
import RNDateTimePicker from '@react-native-community/datetimepicker';
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
import { handleSuccessSignup } from '../helper/handle';

const SignUp = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date())
  const [bday, setBday] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('male');
  const [history, setHistory] = useState('false');

  const Data = {
    username: username,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phone_no,
    password: password,
    birthdate: date.toISOString().split('T')[0],
    gender: gender,
    history: history,
  };


  const minDate = new Date(1980, 0, 1)

  

  const closeModal = () => {
    setSuccessModal(false);
  };

  const showModeDate = () => {
    setShow(true);
    setMode('date');
  };

    const handleDatePickerSignup = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (mode === 'date') {
      const formattedDate = currentDate.toLocaleDateString('en-PH');
      setBday(formattedDate);
    }
  };

  const handleErrorSignup = () => {
    setLoading(false);
    navigation.push('SignUp');
    Alert.alert('Something went wrong');
  };


  

    //for submitting the signup form
  const handleSubmit = () => {
    if (Data !== null) {
      setLoading(true);
      const api = callApi('post', '/register', Data)
      .then(res => {
          console.log(res.data)
          handleSuccessSignup()
        })
        .catch(e => {
          console.error(e)
          handleErrorSignup();
        });
    } else {
      Alert.alert("Something went wrong","Please try again later");
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
            <Registerpic width={200} height={200} />
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

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                    style={[
                      {width: wp(40), marginHorizontal: 5},
                      styles.fontField,
                    ]}
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
                    style={[
                      {width: wp(40), marginHorizontal: 5},
                      styles.fontField,
                    ]}
                  />
                </View>

                <View style={{paddingHorizontal: 20, marginTop: 10}}>
                  <Text style={[{marginLeft: 3}, styles.fontSmol]}>Gender</Text>
                  <View
                    style={[
                      {
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 13,
                        width: s(290),
                      },
                      styles.fontField,
                    ]}>
                    <Picker
                      mode="dropdown"
                      selectedValue={gender}
                      onValueChange={itemValue => {
                        setGender(itemValue);
                      }}>
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                    </Picker>
                  </View>
                </View>

                <View style={{paddingHorizontal: 20, marginTop: 10}}>
                  <Text style={[{marginLeft: 3}, styles.fontSmol]}>
                    Have you been diagnosed with mental illness?
                  </Text>
                  <View
                    style={[
                      {
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 13,
                        width: s(290),
                      },
                      styles.fontField,
                    ]}>
                    <Picker
                      mode="dropdown"
                      selectedValue={history}
                      onValueChange={itemValue => {
                        setHistory(itemValue);
                      }}>
                      <Picker.Item label="No" value="false" />
                      <Picker.Item label="Yes" value="true" />
                    </Picker>
                  </View>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      showModeDate();
                    }}>
                    <TextInput
                      style={[{width: s(290)}, styles.fontField]}
                      className="mt-5"
                      label="Birthdate"
                      value={bday}
                      outlineStyle={{borderRadius: 13}}
                      mode="outlined"
                      left={<TextInput.Icon icon={'calendar'} />}
                      activeOutlineColor="green"
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
                

                {show && (
                  <RNDateTimePicker
                    style={{}}
                    themeVariant="dark"
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    minimumDate={minDate}
                    display="default"
                    timeZoneName={'Asia/Singapore'}
                    onChange={handleDatePickerSignup}
                  />
                )}

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
                    marginBottom: 5,
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
