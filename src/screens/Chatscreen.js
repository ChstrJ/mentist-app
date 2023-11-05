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
  Modal,
} from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble,
  Actions,
} from 'react-native-gifted-chat';
import {callApi} from '../helper/callApi';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  AlertNotificationDialog,
} from 'react-native-alert-notification';
import StarRating from 'react-native-star-rating-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import SmallBtn from '../components/SmallBtn'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import Voice from '@react-native-voice/voice';
import {Header} from '@rneui/themed';
import Notif from '../components/Notif';
import TestingBtn from './TestingBtn';
import Pop from '../components/Pop';

export default function Chatscreen() {

  const [firstName, setFirstName] = useState('');
  const [messages, setMessages] = useState([]);
  const [initialLoad, setInitialLoad] = useState(10);
  const navigation = useNavigation();
  const [typing, Istyping] = useState();
  const [recording, setRecording] = useState(false);
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [end, setEnd] = useState(false);
  const [results, setResults] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState();

  const modal = () => {
    toggleModal();
  };

  

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

  const sendRating = async () => {
    const rate = {
      rate: rating,
    };
    await callApi('post', '/chat/rate', rate)
      .then(response => {
        response.status === 200 ? Alert.alert("Success Rating") : Alert.alert("Error Rating")  
      })
      .catch(e => console.log(e));
    toggleModal(false);
  };
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSpeechStart = e => {
    console.log('Speech started');
    setStarted(true);
  };
  const onSpeechEnd = e => {
    console.log('Speech ended');
    setEnd(true);
    if (results.length > 0) {
      const recognizedSpeech = results[0];
      onSend([{text: recognizedSpeech}]);
    }
  };

  const onSpeechRecognized = e => {
    setRecognized('√');
  };

  const onSpeechResults = e => {
    setResults(e.value);
    const recognizedSpeech = e.value[0];
    onSend([{text: recognizedSpeech}]);
  };

  const startSpeechRecognition = async e => {
    try {
      await Voice.start('en-PH');
      console.log(e);
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
    const historyMessages = chatResponse.messages.map((messages, index) => ({
      _id: messages.timestamp + index.toString(), // timestamp for a unique key
      text: messages.content,
      createdAt: new Date(messages.timestamp),
      user: {
        _id: messages.role === 'user' ? '2' : '1', // USER = 2 | BOT = 1
        name: messages.role,
        avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
      },

      
    }));

    historyMessages.sort((a, b) => a.createdAt - b.createdAt);
    setMessages(historyMessages);
  };

  
  // Sending a message and updating the chat history
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
        );
        Istyping(false);

       
      })
      .catch(e => {
        console.error('Error sending message:', e);
        Istyping(false);
      });
  };

  const onMicPress = async () => {
    if (!recording) {
      // If not recording, start the speech recognition
      startSpeechRecognition();
      setRecording(true);
    } else {
      // If recording, stop the speech recognition
      await Voice.stop();
      setRecording(false);
    }
  };

  //end of sending message

  //load this states
  useEffect(() => {
    getUser();
    getPermission();
    chatHistory();

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
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
            color: '#ffffff',
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
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 10,
        }}
        icon={() => (
          <Image
            source={
              recording
                ? require('../assets/voiceLoading.gif')
                : require('../assets/recordingIcon.png')
            }
            style={{width: 40, height: 40}}
          />
        )}
        onPressActionButton={onMicPress}
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
        <Image source={require('../assets/79.jpg')} style={styles.image} />
        <Text style={styles.headerText}>Hello, {firstName}</Text>
    
        <View style={{marginLeft: wp(25)}}>
          
          <SmallBtn
            onPress={modal}
            btnLabel="Rate"
          />
        </View>

        <Pop
          visible={isModalVisible}
          label="Done"
          header="Rate the response of the AI"
          btnLabel='Done'
          body={
            <View className="flex justify-center items-center">
              <Image
                style={{marginBottom: 20, height: hp(12), width: wp(22)}}
                source={require('../assets/rating.png')}
              />
              <StarRating
                rating={rating}
                onChange={setRating}
                maxStars={5}
                starSize={45}
                enableHalfStar={false}
                enableSwiping={true}/>
            </View>
            
          }

          onPress={() => {
            sendRating();
          }}
        />
      </View>

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
        isTyping={typing}
        inverted={false}
        renderActions={renderActions}
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
    alignItems: 'center',
    paddingHorizontal: wp(4),
    backgroundColor: '#00A556',
    elevation: 4,
  },
  headerText: {
    fontSize: wp(5),
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp(1),
  },

  image: {
    width: wp(10),
    height: hp(5),
    marginRight: wp(2),
    marginTop: hp(1),
    marginBottom: hp(1),
    marginLeft: wp(10),
    borderRadius: wp(10),
  },

  lottieSmall: {
    position: 'absolute',
    bottom: 30,
    left: 35,
    width: 50,
    height: 70,
  },
});
