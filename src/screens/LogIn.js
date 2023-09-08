import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import React, {useState} from 'react';
import Background from './Background';
import {darkGreen, green} from '../components/Constant';
import Center from '../components/styles';
import Btn from '../components/Btn';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import styles from '../components/styles';


const LogIn = () => {
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  
  const togglePasswordVisibility = () => {
    setHidePass(!hidePass);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <View
          className="flex justify-center  w-screen"
          style={Center.CenterContainer}>
          <Image
            className="mt-20"
            source={require('../assets/logo.png')}
            style={{
              width: 250,
              height: 130,
            }}
          />
        </View>

        <View className="flex justify-center items-center mt-10">
          <Text className="text-black text-xl mt-10 mb-2">Login Account</Text>

          <TextInput
            className="w-[350] mt-2 rounded-md"
            mode="outlined"
            label="Email"
            left={<TextInput.Icon icon={'email'} />}
            activeOutlineColor="green"
          />

            <TextInput
            className="w-[350] mt-2 rounded-md"
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
          />

          

          <View className="flex items-center justify-center">
            <Text className="text-black mt-5">
              Don't have an account?
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={{
                    color: 'blue',
                    marginVertical: '20',
                  }}>
                  {' Signup here'}
                  
                </Text>
              </TouchableOpacity>
            </Text>

            <View className="flex justify-center items-center">
                <TouchableOpacity
                  
                  
                  style={[
                    styles.submitBtn,
                    {backgroundColor: '#6FF484'},
                  ]}>
                  <Text style={styles.submitBtnTxt}>Signup</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Background>
    </ScrollView>
  );
};

export default LogIn;
