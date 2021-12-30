import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

const Fivemin = (props) => {

    const {image, title} = props.list; 

    return (
        <ImageBackground source={image} style={{height: 300, width: 180, marginHorizontal: 10}} imageStyle={{borderRadius: 20}}>
            <Text style={{color: "#fff", fontSize: 17, width: 150, padding: 10, position: "absolute", top: 230, fontWeight: "500"}}>{title}</Text>
        </ImageBackground>
    )
}

export default Fivemin

const styles = StyleSheet.create({})
