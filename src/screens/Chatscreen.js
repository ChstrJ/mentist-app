import React, {useState, useCallback, useEffect, PureComponent} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Alert,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble,
  Actions,
} from 'react-native-gifted-chat';
import {callApi} from '../helper/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import Voice from '@react-native-voice/voice';

export default function Chatscreen() {
  const [firstName, setFirstName] = useState('');
  const [messages, setMessages] = useState([]);
  const [initialLoad, setInitialLoad] = useState(10);
  const navigation = useNavigation();
  const [typing, Istyping] = useState();
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const getUser = async () => {
    const first_name = await AsyncStorage.getItem('first_name');
    setFirstName(first_name);
  };

  //GET PERMISSION TO ON MIC
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      let granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
      }
    }
  };

  const onSpeechStart = (e) => {
    setSpeaking('√');
  };

  const onSpeechRecognized = (e) => {
    setRecognized('√');
  };

  const onSpeechResults = (e) => {
    setResult(e.value);
  };

  const startSpeechRecognition = async (e) => {
    try {
      await Voice.start('en-US');
      console.log(e)
    } catch (error) {
      console.error(error);
    }
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
        avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
      },
    }));
    // historyMessages.sort((a, b) => a.createdAt - b.createdAt)

    setMessages(historyMessages);
  };

  // sending message
  const onSend = async (newMessages = []) => {
    const messageText = newMessages[0].text;
    const resultText = newMessages[0].text;
    const data = {
      message: messageText,
      resultText,
    };

    try {
      await Voice.stop(); // Stop recording if it's active
      const recognitionResult = await Voice.start('en-GB'); // Start recognition
      console.log('Recognition Result:', recognitionResult);
    } catch (error) {
      console.log('Error sending message:', error);
      // Set typing back to false in case of an error
      Istyping(false);
    }

    const id = await AsyncStorage.getItem('id');
    callApi('post', `/chat/${id}`, data)
      .then(response => {
        const responseData = JSON.stringify(response.data);
        console.log(responseData);

        // Update the state with the new message
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );
        Istyping(false);
      })
      .catch(e => {
        console.error('Error sending message:', e);
        // Set typing back to false in case of an error
        Istyping(false);
      });
  };

  const onMicPress = async () => {
    if (!recording) {
      // Start recording
      try {
        await startRecording();
        setRecording(true);
      } catch (error) {
        console.log('Error starting recording:', error);
      }
    } else {
      // Stop recording
      try {
        await stopRecording();
        setRecording(false);
      } catch (error) {
        console.log('Error stopping recording:', error);
      }
    }
  };

  //end of sending message

  //load this states
  useEffect(() => {
    getUser();
    getPermission();
    chatHistory();

  
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechResults = onSpeechResults;

    const keepCalling = setInterval(() => {
      chatHistory();
    }, 1000); // keep calling the function

    return () => {
      clearInterval(keepCalling);
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // props for gifted chat
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#00A556',
          },
        }}
        textStyle={{
          right: {
            color: '#333333',
          },
        }}
      />
    );
  };

  // send button
  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send"
            size={38}
            color="#00A556"
            style={{marginBottom: 5, marginRight: 5}}
          />
        </View>
      </Send>
    );
  };

  // mic button
  const renderActions = props => {
    return (
      <Actions
        {...props}
        containerStyle={{
          width: 33,
          height: 33,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 10,
        }}
        icon={() => (
          <MaterialCommunityIcons name="microphone" size={30} color="#00A556" />
        )}
        onPressActionButton={onMicPress} // wip
      />
    );
  };

  //load earlier messages
  const loadMoreMsg = () => {
    const newLoadCount = initialLoad + 10;
    setInitialLoad(newLoadCount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />
        <Image source={require('../assets/robot.png')} style={styles.image} />
        <Text style={styles.headerText}>Hello, {firstName}</Text>
      </View>

    

      {/* Display the recognition result */}
      {result !== '' && <Text>Recognition Result: {result}</Text>}

      <GiftedChat
        messages={messages.slice(-initialLoad)}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: '2',
          name: 'user',
        }}
        renderBubble={renderBubble}
        // renderMessage={renderMsg}
        messagesContainerStyle={{backgroundColor: 'white'}}
        alwaysShowSend
        renderSend={renderSend}
        placeholder="Write a message..."
        scrollToBottom={true}
        loadEarlier={messages.length > initialLoad}
        onLoadEarlier={loadMoreMsg}
        // isTyping={typing}
        inverted={false}
        renderActions={renderActions}
      />

      {recording && (
        <LottieView
          autoPlay
          loop
          speed={1}
          source={require('../assets/animations/record2.json')}
          style={styles.lottieSmall}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#00A556',
    paddingTop: 10,
    paddingLeft: 6,
    paddingRight: 6,
    elevation: 20,
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 5,
  },

  image: {
    width: wp(12),
    height: hp(6),
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 12,
    marginLeft: 60,
  },

  lottieSmall: {
    position: 'absolute',
    bottom: 30,
    left: 35,
    width: 50,
    height: 70,
  },
});
