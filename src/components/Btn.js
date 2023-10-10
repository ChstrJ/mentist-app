import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Btn({btnLabel, onPress, disabled}) {
  return (
    <View>
     <TouchableOpacity
     onPress={disabled ? null : onPress}
     
      style={{
        backgroundColor: disabled ? 'rgba(255, 0, 0, 0.3)' : '#00A556',
        borderRadius: 15,
        alignItems: 'center',
        width: wp(80),
        paddingVertical: 10,
        marginVertical: 10,
      }}
      disabled={disabled} //
      >
      <Text style={{color: 'white', fontSize: 20, fontFamily: 'Poppins-SemiBold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
    </View>
  );
}
