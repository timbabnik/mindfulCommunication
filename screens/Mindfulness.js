import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native'
import GuidedMeditation from '../components/GuidedMeditation'
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

const Mindfulness = ({navigation}) => {

    

    return (
        <View style={{flex: 1, backgroundColor: "#2C4D37"}}>
             <ScrollView>
                <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff", marginVertical: 20, alignSelf: "center"}}>Guided meditations</Text>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <ImageBackground source={require("../assets/left.png")} style={{height: 187, width: 170, marginHorizontal: 10}}>
                        <Text style={{color: "white", width: 120, fontSize: 20, alignSelf: "center", marginTop: 20}}>10 MINUTE MEDITATION</Text>
                    </ImageBackground>
                    <ImageBackground source={require("../assets/right.png")} style={{height: 187, width: 170, marginHorizontal: 10}}>
                        <Text style={{color: "white", width: 120, fontSize: 20, alignSelf: "center", marginTop: 20}}>IMPROVE FOCUS</Text>
                    </ImageBackground>
                </View>
                <Text style={{color: "white", marginTop: 50, fontSize: 20, alignSelf: "center", fontWeight: "bold"}}>Self-development package</Text>
                <View style={{width: "100%", height: 320, backgroundColor: "#32583F", marginTop: 30, alignItems: "center", borderRadius: 50}}>
                    <ScrollView 
                        decelerationRate={0}
                        horizontal
                        snapToAlignment="center"
                        snapToInterval={Dimensions.get("screen").width}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{flexDirection: "row", alignItems: "center", width: Dimensions.get("screen").width, }}>
                            <Image source={require("../assets/mindset.jpg")} style={{height: 207, width: 126, marginHorizontal: 20}} />
                            <Text style={{width: 170, marginHorizontal: 30, color: "#fff", fontSize: 20}}>“Becoming is better than being”</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", width: Dimensions.get("screen").width}}>
                            <Image source={require("../assets/twitter.png")} style={{height: 207, width: 126, marginHorizontal: 20}} />
                            <View>
                                <Text style={{width: 170, marginHorizontal: 30, color: "#fff", fontSize: 20}}>The greatest superpower is the ability to change yourself.</Text>
                                <Text style={{width: 170, marginHorizontal: 30, color: "#fff", fontSize: 16, marginTop: 10}}>@naval</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", width: Dimensions.get("screen").width}}>
                            <Image source={require("../assets/sun.jpg")} style={{height: 207, width: 126, marginHorizontal: 20}} />
                            <Text style={{width: 170, marginHorizontal: 30, color: "#fff", fontSize: 20}}>“We have to make every ending be a happy ending.”</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={{marginTop: 50, paddingHorizontal: 30}}>
                    <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Reduce anxiety</Text>
                    <View style={{marginTop: 20}}>
                        <View style={{flexDirection: "row"}}>
                            <Image source={require("../assets/day.png")} style={{height: 100, width: 100}} />
                            <View style={{justifyContent: "center", marginLeft: 20}}>
                                <Text style={{color: "white", fontSize: 20}}>Morning meditaiton</Text>
                                <Text style={{color: "white", fontSize: 12, width: 200}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas.</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", marginTop: 20}}>
                            <Image source={require("../assets/night.png")} style={{height: 100, width: 100}} />
                            <View style={{justifyContent: "center", marginLeft: 20}}>
                                <Text style={{color: "white", fontSize: 20}}>Evening meditaiton</Text>
                                <Text style={{color: "white", fontSize: 12, width: 200}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas.</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height: 60}} />
            </ScrollView>
        </View>
       
    )
}

export default Mindfulness

const styles = StyleSheet.create({})
