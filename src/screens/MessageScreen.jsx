import { View, Text } from 'react-native'
import React from 'react'
import ChatHeader from '../components/ChatComp/ChatHeader'
import ChatInput from '../components/ChatComp/ChatInput'
import MessageList from '../components/ChatComp/MessageList'

export default function MessageScreen({ navigation, route, }) {
  return (
    <View>
      <ChatHeader 
        onPress={() =>{}}
        username={"Nicky"}
        onlineStatus={'Hello'}
        picture={require('../assets/app.jpg')}
      />
    </View>
  )
}
