import React, { useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const GuidedMeditation = () => {

    const [clicked, setClicked] = useState(false);

    return (
        <ImageBackground source={require("../assets/meditationBack.png")} style={{height: 150, width: 150, justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity onPress={setClicked(!clicked)}>
                <AntDesign name="caretright" size={24} color="black" />
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default GuidedMeditation

const styles = StyleSheet.create({})
