import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '../core/theme'

export default function Logout({Press, actionLabel}) {
  return (
    <TouchableOpacity 
    onPress={Press} 
      style={{
        backgroundColor: theme.rightColors.logOutColor,
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
        <Text style={{color: 'white', fontSize: 18, fontWeight: 900, flex: 1, textAlign: 'center'}}>
            {actionLabel}
        </Text>
    </TouchableOpacity>
  )
}