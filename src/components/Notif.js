import { View, Text, Modal, TouchableOpacity, } from 'react-native'
import React, {useState} from 'react'
import { modalStyle } from './styles'
import Btn from './Btn'


export default function Notif({visible, onRequestClose, body, header, press, label, img}) {
  return (
    <Modal 
        visible={visible}
        onRequestClose={onRequestClose}
        transparent
        animationType='fade'
        hardwareAccelerated>
        <View 
            style={modalStyle.centerView}>
            <View style={modalStyle.modalView}>
              <View style={modalStyle.modalTitle}>
                  <Text style={modalStyle.modalTextTitle}>{header}</Text>
              </View>
              <View style={modalStyle.modalBody}>
                  <Text style={modalStyle.modalTextBody}>{body}</Text>
              </View>
                {/* <Btn press={press} btnLabel={label} textColor='black'/> */}
                <TouchableOpacity onPress={press}>
                    <Text style={modalStyle.modalTextTitle}>{label}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    </Modal>
  )
}