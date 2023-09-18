import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import callApi from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import your API function

export default function Chatscreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [token, setToken] = useState('');

    useEffect(() => {
      // Load initial chat history
      chatHistory();
    }, []);



    const chatHistory = async () => {
      try {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('id');
    
        
        // Make the GET request with the token in the headers
        const response = await fetch(`https://mentist.onrender.com/api/v1/chat/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`, // Header prefix with Token
          },
        });
    
        const responseData = await response.json();
    
        // Assuming responseData structure matches your description
        const historyMessages = responseData.messages.map(message => ({
          _id: message.user,
          text: message.content,
          createdAt: new Date(message.timestamp),
          user: {
            role: message.role,
            content: message.content,
            // Add other user properties if needed
          },
        }));
    
        setMessages(historyMessages);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

    const onSend = async (newMessages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );
      
      const messageText = newMessages[0].text;
      
      try {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        
        // Check if the token is available
        if (!token) {
          console.error('Token not found in AsyncStorage');
          return;
        }
    
        // Create the data object to send in the request
        const data = {
          message: messageText,
        };
    
        const id = await AsyncStorage.getItem('id');
        // Make the POST request with the token in the headers
        const response = await fetch(`https://mentist.onrender.com/api/v1/chat/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`, // Header prefix with Token
            'Content-Type': 'application/json', // Set content type if needed
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          console.error('Error:', response.status, response.statusText);
          return;
        }
    
        // Handle the API response if needed
        const responseData = await response.json();
        console.log('API Response:', responseData);
    
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
    
    

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1, // Your user ID
          name: 'You', // Your username
          // Add any other user properties you have
        }}
        // Customize the style of the chat bubble
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#007AFF', // Change the background color for your messages
              },
              left: {
                backgroundColor: '#E5E5EA', // Change the background color for received messages
              },
            }}
            textStyle={{
              right: {
                color: 'white', // Change the text color for your messages
              },
              left: {
                color: 'black', // Change the text color for received messages
              },
            }}
          />
        )}
        // Customize the style of the input toolbar (where you type messages)
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: '#F4F4F4', // Change the background color of the input toolbar
            }}
          />
        )}
        // Customize the style of the send button
        renderSend={props => (
          <Send {...props}>
            <View style={{marginRight: 10, marginBottom: 5}}>
              <Text style={{color: '#007AFF'}}>Send</Text>
            </View>
          </Send>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
