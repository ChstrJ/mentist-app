import {View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {TextInput, Text} from 'react-native-paper';
import Logo from '../components/Logo';
import styles from '../components/styles';

export default function Appointment() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <View
          className="flex items-center justify-center mt-10"
          style={styles.CenterContainer}>
          <Logo />

          <View className="mt-2">

            <Text className="text-center flex text-xl">
                Create Appointment
            </Text>
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
              left={<TextInput.Icon icon={'phone'} />}
              outlineColor="green"
              activeOutlineColor="green"
            />
          </View>
        </View>
      </Background>
    </SafeAreaView>
  );
}
