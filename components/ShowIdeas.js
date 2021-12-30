import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Ideas = ({newIdeas, iconIdea, iconColor}) => {
    return (
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", height: 70, width: 350, borderRadius: 20, marginVertical: 10, padding: 10 }}>
           
            
            <Text style={{maxWidth: "90%", marginHorizontal: 10, color: "black", fontSize: 13}}>{newIdeas}</Text>
            <View style={{height: 30, width: 30, justifyContent: "center", alignItems: "center", backgroundColor: iconColor,  borderRadius: 30}}>
                <FontAwesome name={iconIdea} size={20} color="white" />
            </View>
            
        </View>
    )
}

export default Ideas

const styles = StyleSheet.create({})
