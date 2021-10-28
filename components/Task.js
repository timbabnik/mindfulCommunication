import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Task = ({taskText, onPress, color, descText}) => {

    const [clicked, setClicked] = useState(true);

    

    return (
        <TouchableOpacity onPress={() => setClicked(!clicked)} style={{backgroundColor: "white", padding: 17, marginTop: 10, borderRadius: 10, flexDirection: "row", alignItems: "center", marginVertical: 10, justifyContent: "space-between"}}>
            <View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    {
                        clicked ? (
                            <View style={{height: 20, width: 20, backgroundColor: color, borderRadius: 10}} />
                        ) : <AntDesign name="checkcircle" size={20} color="green" />
                    }
                    
                    <Text style={{marginLeft: 10, fontSize: 15}}>{taskText}</Text>
                </View>
                <Text style={{marginLeft: 30, color: "grey", fontSize: 13}}>{descText}</Text>
            </View>
            <Pressable onPress={onPress}>
                <MaterialIcons name="cancel" size={30} color="black" />
            </Pressable>
        </TouchableOpacity>
    )
}

export default Task

const styles = StyleSheet.create({})
