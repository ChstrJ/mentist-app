import {View, Text, Button, PermissionsAndroid, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Voice from '@react-native-voice/voice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Speech() {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechResults = onSpeechResults;
    
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    setStarted('√');
  };

  const onSpeechRecognized = (e) => {
    setRecognized('√');
  };

  const onSpeechResults = (e) => {
    setResults(e.value);
  };

  const startSpeechRecognition = async (e) => {
    try {
      await Voice.start('en-US');
      console.log(e)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black', fontSize: 30}}>Speech Recognition</Text>
      <Button title="Start" onPress={startSpeechRecognition} />
      <Text style={{color: 'black', fontSize: 30}}>Started: {started}</Text>
      <Text style={{color: 'black', fontSize: 30}}>Recognized: {recognized}</Text> 
      <Text style={{color: 'black', fontSize: 30}}>Results:</Text>
      {results.map((result, index) => (
        <Text style={{color: 'black', fontSize: 30}} key={`result-${index}`}>{result}</Text>
      ))}
    </View>
  );
};

