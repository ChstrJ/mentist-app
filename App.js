import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Background from './src/screens/Background'
import { useState } from 'react'

import Home from './src/screens/Home'
import Login from './src/components/Login'

const App = () => {
  return (
    <Background>
    
      <Home/>
    </Background>
  )
}

export default App

const styles = StyleSheet.create({})