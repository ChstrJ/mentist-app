import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {s} from 'react-native-size-matters';
import { styles } from './styles'; 

const Articles = ({imageUri, text, link}) => {
  return (
    <View>

      <TouchableOpacity onPress={() => Linking.openURL(link)}>
        <View
          style={{
            height: s(180),
            width: s(150),
            marginLeft: 20,
            borderWidth: 0.5,
            borderColor: '#dddddd',
            paddingBottom: 15,
          }}>
          <View style={{flex: 4}}>
            <Image
              source={imageUri}
              style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}
            />
          </View>

          <View className="flex-1 p-2 text-center w-max">
            <Text style={styles.fontArticles} numberOfLines={25} ellipsizeMode="tail">
              {text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Articles;
