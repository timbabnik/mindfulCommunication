import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

const ShareContent = (props) => {

    const {image, title} = props.list; 

    return (
        <ImageBackground source={image} style={{height: 200, width: 180, marginHorizontal: 10}} imageStyle={{borderRadius: 20}}>
           
        </ImageBackground>
    )
}

export default ShareContent

const styles = StyleSheet.create({})
