import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function BtnOutline({btnLabel, onPress}) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: '#00A556',
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 15,
          alignItems: 'center',
          width: wp(20),
          paddingVertical: 5,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontFamily: 'Poppins-SemiBold',
          }}>
          {btnLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
