import { DefaultTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const theme = StyleSheet.create({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#A0EAB9',
    secondary: '#006A42',
    error: '#f13a59',
    white: '#fff', 
    description: '#9f9f9f', 
    inputBackground: '#f0f0f0', 
    inputText: '#000', 
  },
  rightColors: {
    primary: '#6FF484', 
    logOutColor: '#c4c4c4'
  }
})
export default theme