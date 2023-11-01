import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';

const TestingBtn = () => {
  useEffect(() => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Congrats! this is dialog box success',
      button: 'Close',
    });
  }, []);

  return (
    <AlertNotificationRoot>
      <View>
        {/* Your component content */}
      </View>
    </AlertNotificationRoot>
  );
}

export default TestingBtn;

const styles = StyleSheet.create({});
