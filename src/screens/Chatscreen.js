import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import {callApi} from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../core/theme';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
// Import your API function

export default function Chatscreen() {
  // const [inputText, setInputText] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigation = useNavigation();

  const getUser = async () => {
    const first_name = await AsyncStorage.getItem('first_name');
    setFirstName(first_name);
  };

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

  const [messages, setMessages] = useState([]);

  const onSend = async (newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );

    const messageText = newMessages[0].text;
    const data = {
      message: messageText,
    };

    const id = await AsyncStorage.getItem('id');
    callApi('post', `/chat/${id}`, data)
      .then(response => {
        const responseData = response.data;
        console.log('API Response:', responseData);
      })
      .catch(e => {
        console.error('Error sending message:', e);
      });
  };

  useEffect(() => {
    getUser();
    setMessages([
      {
        _id: 2,
        text: 'Hi',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Assistant',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
    ]);
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
        <Image
          source={require('../assets/bot.png')}
          style={styles.image}
        />
        <Text style={styles.headerText}>Hello, {firstName}</Text>
      </View>

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
    marginTop:7,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 5
   
  },

  image: {
    width: 50,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 15,
    
    marginRight: 10,
    marginLeft: 60
  },
});
