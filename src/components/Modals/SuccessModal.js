import React, {useEffect, useRef} from 'react';
import SmallBtn from '../SmallBtn';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SuccessModal = ({
  children,
  visible,
  onClose,
  textBody,
  textHeader,
  btnLabel,
}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    visible ? showModal() : closeModal();
  });

  const showModal = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Modal transparent onRequestClose={onClose} visible={visible}>
      <View style={[styles.modalBackground, {zIndex: visible ? 1 : 100}]}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{scale: scaleValue}],
            },
          ]}>
          {/* header */}
          <View style={styles.header}>
         
          </View>
          {/* end of header */}
          <View style={styles.modalContent}>
            <Text style={styles.textHeader}>{textHeader}</Text>
            <Image
              style={styles.imgBody}
              source={require('../../assets/checked.png')}
            />
            <Text style={styles.textBody}>{textBody}</Text>
            {children}

            <View>
              <TouchableOpacity onPress={onClose}
                style={{
                  backgroundColor: '#00A556',
                  borderColor: '#fff',
                  borderWidth: 2,
                  borderRadius: 15,
                  marginVertical: 10,
                  alignItems: 'center',
                  width: wp(50),
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {btnLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imgHead: {
    marginHorizontal: 5,
    marginVertical: 2,
    height: 22,
    width: 22,
  },
  imgBody: {
    width: 150,
    height: 150,
  },
  textBody: {
    marginTop: 10,
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
  },

  textHeader: {
    fontSize: 20,
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'Poppins Bold',
    marginBottom: 10,
  },
});

export default SuccessModal;
