import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading({ isVisible, text }) {
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgoundColor = "rgba(0,0,0,0.5)"
            overlayBackgroundColor = "transparent"
            overlayStyle={styles.overlay}
            >
            <View style={styles.view}>
                <ActivityIndicator
                    size="large"
                    color="#241c24"
                />
                {
                    text && <Text style={styles.text}>{text}</Text>
                }
            </View>

        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay : {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#241c24",
        borderWidth: 2,
        borderRadius: 10
    },

    view : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    },

    text : {
        color : "#241c24",
        marginTop : 10
    }
})
