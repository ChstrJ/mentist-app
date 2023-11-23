import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TextInput, Text, useTheme} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {styles} from './styles';
import { s } from 'react-native-size-matters';


const Paper = ({label, icon, onChangeText, errors, touched, ...children}) => {
const theme = useTheme()


  return (
    <View>
      <TextInput
        style={[{width: s(290)}, styles.fontField,]}
        className="flex mt-5"
        label={label}
        mode="outlined"
        activeOutlineColor="green"
        left={<TextInput.Icon icon={icon} />}
        onChangeText={onChangeText}
        outlineStyle={{borderRadius: 13}}
        {...children}
      />
      
      <View style={{position: 'absolute', top: '100%', right: 0}}>
      {touched && errors && (<Text style={styles.errorTxt}>{errors}</Text>)}
      </View>


      
    </View>
  );
};

export default Paper;
