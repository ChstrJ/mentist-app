import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Background from './Background';
import {darkGreen, green} from '../components/Constant';
import Btn from '../components/Btn';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Text} from 'react-native-paper';
import Center from '../components/styles';
import BackButton from '../components/BackButton';

const SignUp = props => {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Background>
          <BackButton goBack={navigation.goBack} />
          <View style={Center.CenterContainer}>
            <Image
              className="mt-20"
              source={require('../assets/logo.png')}
              style={{
                width: 250,
                height: 130,
              }}
            />
          </View>

          <View className="flex justify-center" style={Center.CenterContainer}>
            <Text className=" text-black text-xl mt-10">Create an account</Text>
            <KeyboardAvoidingView
              style={{flex: 1, justifyContent: 'center'}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Behavior depends on the platform
              enabled></KeyboardAvoidingView>

            <TextInput
              className="w-[300] mt-5 rounded-lg"
              label="First Name"
              mode="focused"
              outlineColor="green"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
            />

            <TextInput
              className="w-[300] mt-5 rounded-lg"
              label="Last Name"
              mode="focused"
              outlineColor="green"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'account'} />}
            />

            <TextInput
              className="w-[300] mt-3 rounded-lg"
              label="Email"
              mode="focused"
              outlineColor="green"
              activeOutlineColor="green"
              left={<TextInput.Icon icon={'email'} />}
            />

            <TextInput
              className="w-[300] mt-3 rounded-lg"
              placeholder="Password"
              mode="focused"
              outlineColor="green"
              activeOutlineColor="green"
              secureTextEntry={true}
              left={<TextInput.Icon icon={'key'} />}
              right={<TextInput.Icon icon="eye" />}
            />
            <TextInput
              className="w-[300] mt-3 rounded-lg"
              mode="focused"
              outlineColor="green"
              activeOutlineColor="green"
              placeholder="Confirm Password"
              secureTextEntry={true}
              left={<TextInput.Icon icon={'key'} />}
              right={<TextInput.Icon icon={'eye'} />}
            />

            <Btn
              className="
        flex justify-center items-center w-screen"
              bgColor={green}
              textColor="white"
              btnLabel="Sign Up"
              Press={() => navigation.push('LogIn')}
            />
          </View>
        </Background>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  text: {
    backgroundColor: '#E5E5E5',
    width: 300,
    borderRadius: 10,
    margin: 8,
  },
});
export default SignUp;
