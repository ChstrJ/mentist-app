import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,

} from 'react-native';
import React from 'react';
import Background from './Background';
import Btn from '../components/Btn';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Text} from 'react-native-paper';
import styles from '../components/styles';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { green } from '../components/Constant';


const SignUp = props => {
  const navigation = useNavigation();

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
            mode="focused"
            activeOutlineColor="green"
            left={<TextInput.Icon icon={'account'} />}
          />

          <TextInput
            className="w-[350] mt-5 rounded-lg"
            label="Last Name"
            mode="focused"
            activeOutlineColor="green"
            left={<TextInput.Icon icon={'account'} />}
          />

          <TextInput
            className="w-[350] mt-5 rounded-lg"
            label="Email"
            mode="focused"
            activeOutlineColor="green"
            left={<TextInput.Icon icon={'email'} />}
          />

          <TextInput
            className="w-[350] mt-3 rounded-lg"
            placeholder="Password"
            mode="focused"
            activeOutlineColor="green"
            secureTextEntry={true}
            left={<TextInput.Icon icon={'key'} />}
            right={<TextInput.Icon icon="eye" />}
          />
          <TextInput
            className="w-[350] mt-3 rounded-lg"
            mode="focused"
            activeOutlineColor="green"
            placeholder="Confirm Password"
            secureTextEntry={true}
            left={<TextInput.Icon icon={'key'} />}
            right={<TextInput.Icon icon={'eye'} />}
          />

          <View className="flex justify-center items-center">
          <Btn
          className="
          flex justify-center items-center w-screen"
          bgColor={green}
          textColor="white"
          btnLabel="Signup"
          Press={() => navigation.navigate("LogIn")}
        />


          </View>
        </View>
      </Background>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  text: {
    backgroundColor: '#E5E5E5',
    width: 300,
    borderRadius: 10,
    margin: 8,
  },

  button:{
    paddingHorizontal:30,
    paddingVertical: 5,
  }
});
export default SignUp;

