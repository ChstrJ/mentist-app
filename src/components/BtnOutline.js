import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { scale as s, verticalScale as vs, moderateScale as ms } from 'react-native-size-matters';

export default function BtnOutline({btnLabel, onPress, dispatch}) {
  return (
    <View>
     <TouchableOpacity
     onPress={onPress}
      style={{
        backgroundColor: '#fff',
        borderColor:'#00A556',
        borderWidth: 2,
        borderRadius: 15,
        width: s(280),
        height: s(40),
        alignItems: 'center',
        justifyContent: 'center',
       
        marginVertical: 10,
      }}>
      <Text style={{color: '#00A556', fontSize: 20, fontFamily: 'Poppins-SemiBold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
    </View>
  );
}
