import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '../../core/theme'
export default function ChatHeader() {
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.primary, 
        paddingTop: 50, 
    }
})