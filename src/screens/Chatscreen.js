import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image, FlatList,Alert} from 'react-native';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import {callApi} from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../core/theme';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
// Import your API function

export default function Chatscreen() {
  const [firstName, setFirstName] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const getUser = async () => {
    const first_name = await AsyncStorage.getItem('first_name');
    setFirstName(first_name);
  };



  const chatHistory = async () => {
    const id = await AsyncStorage.getItem('id');
    const response = await callApi('get', `/chat/${id}`);
    const chatResponse = response.data;


    const historyMessages = chatResponse.messages.map(message => ({
      _id: message.timestamp,
      text: message.content,
      createdAt: new Date(message.timestamp),
      user: {
        _id: message.role === 'user' ? '2' : '1',
        name: message.role,
      },
    }));

    setMessages(historyMessages);
  };


 

  // sending message
  const onSend = async (newMessages = []) => {
    const messageText = newMessages[0].text;
    const data = {
      message: messageText,
    };

    const id = await AsyncStorage.getItem('id');
    callApi('post', `/chat/${id}`, data)
      .then(response => {
        const responseData = JSON.stringify(response.data);
        console.log(responseData);

        // Update the state with the new message
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );
      })
      .catch(e => {
        console.error('Error sending message:', e);
      });
  };

  useEffect(() => {
    getUser();
    chatHistory();
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#006A42',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };


  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send"
            size={38}
            color="#006A42"
            style={{marginBottom: 5, marginRight: 5}}
          />
        </View>
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />
        <Image source={require('../assets/bot.png')} style={styles.image} />
        <Text style={styles.headerText}>Hello, {firstName}</Text>
      </View>

      <GiftedChat
        messages={messages}
        onSend={newMessages=>onSend(newMessages)}
        user={{
          _id: "2",
        }}
        renderBubble={renderBubble}
        messagesContainerStyle={{ backgroundColor: 'white' }}
        alwaysShowSend
        renderSend={renderSend}
        placeholder='Write a message...'
        scrollToBottom={true}
        isTyping={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 6,
    paddingRight: 6,
    elevation: 8,
  },
  headerText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 7,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 5,
  },

  image: {
    width: 50,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 15,

    marginRight: 10,
    marginLeft: 60,
  },
});
