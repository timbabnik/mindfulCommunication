import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { auth } from '../firebase';

const Login = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Send");
            }
        });

        return unsubscribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height" } style={{alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "white"}}>
            <Image source={require("../assets/loginBack.jpg")} style={{height: 200, width: 270}} />
            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" style={{borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 250, paddingVertical: 10, fontSize: 20, marginTop: 40}} />
            <TextInput onSubmitEditing={signIn} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry placeholder="Password" style={{borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 250, paddingVertical: 10, fontSize: 20, marginTop: 20}} />
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 60}}>
                <Pressable onPress={signIn} style={{width: 130, height: 60, backgroundColor: "#029C88", justifyContent: "center", alignItems: "center", marginRight: 5, borderRadius: 8}}>
                    <Text style={{color: "white", fontSize: 17}}>Login</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Register")} style={{width: 130, height: 60, backgroundColor: "transparent", borderColor: "#029C88", borderWidth: 1, justifyContent: "center", alignItems: "center", marginLeft: 5, borderRadius: 8}}>
                    <Text style={{color: "#029C88", fontSize: 17}}>Register</Text>
                </Pressable>
            </View>
            
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({})
