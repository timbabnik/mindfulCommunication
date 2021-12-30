import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDo from '../screens/ToDo';
import Mindfulness from "../screens/Mindfulness"
import Login from '../screens/Login';
import Register from '../screens/Register';
import Inspire from "../screens/Inspire"
import LeaderMsg from '../screens/LeaderMsg';
import TopBar from './TopBar';
import Groups from '../screens/Groups';
import MeditationPlay from '../screens/MeditationPlay';
import MindfulPlace from "../screens/MindfulPlace"
import { Octicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const Router = ({navigation}) => {

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
                <Stack.Screen name="Inspire" component={Inspire} options={{headerShown: true}} />
                <Stack.Screen name="Todo" component={ToDo} options={{headerShown: true}}/>
                <Stack.Screen name="Mindful" component={TopBar} options={{title: "", headerBackTitle: "Back"}} />
                <Stack.Screen name="Leader" component={LeaderMsg} />
                <Stack.Screen name="Groups" component={Groups} />
                <Stack.Screen name="Play" component={MeditationPlay} />
                <Stack.Screen name="MindfulPlace" component={MindfulPlace} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router

const styles = StyleSheet.create({})
