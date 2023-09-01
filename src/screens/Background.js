import { View, ImageBackground } from 'react-native'
import React from 'react'
import BgColor from '../components/BgColor'
import { darkGreen } from '../components/Constant'
const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground 
      style = {{ height: '100%', backgroundColor: '#A0EAB9'}} />
      <View style={{ position: 'absolute' }} >
        {children}
      </View>
    </View>
  )
}



export default Background