import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDo from '../screens/ToDo';
import Mindfulness from "../screens/Mindfulness"
import Login from '../screens/Login';
import Register from '../screens/Register';
import Send from '../screens/Send';
import LeaderMsg from '../screens/LeaderMsg';
import TopBar from './TopBar';

const Stack = createNativeStackNavigator();

const Router = () => {

    const globalScreenOptions = {
        headerStyle: { backgroundColor: "#029C88" },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
        headerShadowVisible: false
      }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={globalScreenOptions}>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="Register" component={Register} options={{headerShown: true}} />
                <Stack.Screen name="Send" component={Send} options={{headerShown: true}} />
                <Stack.Screen name="Todo" component={ToDo} />
                <Stack.Screen name="Mindful" component={TopBar} options={{title: "", headerBackTitle: "Back"}} />
                <Stack.Screen name="Leader" component={LeaderMsg} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router

const styles = StyleSheet.create({})
