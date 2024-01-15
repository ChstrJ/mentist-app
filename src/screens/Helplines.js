import {StyleSheet, Text, View, ScrollView, Image, Linking} from 'react-native';
import React from 'react';
import Card from '../components/Card';
import HelplinePic from '../assets/psych.svg';
import {styles as styles2} from '../components/styles';
import Background from './Background';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {s} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';

const Helplines = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Background>
        <BackButton goBack={navigation.goBack} />

        <View className=" flex items-center mt-5">
          <HelplinePic width={250} height={250} />
        </View>

        <View style={{alignItems: 'center', marginBottom: s(10)}}>
          <Text style={styles2.fontHomeSub}>Contact Helplines </Text>
        </View>

        {/* Wrapper for all cards */}
        <View style={{alignItems: 'center'}}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardImage}
              source={require('../assets/doh.png')}
            />
            <View style={styles.cardContent}>
              <Text selectable={true} style={styles.cardTitle}>
                NCMH Crisis Hotline
              </Text>
              <View style={styles.cardDetails}>
                <Icon name="phone" size={30} style={styles.cardIcon} />
                <Text selectable={true} style={styles.cardText}>
                  1553 (Luzon-wide)
                </Text>
              </View>

              <View style={styles.cardDetails}>
                <Icon name="mobile" size={35} style={styles.cardPhone} />
                <View className="flex-col ml-3">
                  <Text
                    selectable={true}
                    style={styles.cardText}
                    onPress={() => {
                      Linking.openURL('09663514518');
                    }}>
                    {'0966-351-4518'}
                  </Text>

                  <Text
                    selectable={true}
                    style={styles.cardText}
                    onPress={() => {
                      Linking.openURL('09086392672');
                    }}>
                    {'0908-639-2672\n'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Image
              style={styles.cardImage}
              source={require('../assets/pgh.jpg')}
            />
            <View style={styles.cardContent}>
              <Text selectable={true} style={styles.cardTitle}>
                PGH Psychiatry and Behavioral Medicine Department
              </Text>
              <View>
                <View style={styles.cardDetails}>
                  <Icon name="phone" size={30} style={styles.cardIcon} />
                  <Text selectable={true} style={styles.cardText}>
                    (02) 554-8400
                    {'\n'}
                    (02) 8554-88470
                    {'\n'}
                    (02) 8526-0150
                    {'\n'}
                    (02) 554-8469
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Image
              style={styles.cardImage}
              source={require('../assets/amang.jpg')}
            />
            <View style={styles.cardContent}>
              <Text selectable={true} style={styles.cardTitle}>
                Amang Rodriguez Memorial Medical Center OPD Acute Psychiatric
                Unit
              </Text>
              <View style={styles.cardDetails}>
                <Icon name="phone" size={30} style={styles.cardIcon} />
                <Text selectable={true} style={styles.cardText}>
                  (02) 8941 5854
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Image
              style={styles.cardImage}
              source={require('../assets/hopeline.jpg')}
            />
            <View style={styles.cardContent}>
              <Text selectable={true} style={styles.cardTitle}>
                HopeLine
              </Text>
              <View style={styles.cardDetails}>
                <Icon name="mobile" size={35} style={styles.cardPhone} />
                <Text selectable={true} style={styles.cardText}>
                  {'   0918-873-4673\n   0917-558-4673'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: s(5),
    padding: s(10),
    backgroundColor: '#fff',
    borderRadius: s(10),
    width: '90%',
    marginBottom: s(10),
    elevation: 4,
  },
  cardImage: {
    height: s(75),
    width: s(75),
    marginHorizontal: s(10),
  },
  cardContent: {
    flex: 1,
    marginLeft: s(10),
  },
  cardTitle: {
    color: '#333333',
    flex: 1,
    fontSize: s(14),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: s(5),
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: s(5),
    color: 'black',
  },

  cardPhone: {
    marginLeft: s(5),
    color: 'black',
  },
  cardText: {
    marginTop: 3,
    fontSize: s(14),
    marginLeft: s(5),
    color: '#555',
  },
});

export default Helplines;
