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
import store from './src/store/store';
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
    <Provider store={store}>
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
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
          component={IntroScreen}
        />
        
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
          name="LogIn"
          component={LogIn}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
          name="Dashboard"
          component={Dashboard}
        />
        
        <Stack.Screen
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
            gestureEnabled: true,
          }}
          name="Chatscreen"
          component={Chatscreen}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
          name="Appointment"
          component={Appointment}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
          name="Progress"
          component={Progress}
        />
        <Stack.Screen
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
          name="ConfAppoint"
          component={ConfAppoint}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
