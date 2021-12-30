import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

const Stressrelief = (props) => {

    const {image, title} = props.list; 

    return (
        <ImageBackground source={image} style={{height: 260, width: 180, marginHorizontal: 10}} imageStyle={{borderRadius: 20}}>
            <Text style={{color: "#fff", fontSize: 17, width: 150, padding: 10, position: "absolute", top: 185, fontWeight: "500"}}>{title}</Text>
        </ImageBackground>
    )
}

export default Stressrelief

const styles = StyleSheet.create({})