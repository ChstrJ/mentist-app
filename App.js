import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';
import {Provider} from 'react-redux';
import LogIn from './src/screens/LogIn';
import IntroScreen from './src/screens/IntroScreen';
import Dashboard from './src/screens/Dashboard';
import store from './src/store/store';
import Chatscreen from './src/screens/Chatscreen';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Appointment from './src/screens/Appointment';
import Progress from './src/screens/Progress';
import {getData} from './src/helper/auth';
import Splashscreen from './src/components/Splashscreen';
import ConfAppoint from './src/screens/ConfAppoint';
import TestingScreen from './src/screens/TestingScreen';
import Helplines from './src/screens/Helplines';
import Mental from './src/screens/Mental';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Splashscreen"
            component={Splashscreen}
            options={{
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="IntroScreen"
            options={{
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            component={IntroScreen}
          />

          <Stack.Screen
            options={{
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            options={{
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="LogIn"
            component={LogIn}
          />

          <Stack.Screen
            options={{
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="Dashboard"
            component={Dashboard}
          />
          <Stack.Screen
            options={{
              gestureEnabled: true,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}
            name="Mental"
            component={Mental}
          />

          <Stack.Screen
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureEnabled: true,
            }}
            name="Chatscreen"
            component={Chatscreen}
          />
          <Stack.Screen
            options={{
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="Appointment"
            component={Appointment}
          />
          <Stack.Screen
            options={{
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            name="Progress"
            component={Progress}
          />
          <Stack.Screen
            options={{
              gestureEnabled: true,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}
            name="ConfAppoint"
            component={ConfAppoint}
          />

          <Stack.Screen
            options={{
              gestureEnabled: true,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}
            name="Helplines"
            component={Helplines}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
