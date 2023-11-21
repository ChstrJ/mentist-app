import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TextInput, Text} from 'react-native-paper';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {styles} from './styles';


const Paper = ({label, icon, onChangeText, errors, touched, ...children}) => {



  return (
    <View>
      <TextInput
        style={[{width: widthPercentageToDP(80)}, styles.fontField]}
        className="flex w-4/5 mt-5 rounded-xl"
        label={label}
        mode="outlined"
        activeOutlineColor="green"
        left={<TextInput.Icon icon={icon} />}
        onChangeText={onChangeText}
        {...children}
      />
      
      <View style={{position: 'absolute', top: '100%', right: 0}}>
      {touched && errors && (<Text style={styles.errorTxt}>{errors}</Text>)}
      </View>


      
    </View>
  );
};

export default Paper;
