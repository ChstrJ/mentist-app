import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';
import LogIn from './src/screens/LogIn';
import IntroScreen from './src/screens/IntroScreen';
import Dashboard from './src/screens/Dashboard';
import MessageScreen from './src/screens/MessageScreen';
import {
  CardStyleInterpolators,
  TransitionPreset,
} from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="IntroScreen"
        screenOptions={{headerShown: false}}>
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
          name="MessageScreen"
          component={MessageScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
