import { View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Background = ({ children }) => {
  return (
    <View
    style={{
      flex: 1,
      height: '100%',
      backgroundColor: '#FFFFFF', // Set the background color to white
    }}
  >
    {children}
  </View>
  );
};

export default Background;
