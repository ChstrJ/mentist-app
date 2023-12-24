import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function LogoutBtn({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <Image
        style={style.image}
        source={require('../assets/log-out.png')}
        tintColor={'black'}
      />
    </TouchableOpacity>
    
  )
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: getStatusBarHeight() - 10,
    
    right: 13,
  },
  
})
