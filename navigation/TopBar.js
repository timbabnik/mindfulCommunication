import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Mindfulness from "../screens/Mindfulness"
import Meditation from '../screens/Meditation';
import Favorites from '../screens/Favorites';

const Tab = createMaterialTopTabNavigator();


const TopBar = () => {
    
    return (
        <Tab.Navigator screenOptions={{tabBarStyle: { backgroundColor: '#029C88', shadowOpacity: 0}, tabBarLabelStyle: { fontSize: 15 }, tabBarIndicatorStyle: {backgroundColor: "white"}, }}>
            <Tab.Screen name="Home" component={Mindfulness} options={{ tabBarActiveTintColor: "white"}}  />
            <Tab.Screen name="Meditation" component={Meditation} options={{ tabBarActiveTintColor: "white"}} />
            
        </Tab.Navigator>

    )
}

export default TopBar

const styles = StyleSheet.create({})
