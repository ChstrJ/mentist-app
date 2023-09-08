import { View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Background = ({ children }) => {
  return (
    <LinearGradient
      colors={['#a9ecc0', '#5CA4A9']} // Define your gradient colors here
      style={{ flex: 1, height:'100%'}}
    >
      {children}
    </LinearGradient>
  );
};

export default Background;
