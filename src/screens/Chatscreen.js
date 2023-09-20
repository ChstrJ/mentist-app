import React, {useState, useCallback, useEffect, PureComponent} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image, FlatList, Alert} from 'react-native';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import {callApi} from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Chatscreen() {
  const [firstName, setFirstName] = useState('');
  const [messages, setMessages] = useState([]);
  const[initialLoad, setInitialLoad] = useState(10)
  const navigation = useNavigation();
  const [typing, Istyping] = useState()

  const getUser = async () => {
    const first_name = await AsyncStorage.getItem('first_name');
    setFirstName(first_name);
  };


// load the chat history messages
  const chatHistory = async () => {
    const id = await AsyncStorage.getItem('id');
    const response = await callApi('get', `/chat/${id}`);
    const chatResponse = response.data;
    //map the data messages
    const historyMessages = chatResponse.messages.map(message => ({
      _id: message.timestamp, //unique identifier to kaya timestamp
      text: message.content,
      createdAt: new Date(message.timestamp),
      user: {
        _id: message.role === 'user' ? '2' : '1', //if user gawing 2 ung id nya if not 1 (bot)
        name: message.role,
        avatar: "https://randomuser.me/api/portraits/women/79.jpg"
      },
    }));
    // historyMessages.sort((a, b) => a.createdAt - b.createdAt)
    
    setMessages(historyMessages);
  };


  // sending message
  const onSend = async (newMessages = []) => {
    const messageText = newMessages[0].text;
    const data = {
      message: messageText,
    };
  
    Istyping(true);
  
    const id = await AsyncStorage.getItem('id');
    callApi('post', `/chat/${id}`, data)
      .then(response => {
        const responseData = JSON.stringify(response.data);
        console.log(responseData);
  
        // Update the state with the new message
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        )
        Istyping(false);
      })
      .catch(e => {
        console.error('Error sending message:', e);
        // Set typing back to false in case of an error
        Istyping(false);
      });
  };
  //end of sending message

  //load this states
  useEffect(() => {
    getUser();

    chatHistory();

    const keepCalling = setInterval(() => {
      chatHistory();
    }, 500); // keep calling the function

    return () => {
      clearInterval(keepCalling);
    };

  }, []);

// render messges
  // const renderMsg = () => {
  //   return (
  //     <FlatList
  //       data={messages}
  //       keyExtractor={(item) => item._id.toString()}
  //       renderItem={({ item }) => <MessageItem item={item} />}
  //     />
  //   );
  // };
  

  // props for gifted chat
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

  //load earlier messages
  const loadMoreMsg = () => {
    const newLoadCount = initialLoad + 10
    setInitialLoad(newLoadCount)
  }

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />
        <Image source={require('../assets/bot2.png')} style={styles.image} />
        <Text style={styles.headerText}>Hello, {firstName}</Text>
      </View>

     


      <GiftedChat
        messages={messages.slice(-initialLoad)}
        onSend={newMessages=>onSend(newMessages)}
        user={{
          _id: "2",
          name: "user"
        }}
        renderBubble={renderBubble}
        // renderMessage={renderMsg}
        messagesContainerStyle={{ backgroundColor: 'white' }}
        alwaysShowSend
        renderSend={renderSend}
        placeholder='Write a message...'
        scrollToBottom={true}
        loadEarlier={messages.length > initialLoad}
        onLoadEarlier={loadMoreMsg}
        isTyping={typing}
        inverted={false}
        
        
        
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
    backgroundColor: '#006A42',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 6,
    paddingRight: 6,
    elevation: 15,
   
    
  },
  headerText: {
    fontSize: 25,
    color: 'white',
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
    marginRight: 10,
    marginLeft: 60,
  },
});
