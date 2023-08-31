import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { theme } from '../core/theme'


    <TextInput
           placeholder="email"
           placeholderTextColor={theme.colors.primary}
           underlineColor="transparent"
           returnKeyType='go'
           autoCorrect={false} />


export default TextInput

const styles = StyleSheet.create({})