import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const Leader = ({leaderText, onPress, onPressTwo}) => {
    
    return (
        <TouchableOpacity onPress={onPress} style={{backgroundColor: "white", padding: 20, marginTop: 15, borderRadius: 10, flexDirection: "row", alignItems: "center", marginVertical: 10, justifyContent: "space-between", borderColor: "blue", borderWidth: 1}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{height: 20, width: 20, backgroundColor: "blue", borderRadius: 10}} />
                <Text style={{marginLeft: 10}}>{leaderText}</Text>
            </View>
            <Pressable onPress={onPressTwo}>
                <MaterialIcons name="cancel" size={30} color="black" />
            </Pressable>
        </TouchableOpacity>
    )
}

export default Leader

const styles = StyleSheet.create({})
