import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ViewPropTypes, TextPropTypes } from 'react-native'
import PropTypes from 'prop-types'

const Button = ({ text = "Button", buttonCustomStyles, textCustomStyles, onClick }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonCustomStyles]} onPress={onClick}>
            <Text style={[styles.text, textCustomStyles]} numberOfLines={1}>
                {text}
            </Text>
            <View style={[
                styles.buttonShadow,
                { backgroundColor: buttonCustomStyles?.backgroundColor, borderRadius: buttonCustomStyles?.borderRadius }
            ]} />
        </TouchableOpacity>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    buttonCustomStyles: ViewPropTypes?.style,
    textCustomStyles: TextPropTypes?.style,
    onClick: PropTypes.func
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 40,
        borderRadius: 5,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    buttonShadow: {
        width: 200,
        height: 40,
        borderRadius: 5,
        position: "absolute",
        opacity: .4,
        bottom: -3,
        right: -3,
        zIndex: -1
    },
    text: {
        fontWeight: "500",
        padding: 3
    },
})

export default Button