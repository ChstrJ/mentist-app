import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../components/styles';
import Card from '../components/Card';
import Articles from '../components/Articles';
import { s } from 'react-native-size-matters';

export default function Wellbeing() {
  const navigation = useNavigation();
  return (
    <View className=" pb-24">
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Dashboard')} />
        <Appbar.Content title="Wellbeing" />
      </Appbar.Header>
      <ScrollView
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        <View className="pt-10 justify-center items-center">
          <Text style={[{}, styles.fontProgress]}>
            Explore About Mental Health
          </Text>
        </View>

        <View
        
          style={{
            height: 220,
            marginTop: 15,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
           
          }}>
          <Text style={styles.fontProgressSub}>Coping Strategies</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Articles
              imageUri={require('../assets/image1.png')}
              text={'Support someone with a mental health problem'}
              link={
                'https://www.mentalhealth.org.uk/explore-mental-health/articles/how-support-someone-mental-health-problem'
              }
            />
            <Articles
              imageUri={require('../assets/image3.jpg')}
              text={'Caring for Your Mental Health'}
              link={'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health'}
            />
            <Articles
              imageUri={require('../assets/image2.jpg')}
              text={'Helping a Loved One Cope with Mental Illness'}
              link={'https://www.psychiatry.org/patients-families/helping-a-loved-one-cope-with-mental-illness'}
            />
            

            
          </ScrollView>
        </View>

        <View
          style={{
            height: 220,
            marginTop: 15,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
           
          }}>
          <Text style={styles.fontProgressSub}>Study Habits</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Articles
              imageUri={require('../assets/image1.png')}
              text={'support someone with a mental health problem'}
              link={
                'https://www.mentalhealth.org.uk/explore-mental-health/articles/how-support-someone-mental-health-problem'
              }
            />
            <Articles
              imageUri={require('../assets/image3.jpg')}
              text={'Caring for Your Mental Health'}
              link={'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health'}
            />
            <Articles
              imageUri={require('../assets/image2.jpg')}
              text={'Helping a Loved One Cope with Mental Illness'}
              link={'https://www.psychiatry.org/patients-families/helping-a-loved-one-cope-with-mental-illness'}
            />
            

            
          </ScrollView>
        </View>


        <View
    
          style={{
            height: 220,
            marginTop: 15,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
           
          }}>
          <Text style={styles.fontProgressSub}>How to beat anxiety</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Articles
              imageUri={require('../assets/image1.png')}
              text={'support someone with a mental health problem'}
              link={
                'https://www.mentalhealth.org.uk/explore-mental-health/articles/how-support-someone-mental-health-problem'
              }
            />
            <Articles
              imageUri={require('../assets/image3.jpg')}
              text={'Caring for Your Mental Health'}
              link={'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health'}
            />
            <Articles
              imageUri={require('../assets/image2.jpg')}
              text={'Helping a Loved One Cope with Mental Illness'}
              link={'https://www.psychiatry.org/patients-families/helping-a-loved-one-cope-with-mental-illness'}
            />
            

            
          </ScrollView>
        </View>


       
       
       
      </ScrollView>
    </View>
  );
}
