import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {Dimensions} from 'react-native'

const Logo = () => {
  return (
    <Image source={require('../assets/logo1.png')} style={styles.image}></Image>
  )
}

export default Logo

const styles = StyleSheet.create({
    image: {
        width: 110,
        height: 110,
        marginTop: 25,
    }


})