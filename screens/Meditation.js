import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Animated, Button, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Stressrelief from '../components/Stressrelief'
import datafour from './datafour'
import datathree from './datathree'
import datatwo from './datatwo'

const Meditation = ({navigation}) => {


    return (
        <ScrollView style={{paddingVertical: 20, flex: 1, backgroundColor: "#2C4D37"}}>
            <View>
                <View style={{backgroundColor: "#029C88", width: 150, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 10, marginLeft: 10, marginTop: 10}}>
                    <Text style={{color: "#fff", fontSize: 20}}>Stress Relief</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <FlatList 
                        horizontal
                        data={datatwo}
                        renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate("Play")}><Stressrelief list={item} /></TouchableOpacity>}
                        showsHorizontalScrollIndicator={false}
                        style={{marginTop: 20}}
                    />
                </View>
            </View>
            <View style={{marginTop: 50}}>
                <View style={{backgroundColor: "#029C88", width: 150, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 10, marginLeft: 10}}>
                    <Text style={{color: "#fff", fontSize: 20}}>Happiness</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <FlatList 
                            horizontal
                            data={datathree}
                            renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate("Play")}><Stressrelief list={item} /></TouchableOpacity>}
                            showsHorizontalScrollIndicator={false}
                            style={{marginTop: 20}}
                    />
                </View>
            </View>
            <View style={{marginTop: 50}}>
                <View style={{backgroundColor: "#029C88", width: 150, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 10, marginLeft: 10}}>
                    <Text style={{color: "#fff", fontSize: 20}}>Deep Focus</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <FlatList 
                                horizontal
                                data={datafour}
                                renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate("Play")}><Stressrelief list={item} /></TouchableOpacity>}
                                showsHorizontalScrollIndicator={false}
                                style={{marginTop: 20}}
                    />
                </View>
            </View>
            <View style={{height: 120}} />
        </ScrollView>
    )
}

export default Meditation

const styles = StyleSheet.create({})
