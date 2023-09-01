import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import theme from '../../core/theme'

export default function ChatInput() {
  const [message, setMessage] = useState("")
  return (
    <View style={styles.innerContainer}>
    <View style={styles.inputAndMicrophone}>
      <TouchableOpacity
        style={styles.emoticonButton}
        onPress={() => setShowEmojiPicker((value) => !value)}
      >

      </TouchableOpacity>
      <TextInput
        multiline
        placeholder={"Type something..."}
        style={styles.input}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <TouchableOpacity style={styles.rightIconButtonStyle}>
        <Icon
          name="paperclip"
          size={23}
          color={theme.colors.description}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIconButtonStyle}>
        <Icon
          name="camera"
          size={23}
          color={theme.colors.description}
        />
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.sendButton}>
      <Icon
        name={message ? "send" : "microphone"}
        size={23}
        color={theme.colors.white}
      />
    </TouchableOpacity>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex', 
    justifyContent: 'flex-end', 
    backgroundColor: theme.colors.white, 
    position: 'relative', 
  }, 
  innerContainer: {
    paddingHorizontal: 10, 
    marginHorizontal: 10, 
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row', 
    paddingVertical: 10, 
  }, 
  inputAndMicrophone: {
    flexDirection: 'row', 
    backgroundColor: theme.colors.inputBackground, 
    flex: 3, 
    marginRight: 10, 
    paddingVertical: Platform.OS === 'ios' ? 10 : 0, 
    borderRadius: 30, 
    justifyContent: 'space-between',
    alignItems: 'center'
  }, 
  input: {
    backgroundColor: 'transparent', 
    paddingLeft: 20, 
    color: theme.colors.inputText, 
    flex: 3, 
    fontSize: 15, 
    height: 50, 
    alignSelf: 'center'
  }, 
  rightIconButtonStyle: {
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingRight: 15, 
    paddingLeft: 10, 
    borderLeftWidth: 1, 
    borderLeftColor: '#fff',
  }, 
  sendButton: {
    backgroundColor: theme.colors.primary, 
    borderRadius: 50, 
    height: 50, 
    width: 50, 
    alignItems: 'center', 
    justifyContent: 'center'

  }
})