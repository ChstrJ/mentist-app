import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function BtnOutline({btnLabel, onPress}) {
  return (
    <View>
     <TouchableOpacity
     onPress={onPress}
      style={{
        backgroundColor: '#fff',
        borderColor:'#00A556',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        width: wp(80),
        paddingVertical: 10,
        marginVertical: 10,
      }}>
      <Text style={{color: '#00A556', fontSize: 20, fontFamily: 'Poppins-SemiBold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
    </View>
  );
}
