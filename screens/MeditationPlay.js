import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Sound } from "expo-av/build/Audio/Sound"
import { AntDesign } from '@expo/vector-icons';


const MeditationPlay = ({navigation}) => {

    

    const [isPlaying, setIsPlaying] = useState(true);
    const [sound, setSound] = useState(null);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="back" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])



    const onPlaybackStatusUpdate = (status) => {
        setIsPlaying(status.isPlaying)
    }

    const playCurrentSong = async () => {
         if (sound) {
             await sound.unloadAsync();
         }

         const { sound: newSound } = await Sound.createAsync(
            require("../assets/meditation.mp3"),
             { shouldPlay: isPlaying },
             onPlaybackStatusUpdate
         )

         setSound(newSound)
    }

    useEffect(() => {
        playCurrentSong()
    }, [])

    const onPlayPausePressOne = async () => {
        if (!sound) {
            return;
        }
        if (isPlaying) {
             await sound.stopAsync();
        } else {
            await sound.playAsync();
        }
    }

    

    return (
        <ImageBackground source={require("../assets/backgroundNature.png")} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../assets/forrestimg.png")} style={{height: 320, width: 270, borderRadius: 5}} />
            <TouchableOpacity onPress={onPlayPausePressOne} style={{}}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={100} color="black" style={{marginTop: 50}} />
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default MeditationPlay

const styles = StyleSheet.create({})
