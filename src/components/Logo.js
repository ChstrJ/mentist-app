import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <Image source={require('../assets/logo1.png')} style={styles.image}></Image>
  )
}

export default Logo

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        marginBottom: 12,
    }


})