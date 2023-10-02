import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Btn({btnLabel, onPress}) {
  return (
    <View>
     <TouchableOpacity
     onPress={onPress}
      style={{
        backgroundColor: '#00A556',
        borderRadius: 15,
        alignItems: 'center',
        width: wp(80),
        paddingVertical: 10,
        marginVertical: 10,
      }}>
      <Text style={{color: 'white', fontSize: 20, fontFamily: 'Poppins-SemiBold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
    </View>
  );
}
