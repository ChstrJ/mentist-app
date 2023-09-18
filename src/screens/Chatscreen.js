import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import callApi from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// Import your API function

export default function Chatscreen() {
  // const [messages, setMessages] = useState([]);
  // const [inputText, setInputText] = useState('');
  // const [token, setToken] = useState('');

  //   useEffect(() => {
  //     // Load initial chat history
  //     chatHistory();
  //   }, []);



  //   const chatHistory = async () => {
  //     try {
  //       // Get the token from AsyncStorage
  //       const token = await AsyncStorage.getItem('token');
  //       const id = await AsyncStorage.getItem('id');
    
        
  //       // Make the GET request with the token in the headers
  //       const response = await fetch(`https://mentist.onrender.com/api/v1/chat/${id}`, {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Token ${token}`, // Header prefix with Token
  //         },
  //       });
    
  //       const responseData = await response.json();
    
  //       // Assuming responseData structure matches your description
  //       const historyMessages = responseData.messages.map(message => ({
  //         _id: message.user,
  //         text: message.content,
  //         createdAt: new Date(message.timestamp),
  //         user: {
  //           role: message.role,
  //           content: message.content,
  //           // Add other user properties if needed
  //         },
  //       }));
    
  //       setMessages(historyMessages);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
    

  //   const onSend = async (newMessages = []) => {
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, newMessages),
  //     );
      
  //     const messageText = newMessages[0].text;
      
  //     try {
  //       // Get the token from AsyncStorage
  //       const token = await AsyncStorage.getItem('token');
        
  //       // Check if the token is available
  //       if (!token) {
  //         console.error('Token not found in AsyncStorage');
  //         return;
  //       }
    
  //       // Create the data object to send in the request
  //       const data = {
  //         message: messageText,
  //       };
    
  //       const id = await AsyncStorage.getItem('id');
  //       // Make the POST request with the token in the headers
  //       const response = await fetch(`https://mentist.onrender.com/api/v1/chat/${id}`, {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Token ${token}`, // Header prefix with Token
  //           'Content-Type': 'application/json', // Set content type if needed
  //         },
  //         body: JSON.stringify(data),
  //       });
    
  //       if (!response.ok) {
  //         console.error('Error:', response.status, response.statusText);
  //         return;
  //       }
    
  //       // Handle the API response if needed
  //       const responseData = await response.json();
  //       console.log('API Response:', responseData);
    
  //     } catch (error) {
  //       console.error('Error sending message:', error);
  //     }
  //   };

  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])




const renderBubble = (props) => {
  return(
  <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#006A42"
      }
    }}
    textStyle={{
      right:{
        color: "#fff"
      }
    }}
  />
)
}

const renderSend = (props)=> {
  return(
    <Send {...props}>
      <View>
        <MaterialCommunityIcons name="send" size={38} color='#006A42' style={{marginBottom:5, marginRight:5}}/>
      </View>
    </Send>
  )
}

const scrollToBottomComponent = () => {
  return(
    <View>
        <MaterialCommunityIcons name="chevron-double-down" size={38} color='#006A42'/>
      </View>
  )
}

 
    
    

  return (
    <View style={styles.container}>
     <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom={true}
    />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
