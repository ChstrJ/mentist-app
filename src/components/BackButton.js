import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
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
    height: heightPercentageToDP(25),
    top: getStatusBarHeight() - 30,
    left: 13,
  },
  image: {
    width: 40,
    height: 24,
  },
})
