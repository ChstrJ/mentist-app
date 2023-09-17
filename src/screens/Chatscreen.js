import { View, Text } from 'react-native'
import React from 'react'

export default function Chatscreen() {
  return (
    <View>
      <Text>Chatscreen</Text>
    </View>
  )
}
// import React, {useState, useEffect} from 'react';
// import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
// import Voice from '@react-native-voice/voice';
// import styles from './styles';
// import Logo from './Logo';
// import Background from '../screens/Background';
// import { dummyMessages } from './dummy';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// function Chat() {

//     const [messages, setMessage] = (dummyMessages)
//   //   const [result, setResult] = useState('');
//   //   const [error, setError] = useState('');
//   //   const [isRecording, setIsRecording] = useState(false);

//   //   useEffect(() => {
//   //     Voice.onSpeechStart = () => setIsRecording(true);
//   //     Voice.onSpeechEnd = () => setIsRecording(false);
//   //     Voice.onSpeechError = (err) => setError(err.error);
//   //     Voice.onSpeechResults = (result) => setResult(result.value[0]);

//   //     return () => {
//   //       // Clean up the event listeners when the component unmounts
//   //       Voice.removeAllListeners();
//   //     };
//   //   }, []);

//   //   const startRecording = async () => {
//   //     try {
//   //       await Voice.start('en-GB');
//   //       console.log(result)
//   //     } catch (error) {
//   //       setError(error);
//   //       console.log(error)
//   //     }
//   //   };

//   //   const stopRecording = async () => {
//   //     try {
//   //       await Voice.stop();
//   //     } catch (error) {
//   //         console.log(error)
//   //       setError(error);
//   //     }
//   //   };

//   return (
//     <Background>
//     <View className="flex items-center justify-center mt-10">
//       <Logo />
      
//     </View>

//             <View className="items-center space-y-2 flex-1">
//               <Text className="text-white font-semibold ml-1" style={{fontSize: wp(5)}}>Assistant</Text>
//             <View
//             style={{height: wp(60)}}
//             className="bg-[#323e38]"
//             >
                
//             </View>



// //               </View>

          
         
        



//     </Background>
//   );
// }

// export default Chat;
