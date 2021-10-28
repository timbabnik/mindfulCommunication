import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable, Button, KeyboardAvoidingView, Platform } from 'react-native'
import { db, auth } from '../firebase';

const Send = ({navigation}) => {

    const [message, setMessage] = useState("");

    const createMessage = async () => {
        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("messages")
            .add({
                messages: message,
            })

        navigation.navigate("Todo");
        
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
            <Text style={{marginTop: 200, fontSize: 30}}>Write something nice</Text>
            <TextInput autoFocus onSubmitEditing={() => navigation.navigate("Todo", {message})} value={message} onChangeText={(text) => setMessage(text)} style={{marginTop: 30, fontSize: 20, borderBottomColor: "grey", borderBottomWidth: 1, paddingVertical: 10}} placeholder="Write your mindful thought ..." />
            <Pressable onPress={() => navigation.navigate("Todo", {message})} style={{height: 60, width: 180, backgroundColor: "#029C88", justifyContent: "center", alignItems: "center", marginTop: 130, borderRadius: 8}}>
                <Text style={{color: "white", fontSize: 15}}>Send </Text>
            </Pressable>
            <StatusBar style="light" />
        </KeyboardAvoidingView>
    )
}

export default Send

const styles = StyleSheet.create({

})
