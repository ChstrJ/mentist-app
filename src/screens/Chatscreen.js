import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import callApi from '../helper/callApi';
// Import your API function

export default function Chatscreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

    useEffect(() => {
      // Load initial chat history
      chatHistory();
    }, []);

    const chatHistory = () => {
      // call api
      callApi('get', '/chat', data)
        .then(response => {
          const historyMessages = response.data.messages.map(message => ({
            _id: message.data.user.user_id,
            text: message.data.user.content,
            createdAt: new Date(message.data.message.timestamp),
            user: {
              role: response.data.messages.role,
              content: response.data.messages.content,
              // add
            }

          }));
          setMessages(historyMessages);
        })
        .catch(error => {
          console.error('error: ', error);
        });
    };

  const onSend = async (newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
    const messageText = newMessages[0].text;
    try {
      const response = await callApi('post', '/chat', data, {
        text: response.message.data.content,
      });

      // Handle the API response if needed
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
