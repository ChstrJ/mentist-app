import {StyleSheet, Text, View, Image, Button} from 'react-native';
import React, { useState } from 'react';

import SuccessModal from '../components/Modals/SuccessModal';


export default function TestingScreen() {
    const [visible, setVisible] = useState(false);
    

    const closeModal = () => {
      setVisible(false);
      // Additional logic if needed upon modal close
    };
    
  return (
    
   <View className="flex items-center justify-center">
    <SuccessModal
    visible={visible}
    onClose={closeModal}
    >
    
    </SuccessModal>
    <Button title='Show Modal' onPress={() => setVisible(true)}>Click me</Button>
   </View>
  );
}

const styles = StyleSheet.create({
    header: {

    },
});
