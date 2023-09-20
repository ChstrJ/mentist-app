import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={style.container}>
      <Image
        style={style.image}
        source={require('../assets/arrow_back.png')}
        tintColor={'black'}
      />
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 13,
  },
  image: {
    width: 40,
    height: 24,
  },
})
