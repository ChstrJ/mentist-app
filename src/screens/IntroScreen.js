import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Onboarding from 'react-native-onboarding-swiper';


const IntroScreen = () => {
  return (
    <SafeAreaView className="" style={styles.container}>
      <Onboarding
        pages={[
          {
            backgroundColor: '#8FFFB8',
            image: (
              <View>
                <Text></Text>
              </View>
            ),
            title: 'Your Mental Health is a Priority',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#8FFFF3',
            image: (
              <View>
                <Text>ASDASD</Text>
              </View>
            ),
            title: 'Your Mind Matters',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#C9FF8F',
            image: (
              <View>
                <Text>ASDASD</Text>
              </View>
            ),
            title: 'Your Mind Matters',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
