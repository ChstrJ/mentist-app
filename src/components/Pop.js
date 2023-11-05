import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {modalStyle} from './styles';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Btn from './Btn';

export default function Pop({
  visible,
  onRequestClose,
  body,
  header,
  onPress,
  btnLabel,
  img,
}) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent
      animationType="fade"
      hardwareAccelerated>
      <View style={modalStyle.centerView}>
        <View style={modalStyle.modalView}>
          <View style={modalStyle.modalTitle}>
            <Text style={modalStyle.modalTextTitle}>{header}</Text>
          </View>
          <View style={modalStyle.modalBody}>
            <Text style={modalStyle.modalTextBody}>{body}</Text>
          </View>
          {/* <Btn press={press} btnLabel={label} textColor='black'/> */}
          <View className="flex items-center">
          <TouchableOpacity
          onPress={onPress}
            style={{
              backgroundColor: '#fff',
              borderColor: '#00A556',
              borderWidth: 3,
              borderRadius: 15,
              alignItems: 'center',
              width: wp(25),
              height: hp(5),
            }}>
            <View className="flex items-center justify-center">
            <Text
              style={{
                marginTop: 2,
                color: '#00A556',
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold',
              }}>
              {btnLabel}
            </Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  });
  
