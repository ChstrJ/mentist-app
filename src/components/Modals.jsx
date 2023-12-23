import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import styles from './modalStyles'
export default function Modals({Action, visible, src, Press, ModalLabel, Message }) {
  return (
    <Modal 
      visible={visible} 
      animationType='fade' 
      transparent
      hardwareAccelerated
      onRequestClose={true}
    >
      <View style={styles.centerView}>
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Image source={src} style={{height: 150, width: 150, padding: 10, resizeMode: 'cover'}}/>
            <Text style={styles.modalTitleText}>{ModalLabel}</Text>
          </View>
          {/* <View style={styles.modalMessageContainer}> */}
           {typeof Message === 'object'?
           Object.entries(Message).map(([key, value]) => (
              <View key={key} style={styles.modalMessageContainer}>
                <Text style={styles.modalMessage}>{`${key}: ${value}`}</Text>
                <Text>{"\n"}</Text>
              </View>
            )) : (
              <View style={styles.modalTextMessageContainer}>
                <Text style={styles.modalMessage}>{Message}</Text>
              </View>
            )}
          {/* </View> */}
          <View style={styles.modalActionContainer}>
            <TouchableOpacity onPress={Press}>
              <Text style={styles.modalAction}>{Action}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}