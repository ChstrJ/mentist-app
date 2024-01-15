import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import Background from './Background';
import BackButton from '../components/BackButton';
import {RadioButton} from 'react-native-paper';
import {styles} from '../components/styles';
import {useNavigation} from '@react-navigation/native';
import Btn from '../components/Btn';
import BtnOutline from '../components/BtnOutline';
import {callApi} from '../helper/callApi';

function Mental() {
  const navigation = useNavigation();
  const [likertValue, setLikertValue] = useState();

  const handleLikertChange = value => {
    setLikertValue(value);
  };

  const sendMood = async () => {
    const rate = {
      rate: likertValue,
    };

    await callApi('post', '/chat/rate', rate)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => console.log(e));
  };

  const handleMood = () => {
    const mood = likertValue;

    if (mood >= 7) {
      sendMood(mood);
      navigation.push('Appointment');
      Alert.alert('Oh no!', 'Please book an appointment now');
    } else {
      sendMood(mood);
      Alert.alert('Good day!', 'I hope you are having a great time.');
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <Background>
        <BackButton goBack={navigation.goBack} />

        <View className="p-4">
          <Text style={styles.fontSub} className="mt-10 flex text-center">
            On a scale of 1-10, how are you feeling today?
          </Text>

          <View className="flex-row justify-center mt-5 items-center">
            <RadioButton.Group
              onValueChange={handleLikertChange}
              value={likertValue}>
              <View className="flex">
                <View className="flex">
                  <RadioButton.Item
                    label="Optimistic (1)"
                    value="1"
                    color="green"
                  />
                </View>
              </View>

              <RadioButton.Item label="Energetic (2)" value="2" color="green" />

              <RadioButton.Item label="Happy (3)" value="3" color="green" />

              <RadioButton.Item label="Content (4)" value="4" color="green" />

              <RadioButton.Item label="Neutral (5)" value="5" color="green" />

              <RadioButton.Item label="Sad (6)" value="6" color="green" />

              <RadioButton.Item label="Stressed (7)" value="7" color="green" />

              <RadioButton.Item label="Anxious (8)" value="8" color="green" />

              <RadioButton.Item label="Depressed (9)" value="9" color="green" />

              <RadioButton.Item
                label="Despairing (10)"
                value="10"
                color="green"
              />
            </RadioButton.Group>
          </View>

          <View className="flex justify-center items-center">
            <BtnOutline btnLabel={'Confirm'} onPress={() => handleMood()} />
          </View>
        </View>
      </Background>
    </ScrollView>
  );
}

export default Mental;
