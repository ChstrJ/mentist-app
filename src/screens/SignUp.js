import {
  View,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import React, {useState} from 'react';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Text} from 'react-native-paper';
import styles from '../components/styles';
import BackButton from '../components/BackButton';
import {Formik} from 'formik';
import * as Yup from 'yup';

const SignUp = props => {
  const navigation = useNavigation();

  // const [firstName, setFirstName] = useState('')
  // const [lastName, setlastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const [hidePass, setHidePass] = useState(true);
  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your first name.'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your last name.'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email.'),
    password: Yup.string()
      .min(8)
      .required('Invalid password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
      ),
    confirmPassword: Yup.string()
      .min(8)
      .required('Invalid password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => Alert.alert(JSON.stringify(values))}
        >
        

        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          isValid,
          handleSubmit,
        }) => (
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
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={() => setFieldTouched('firstName')}
              />

              {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}

              <TextInput
                className="w-[350] mt-5 rounded-lg"
                label="Last Name"
                mode="outlined"
                activeOutlineColor="green"
                left={<TextInput.Icon icon={'account'} />}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName')}
              />

              {touched.lastName && errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}

              <TextInput
                className="w-[350] mt-5 rounded-lg"
                label="Email"
                mode="outlined"
                activeOutlineColor="green"
                left={<TextInput.Icon icon={'email'} />}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

        

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
                value={values.password}
                onChangeText={handleChange('password')}   
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

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
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}   
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}


              <View className="flex justify-center items-center">
                
              <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              style={[styles.submitBtn, {backgroundColor: isValid ? '#6FF484' : '#98e7ad'},
              ]}>
              
              <Text style={styles.submitBtnTxt}>Signup</Text>
              </TouchableOpacity>

              </View>
            </View>
          </Background>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignUp;
