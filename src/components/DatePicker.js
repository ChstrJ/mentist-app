import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'


import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = () => {

    const [date, setdate] = useState(new Date()) 
    const [showMode, setshowMode] = useState(false)
    

  return (
    <View>
      <Text>DatePicker</Text>
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({})