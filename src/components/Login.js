import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Background from '../screens/Background';
import Logo from './Logo';
import BackButton from './BackButton';
import {TextInput, Text} from 'react-native-paper';
import {theme} from '../core/theme';
import BgColor from './BgColor';
import Btn from './Btn';

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
        <BackButton />
        <View className="flex items-center justify-center w-screen mt-20">
          <Logo />
        </View>
        <View className="flex items-center justify-center w-screen">
          <Text className="text-slate-100 text-3xl">Account Login</Text>
          <TextInput
            className="w-[300] mt-5"
            mode="focused"
            label="Email"
            outlineStyle
            left={<TextInput.Icon icon={'email'}/>}
            activeOutlineColor={theme.colors.primary}
          />

          <TextInput
            className="w-[300] mt-5"
            mode="focused"
            label="Password"
            secureTextEntry
            outlineColor="grey"
            left={<TextInput.Icon icon={'key'}/>}
            activeOutlineColor={theme.colors.primary}
            right={<TextInput.Icon icon={'eye'}/>}
            
          />
        </View>

        <TouchableOpacity>
          <View className="flex items-center mt-5">
          <Text className="text-white">
          Forgot Password?
          </Text>
          </View>
        </TouchableOpacity>
        
        <View className="flex items-center justify-center">
        <Btn 
        bgColor={theme.colors.primary} 
        textColor="white" 
        btnLabel="Login" 
        
        />
        </View>

    
        </Background>
    </SafeAreaView>
  );
};

export default Login;


