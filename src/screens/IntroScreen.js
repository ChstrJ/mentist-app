import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const IntroScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('home');
  };

  return (
    <SafeAreaView className="" style={styles.container}>
      <Onboarding onDone={handleDone} onSkip={handleDone}
        pages={[
          {
            backgroundColor: '#8BFFAE',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../assets/animations/animation1.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Your Mental Health is a Priority',
            subtitle: 'Compassion, Support, and Empowerment',
          },
          {
            backgroundColor: '#8FFFF3',
            image: (
              <View>
                <LottieView
                  source={require('../assets/animations/animation2.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Your Mind Matters',
            subtitle: 'Embracing Wellness and Nurturing Minds',
          },
          {
            backgroundColor: '#7BFEAC',
            image: (
              <View>
                <LottieView
                  source={require('../assets/animations/animation3.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Healing from Within',
            subtitle: 'Building Communities of Acceptance and Empathy',
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
  lottie: {
    width: width * 0.9,
    height: width,
  },
});
