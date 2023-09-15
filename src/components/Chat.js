// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import callApi from '../helper/callApi';
//  // Import your API function

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');



//   useEffect(() => {
//     // Load initial chat history or welcome message
//     loadInitialChatHistory();
//   }, []);

//   const loadInitialChatHistory = async () => {
//     try {
//       const response = await callApi('get', '/chat', data);
//       const initialMessages = response.data.messages.map((message) => ({
//         _id: response.data.message.user.user_id,
//         text: response.data.messages.content,
//         createdAt: new Date(response.data.message.timestamp),
//         user: {
//           role: response.data.messages.role,
//           content: response.data.messages.content,
//           // Add any other user properties you have
//         },
//       }));
//       setMessages(initialMessages);
//     } catch (error) {
//       console.error('Error loading initial chat history:', error);
//     }
//   };

//   const onSend = async (newMessages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, newMessages)
//     );

//     const messageText = newMessages[0].text;

//     try {
//       const response = await callApi('post', '/chat', data, {
//         text: response.message.data.content,
//       });

//       // Handle the API response if needed
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => onSend(newMessages)}
//         user={{
//           _id: 1, // Your user ID
//           name: 'You', // Your username
//           // Add any other user properties you have
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default ChatScreen;
