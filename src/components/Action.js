import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import theme from '../core/theme'

const Action = ({source, Press, actionLabel}) => {
    return (
        <TouchableOpacity
        onPress={Press}
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center', 
            marginTop: 15, 
            marginBottom: 15, 
          }}>
            
            <Image 
              className="flex justify-center items-center"
              source={source} style={{width: 70, height: 70}}>  
            </Image>
            <Text 
            className="flex justify-center items-center"
            style={{color: 'black', fontSize: 18, marginTop: 10, fontFamily: 'Poppins-SemiBold'}}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
    )
}
export default Action
