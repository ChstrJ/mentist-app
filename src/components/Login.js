import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Background from '../screens/Background';
import Logo from './Logo';
import {TextInput, Button} from 'react-native-paper';
import BackButton from './BackButton';



const Login = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (username, email, password) => {
    console.log(username, email, password);
  };

  return (
    <SafeAreaView>
      <Background>
      <BackButton/>
        <View className="flex items-center justify-center w-screen mt-20">
        <Logo/>
        </View>
        <View className="flex items-center justify-center w-screen">
          <Text className="text-slate-100 text-3xl">Login</Text>
        </View>
      </Background>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
