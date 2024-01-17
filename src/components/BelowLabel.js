import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';

export default function BelowLabel({onPress, text, text2, highlightText, children}) {
  return (
    <View className="justify-center items-center p-5 bg-gray-700 w-screen">
      <Text style={styles.fontSmolLabel}>{text} </Text>
      <Text style={styles.fontSmolLabel}>Call the following</Text>
      <TouchableOpacity onPress={onPress}><Text style={styles.fontSmolGreen}>{highlightText}</Text></TouchableOpacity>
    </View>
  );
}
