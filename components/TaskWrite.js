import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Task = ({taskText}) => {


    return (
        <TouchableOpacity onPress={() => setClicked(!clicked)} style={{backgroundColor: "white", padding: 17, marginTop: 15, borderRadius: 10, flexDirection: "row", alignItems: "center", marginVertical: 10}}>
            <View style={{height: 20, width: 20, backgroundColor: "grey", borderRadius: 10}} />
            <TextInput style={{paddingHorizontal: 10}} placeholder="Write your task" /> 
        </TouchableOpacity>
    )
}

export default Task

const styles = StyleSheet.create({})