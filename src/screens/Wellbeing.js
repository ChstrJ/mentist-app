import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export default function Wellbeing() {

    const navigation = useNavigation()
  return (
    <View>
      <ScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.navigate('Dashboard')} />
          <Appbar.Content title="Wellbeing" />
        </Appbar.Header>


        
      </ScrollView>
    </View>
  );
}
