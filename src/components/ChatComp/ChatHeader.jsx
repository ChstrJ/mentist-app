import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import theme from '../../core/theme'
import Icon from 'react-native-vector-icons/FontAwesome6'

export default function ChatHeader({ username, bio, picture, onlineStatus, onPress }) {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.barsButton}>
                <Icon name="bars" size={30} color={theme.colors.white}/>
        </TouchableOpacity>
        <View style={styles.profile}>
            <Image style={styles.image} source={picture} />
            <View style={styles.usernameAndOnlineStatus}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.onlineStatus}>{onlineStatus}</Text>
            </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.primary, 
        paddingTop: 50, 
        paddingBottom: 25
    }, 
    barsButton: {
        alignSelf: 'center', 
        paddingHorizontal: 10
    }, 
    profileAndOptions: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        flex: 1, 
        alignItems: 'center', 
        paddingHorizontal: 10
    }, 
    profile: {
        flexDirection: 'row', 
        flex: 4
    }, 
    image: {
        height: 65, 
        width: 65, 
        borderRadius: 32.5, 
    }, 
    usernameAndOnlineStatus: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        paddingHorizontal: 10
    }, 
    username: {
        color: theme.colors.white, 
        fontSize: 20
    }
})