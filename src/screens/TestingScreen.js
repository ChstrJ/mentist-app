import {StyleSheet, Text, View, Image, Button} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import Paper from '../components/Paper';
import {SignupSchema, initialValue} from '../components/Validation/Validation';

export default function TestingScreen() {
  const [firstname, setFirstName] = useState('');

  const handleSubmit = () => {
    console.log(firstname);
  };

  return (
    <View className="flex items-center justify-center">
      <Formik
        initialValues={initialValue}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}>
        <Paper
          label={'First Name'}
          icon={'account'}
          value={firstname}
          onChangeText={values => setFirstName(values)}
        />

        <Button onPress={handleSubmit} title="Submit" />
      </Formik>
    </View>
  );
}
