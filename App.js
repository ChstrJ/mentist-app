import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';
import { useDispatch, Provider} from "react-redux"
import LogIn from './src/screens/LogIn';
import IntroScreen from './src/screens/IntroScreen';
import Dashboard from './src/screens/Dashboard';
import MessageScreen from './src/screens/MessageScreen';
import Chat from './src/components/Chat';
import Chatscreen from './src/screens/Chatscreen';
import {
  CardStyleInterpolators,
  TransitionPreset,
} from '@react-navigation/stack';
import Appointment from './src/screens/Appointment';
import Progress from './src/screens/Progress';
import {getData} from './src/helper/auth';
import Splashscreen from './src/components/Splashscreen';
import ConfAppoint from './src/screens/ConfAppoint';
const Stack = createNativeStackNavigator();



function App() {

 

  return (
    // <Provider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>

          <Stack.Screen
              name='Splashscreen'
              component={Splashscreen}
              options={{
                headerShown: false,
              }}
              
            />
        <Stack.Screen
          name="IntroScreen"
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          component={IntroScreen}
        />
        
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="LogIn"
          component={LogIn}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="Dashboard"
          component={Dashboard}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="Appointment"
          component={Appointment}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="Progress"
          component={Progress}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="ConfAppoint"
          component={ConfAppoint}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}

export default App;
