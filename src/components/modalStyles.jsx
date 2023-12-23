import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
export default styles = StyleSheet.create({
    centerView: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 0
    }, 
    modalView: {
        height: hp(55), 
        width: wp(80),
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderColor: '#000', 
        borderRadius: 20,  
        display: 'flex',
        flexDirection: 'column', 
        padding: 0,
        justifyContent: 'space-between', 
        // alignItems: 'center'
        paddingBottom: 20
    }, 
    modalTitle: {
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 10
    },
    modalTitleText: {
        fontSize: 30,
        color: 'black', 
        fontWeight: 'bold'
    }, 
    modalMessageContainer: {
        display: 'flex', 
        alignItems: 'start', 
        justifyContent: 'center', 
        paddingLeft: 20, 
        paddingTop: 10
    },
    modalMessage: {
        fontSize: 19, 
        // textAlign: 'right',
        color: 'black', 
        lineHeight: 20, 
        padding: 0, 
        includeFontPadding: false
        // letterSpacing: 10
    }, 
    modalTextMessageContainer: {
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    modalTextMessage: {
        fontSize: 19, 
        // textAlign: 'right',
        color: 'black', 
        lineHeight: 20, 
        padding: 0, 
        includeFontPadding: false, 

    },
    modalAction: {
        color: '#000', 
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        alignItems: 'end', 
        
        // alignItems: 'center'
    }, 
    modalActionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end', 
        // position: 'relative', 
        // bottom: 0, 

    }

})