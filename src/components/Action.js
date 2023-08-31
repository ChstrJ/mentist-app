import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import Dashboard from '../screens/Dashboard'
import { darkGreen, green } from './Constant'
const Action = ({bgColor, source, textColor, Press, actionLabel}) => {
    return (
        <TouchableOpacity
        onPress={Press}
          style={{
            backgroundColor: green,
            borderRadius: 20,
            alignItems: 'center',
            width: 300,
            paddingVertical: 15,
            elevation: 10, 
            display: 'flex',
            flexDirection: 'row', 
            paddingLeft: 12,
            justifyContent: 'center', 
            marginTop: 20, 
            marginBottom: 20, 
          }}>
            
            <Image source={source} style={{height: 50, marginRight: 5}}></Image>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 900, flex: 1}}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
    )
}
export default Action
