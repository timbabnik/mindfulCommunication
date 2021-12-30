import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable, Button, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native'
import { db, auth } from '../firebase';

const Inspire = ({navigation, route}) => {

    const [message, setMessage] = useState("");
    
    const {id} = route.params;
    const {leaderButton} = route.params;

    // Create a message you want others to see when they finish their task
    const createMessage = async () => {
        await db
            .collection("groups")
            .doc(id)
            .collection("inspirationMessage")
            .add({
                msg: message,
            })

        navigation.navigate("Todo", {id, leaderButton});
        
        setMessage(null);
    }


    

    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Write",
            headerStyle: { backgroundColor: "#029C88" },
            headerTitleStyle: { color: "white"},
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
        })
    },[navigation])



    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{alignItems: "center", backgroundColor: "white", flex: 1}}>
            <Text style={{marginTop: 30, fontSize: 30, textAlign: "center", width: 310, textTransform: "uppercase"}}>10 seconds for your team</Text>
            <Text style={{marginTop: 10, color: "grey", fontSize: 14, width: "70%", textAlign: "center"}}>Write something nice, inspirational or funny. Take ten seconds of your time and make somebody´s day 😊</Text>
            <View style={{position: "absolute", bottom: 30, alignItems: "center"}}>
                <TextInput maxLength={40} onSubmitEditing={() => createMessage()} value={message} onChangeText={(text) => setMessage(text)} style={{fontSize: 15, borderBottomColor: "grey", borderBottomWidth: 1, paddingVertical: 10, width: 300}} placeholder="Write your mindful thought ..." />
                <Pressable onPress={() => createMessage()} style={{height: 60, width: 180, backgroundColor: "#029C88", justifyContent: "center", alignItems: "center", marginTop: 30, borderRadius: 8}}>
                    <Text style={{color: "white", fontSize: 15}}>Send </Text>
                </Pressable>
                <TouchableOpacity onPress={() => navigation.navigate("Todo", {id, leaderButton})} style={{marginTop: 15}}>
                    <Text style={{color: "black"}}>Skip</Text>
                </TouchableOpacity>
                
            </View>
            <StatusBar style="light" />
        </KeyboardAvoidingView>
    )
}

export default Inspire

const styles = StyleSheet.create({

})
