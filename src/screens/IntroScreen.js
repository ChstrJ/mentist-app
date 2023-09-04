import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const IntroScreen = () => {
  const navigation = useNavigation();



  const handleDone = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView className="" style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        pages={[
          {
            backgroundColor: '#8BFFAE',
            image: (
              <View>
                <LottieView
                  autoPlay
                  loop
                  speed={1}
                  style={styles.lottie}
                  source={require('../assets/animations/animation1.json')}
                />
              </View>
            ),
            title: 'Your Mental Health is a Priority',
            subtitle: 'Compassion, Support, and Empowerment',
          },
          {
            backgroundColor: '#8FFFF3',
            image: (
              <View className="flex justify-center items-center mr-7">
                <LottieView
                  autoPlay
                  loop
                  speed={1}
                  style={styles.lottie}
                  source={require('../assets/animations/animation2.json')}
                />
              </View>
            ),
            title: 'Your Mind Matters',
            subtitle: 'Embracing Wellness and Nurturing Minds',
          },
          {
            backgroundColor: '#7BFEAC',
            image: (
              <View className="flex justify-center items-center ml-11">
                <LottieView
                  style={styles.lottie}
                  speed={1}
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
    height: 400,
    width: 400,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  

});
