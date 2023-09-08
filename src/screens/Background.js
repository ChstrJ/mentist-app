import { View, ImageBackground } from 'react-native'
import React from 'react'
const Background = ({ children }) => {
  return (
    <View style = {{ height: '100%', backgroundColor: '#A0EAB9'}}>
      <View style={{ position: 'flex', }} >
        {children}
      </View>
    </View>
  )
}



export default Background