import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { widthPercentageToDP  as wp} from 'react-native-responsive-screen'

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.CardContent}>
        {props.children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        elevation: 10,
        backgroundColor: '#fff',
        shadowColor: "#333",
        shadowOpacity: 5,
        shadowRadius: 3,
        marginHorizontal: 15,
        marginVertical: 5,
        width: wp(95)
    },
    CardContent: {
        marginHorizontal : 10,
        marginVertical: 10,
        
    }
})