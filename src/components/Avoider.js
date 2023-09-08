import {View, Text, SafeAreView} from 'react-native';
import React from 'react';

const Avoider = ({children}) => {
  return <SafeAreView>{children}</SafeAreView>;
};

export default Avoider;
