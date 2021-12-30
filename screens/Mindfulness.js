import React, { useLayoutEffect, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import GuidedMeditation from '../components/GuidedMeditation'
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import data from './data';
import Fivemin from '../components/Fivemin';
import { db } from '../firebase';
import Package from '../components/Package';


const Mindfulness = ({navigation}) => {

    const [images, setImages] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection("mindful").onSnapshot((snapshot) => 
            setImages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                    
                }))
            )
        );

        return unsubscribe;
    }, [])

    

    return (
        <View style={{flex: 1, backgroundColor: "#2C4D37"}}>

            {/* Trending meditations */}
             <ScrollView>
                <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff", marginVertical: 20, alignSelf: "center"}}>Recommended meditations</Text>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Pressable onPress={() => navigation.navigate("Play")}>
                        <ImageBackground source={require("../assets/left.png")} style={{height: 187, width: 170, marginHorizontal: 10}}>
                            <Text style={{color: "white", width: 120, fontSize: 20, alignSelf: "center", marginTop: 20}}>10 MINUTE MEDITATION</Text>
                        </ImageBackground>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate("Play")}>
                        <ImageBackground source={require("../assets/right.png")} style={{height: 187, width: 170, marginHorizontal: 10}}>
                            <Text style={{color: "white", width: 120, fontSize: 20, alignSelf: "center", marginTop: 20}}>IMPROVE FOCUS</Text>
                        </ImageBackground>
                    </Pressable>
                </View>


            {/* Self development */}
                <Text style={{color: "white", marginTop: 50, fontSize: 20, alignSelf: "center", fontWeight: "bold"}}>Self-development package</Text>
                <View style={{width: "100%", height: 320, backgroundColor: "#32583F", marginTop: 30, alignItems: "center", borderRadius: 50}}>
                    <ScrollView 
                        decelerationRate={0}
                        horizontal
                        snapToAlignment="center"
                        snapToInterval={Dimensions.get("screen").width}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            images.map(({id, data: {contentPackage, imagePackage}}) => {
                                return <Package key={id} contentPackage={contentPackage} imagePackage={imagePackage} />
                            })
                        }
                        
                    </ScrollView>
                </View>

                

            {/* Fullfilled day */}
                <View style={{marginTop: 50, paddingHorizontal: 30}}>
                    <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>How to have a fulfilled day</Text>
                    <View style={{marginTop: 20}}>
                        <Pressable onPress={() => navigation.navigate("Play")} style={{flexDirection: "row"}}>
                            <Image source={require("../assets/day.png")} style={{height: 100, width: 100}} />
                            <View style={{justifyContent: "center", marginLeft: 20}}>
                                <Text style={{color: "white", fontSize: 20}}>Morning routine</Text>
                                <Text style={{color: "white", fontSize: 12, width: 200}}>Five morning habits that will make you smile, stress-free ,energetic and ready to achieve your dreams.</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("Play")} style={{flexDirection: "row", marginTop: 20}}>
                            <Image source={require("../assets/night.png")} style={{height: 100, width: 100}} />
                            <View style={{justifyContent: "center", marginLeft: 20}}>
                                <Text style={{color: "white", fontSize: 20}}>Evening routine</Text>
                                <Text style={{color: "white", fontSize: 12, width: 200}}>Five evening habits that will make you smile, stress-free ,energetic and ready to achieve your dreams.</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>

                {/* 5 min for a better life */}
                <Text style={{marginTop: 50, color: "white", fontWeight: "bold", fontSize: 20, paddingHorizontal: 30 }}>Expore new content</Text>
                <FlatList 
                    horizontal
                    data={data}
                    renderItem={({item}) => <Fivemin list={item} />}
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop: 20}}
                />
                <View style={{height: 100}} />
            </ScrollView>
        </View>
       
    )
}

export default Mindfulness

const styles = StyleSheet.create({})
