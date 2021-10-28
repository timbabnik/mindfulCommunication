import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase';

const Register = ({navigation}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
            });
        })
        .catch((error) => alert(error.message))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Today´s tasks",
            headerStyle: { backgroundColor: "#029C88" },
            headerTitleStyle: { color: "white"},
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
        })
    },[navigation])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height" } style={{justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "#fff"}}>
            <Text style={{fontSize: 30}}>Create your account</Text>
            <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Full Name" style={{borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 250, paddingVertical: 10, fontSize: 20, marginTop: 100}} />
            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" style={{borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 250, paddingVertical: 10, fontSize: 20, marginTop: 20}} />
            <TextInput secureTextEntry value={password} onChangeText={(text) => setPassword(text)} placeholder="Password" style={{borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 250, paddingVertical: 10, fontSize: 20, marginTop: 20}} />
            <Pressable onPress={register} style={{width: 180, height: 60, backgroundColor: "#029C88", justifyContent: "center", alignItems: "center", marginTop: 40}}>
                <Text style={{color: "white", fontSize: 17}}>Register</Text>
            </Pressable>
            <StatusBar style="light" />
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({})
