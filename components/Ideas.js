import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Ideas = ({newIdeas, iconIdea, iconColor}) => {
    return (
        <View style={{flexDirection: "row", alignItems: "center", width: Dimensions.get("screen").width, justifyContent: "center" }}>
           
            
            <Text style={{maxWidth: 200, marginHorizontal: 10, color: "black", fontSize: 15}}>{newIdeas}</Text>
            <View style={{height: 40, width: 40, justifyContent: "center", alignItems: "center", backgroundColor: iconColor,  borderRadius: 30}}>
                <FontAwesome name={iconIdea} size={24} color="white" />
            </View>
            
        </View>
    )
}

export default Ideas

const styles = StyleSheet.create({})
