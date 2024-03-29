import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function BtnCancel({btnLabel, onPress}) {
  return (
    <View>
     <TouchableOpacity
     onPress={onPress}
      style={{
        backgroundColor: '#d23232',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(80),
        paddingVertical: 10,
        marginVertical: 10,
      }}>
      <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Poppins-SemiBold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
    </View>
  );
}
