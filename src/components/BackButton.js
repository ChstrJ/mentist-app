import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={style.container}>
      <Image
        style={style.image}
        source={require('../assets/arrow_back.png')}
        tintColor={'green'}
      />
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 40,
    height: 24,
  },
})
