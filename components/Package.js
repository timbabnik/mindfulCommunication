import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'

const Package = ({contentPackage, imagePackage}) => {

    

    return (
        <View style={{flexDirection: "row", alignItems: "center", width: Dimensions.get("screen").width }}>
            <Image source={{ uri: imagePackage}} style={{height: 207, width: 126, marginHorizontal: 30}} />
            <Text style={{width: 160, marginHorizontal: 10, color: "#fff", fontSize: 15}}>{contentPackage}</Text>
        </View>
    )
}

export default Package

const styles = StyleSheet.create({})
