import {View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView, Platform} from 'react-native';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {TextInput, Text} from 'react-native-paper';
import Logo from '../components/Logo';
import styles from '../components/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Appointment() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [showMode, setshowMode] = useState(false);

  const toggleMode = () => {
    setshowMode(!showMode)
  }

  const onChange = ({type}, selectedDate) => {
    if (type == "set") {
        const currentDate = selectedDate
        setDate(currentDate)

        if (Platform.OS === 'android') {
            toggleMode()
            setDate(currentDate.toDateString())
            
        }

    } else {
        toggleMode()
    }
  }

  return (
    <SafeAreaView>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <View
          className="flex items-center justify-center mt-10"
          style={styles.CenterContainer}>
          <Logo />

          <View className="mt-2">
            <Text className="text-center flex text-xl">Create Appointment</Text>
            <TextInput
              className="w-[400] mt-3 rounded-md"
              mode="focused"
              label="Full Name"
              left={<TextInput.Icon icon={'account'} />}
              outlineColor="green"
              activeOutlineColor="green"
            />

            <TextInput
              className="w-[400] mt-3 rounded-md"
              mode="focused"
              label="Phone Number"
              keyboardType = 'numeric'
              maxLength={11}
              left={<TextInput.Icon icon={'phone'} />}
              outlineColor="green"
              activeOutlineColor="green"
            />

           
            
            {showMode && (
                <DateTimePicker
                mode='date'
                display='spinner'
                value={date}>
                onChange={onChange}
                </DateTimePicker>
            )}

            {!showMode && (
                <Pressable
            onPress={toggleMode}
            >
            <TextInput
              className="w-[400] mt-3 rounded-md"
              mode="focused"
              label="Date"
              left={<TextInput.Icon icon={'calendar'} />}
              outlineColor="green"
              onChangeText={setDate}
              activeOutlineColor="green"
              editable={false}
            />
            </Pressable>
            )}

            
           
            
            {showMode && (
                <DateTimePicker
                mode='time'
                display='spinner'
                value={date}>
                onChange={onChange}
                </DateTimePicker>
            )}

            {!showMode && (
                <Pressable
            onPress={toggleMode}
            >
            <TextInput
              className="w-[400] mt-3 rounded-md"
              mode="focused"
              label="Time"
              left={<TextInput.Icon icon={'calendar'} />}
              outlineColor="green"
              onChangeText={setDate}
              activeOutlineColor="green"
              editable={false}
            />
            </Pressable>
            )}

            
          </View>
        </View>
      </Background>
    </SafeAreaView>
  );
}
