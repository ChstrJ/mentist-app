import React from 'react';
import { View, Text } from 'react-native';
import { AlertNotificationDialog } from 'react-native-alert-notification';

const PopupSuccess = ({ visible, title, message, onClose }) => {
  return (
    <AlertNotificationDialog
      title={title}
      message={message}
      visible={visible}
      onRequestClose={onClose}
      type="success" // You can set the type of the modal (info, success, warning, error, or custom)
    >
      {/* Add any custom content or styles here */}
      <View>
        <Text>Additional content or custom styles can be added here.</Text>
      </View>
    </AlertNotificationDialog>
  );
};

export default PopupSuccess;
