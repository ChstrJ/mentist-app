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
  },
  rightColors: {
    primary: '#6FF484', 
  }
})
export default theme