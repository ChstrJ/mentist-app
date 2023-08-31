import { StyleSheet, Dimensions } from 'react-native'


const Center = StyleSheet.create({
    CenterContainer: {
      width: Dimensions.get('window').width,
      display: 'flex',
      alignItems: 'center'
    }, 
    CenterText: {
      width: Dimensions.get('window').width, 
      justifyContent: 'center',
      textAlign: 'center'
    }
  })

export default Center