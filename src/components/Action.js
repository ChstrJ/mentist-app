import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import theme from '../core/theme'

const Action = ({ source, Press, actionLabel}) => {
    return (
        <TouchableOpacity
        onPress={Press}
          style={{
            backgroundColor: theme.rightColors.primary,
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
            padding: 10
          }}>
            
            <Image source={source} style={{marginRight: 5}}></Image>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 900, flex: 1}}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
    )
}
export default Action
