import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, Modal, Pressable, TouchableOpacity, Animated, Button, ScrollView, Image, ImageBackground, ActivityIndicator, Dimensions } from 'react-native'
import Task from '../components/Task'
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Leader from '../components/Leader';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import firebase from 'firebase';
import * as Linking from 'expo-linking';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';




const ToDo = ({navigation, route}) => {

    const [input, setInput] = useState("");
    const [description, setDescription] = useState("");
    const [taskItems, setTaskItems] = useState([]);
    const [messagesItems, setMessagesItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalTwo, setShowModalTwo] = useState(false);
    const [timer, setTimer] = useState(false);
    const [title, setTitle] = useState("");
    const [writeMessage, setWriteMessage] = useState("");
    const [leaderItems, setLeaderItems] = useState([]);
    const [showModalThree, setShowModalThree] = useState(false);
    const [clickedColor, setClickedColor] = useState(false);
    const [clickedColorTwo, setClickedColorTwo] = useState(false);
    const [clickedColorThree, setClickedColorThree] = useState(false);
    const [clickedColorFour, setClickedColorFour] = useState(false);
    const [clickedColorFive, setClickedColorFive] = useState(false);
    const [clickedImage, setClickedImage] = useState(false)
    const [test, setTest] = useState([]);
    const [testTwo, setTestTwo] = useState([]);

    const [inputAnimation, setinputAnimation] = useState(false);
    const [colorClicked, setColorClicked] = useState("");

    const [addTaskNote, setAddTaskNote] = useState(false);
    const [taskNumber, setTaskNumber] = useState("");

    const [effectPrimer, setEffectPrimer] = useState(false);
    const [messageNumber, setMessageNumber] = useState("");



    const taskAnimated = useRef(
        new Animated.Value(57),
        
    ).current;
    
    const animateBall = () => {
        Animated.timing(taskAnimated, {
            toValue: 150,
            duration: 500,
        }).start()
        
        setinputAnimation(true);
    }

    const animateBallBack = () => {
        Animated.timing(taskAnimated, {
            toValue: 57,
            duration: 500,
        }).start()
        
        setinputAnimation(false);
    }

    const taskAnimation = {
        height: taskAnimated,
    }

    const animateBallTwo = () => {
        Animated.timing(taskAnimated, {
            toValue: 100,
            duration: 2300,
        }).start()
        
    }

    
    

    const testek = (id) => {
        db.collection("team").doc(id).get()
                 .then((doc) => {
                    if (doc.exists) {
                      setTest(doc.data().leaderMessage);
                    }
                  })
                .catch(error => {
                  console.log('firebase Error::'+error)
                 })
        
        setShowModalThree(true);
        
    }



    const deleteItem = (id) => {
        db.collection("users").doc(auth.currentUser.uid).collection("tasks").doc(id).delete();
        setShowModal(true);
        setEffectPrimer(!effectPrimer);

    }

    const deleteShow = (id) => {
        
        db.collection("users").doc(auth.currentUser.uid).collection("leader").doc(id).delete();
        
    }

    const besediloSend = () => {
        <Text>{messagesItems[Math.floor(Math.random() * messagesItems.length)].data.messages}</Text>
    }

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("tasks").onSnapshot((snapshot) => 
            setTaskItems(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])

    useEffect(() => {
        const unsubscribe = db.collection("team").onSnapshot((snapshot) => 
            setLeaderItems(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("messages").onSnapshot((snapshot) => 
            setMessagesItems(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])

    const addTask = async () => {
        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("tasks")
            .add({
                taskName: input,
                color: colorClicked,
            })

        setInput(null);
        animateBallBack();
    }

    const addTaskBottom = async () => {
        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("tasks")
            .add({
                taskName: input,
                color: colorClicked,
                descName: description,
            })

        setInput(null);
        setDescription(null);
        
        setEffectPrimer(!effectPrimer);
    }

    const addMessage = async () => {
        await db
            .collection("team")
            .add({
                title: title,
                leaderMessage: writeMessage,
            })

        setTitle(null);
        setWriteMessage(null);
        setShowModalTwo(false);
    }

    const deleteTask = (index) => {
        const all = [...taskItems];
        all.splice(index, 1);
        setTaskItems(all);
        setShowModal(true);
    }

    const random = ["If it’s out of your hands, it deserves freedom from your mind too.", "The way you speak to yourself matters", "Visualize your highest self and start showing up as him/her", "The first and best victory is to conquer self"];

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Today´s tasks",
            headerStyle: { backgroundColor: "#029C88" },
            headerTitleStyle: { color: "white"},
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Mindful")}>
                    <MaterialCommunityIcons name="meditation" size={28} color="white" />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={signOutUser}>
                    <SimpleLineIcons name="logout" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    },[navigation])

    const clickclick = () => {
        setShowModalThree(false);
        setClickedImage(false);
    }


    const barve = [
        "yellow",
        "red",
        "orange",
        "pink"
    ]

    useEffect(() => {
        db.collection("users").doc(auth.currentUser.uid).collection("tasks").get().then((querySnapshot) => {
            return setTaskNumber(querySnapshot.size)
        }     
            
        );
        
        
    }, [effectPrimer])

    useEffect(() => {
        db.collection("users").doc(auth.currentUser.uid).collection("messages").get().then((querySnapshot) => {
            return setMessageNumber(querySnapshot.size)
        }     
            
        );
        
        
    }, [effectPrimer])


    



    return (
        <View style={[styles.container, {backgroundColor: taskNumber===0 ? "white" : "lightgrey"}]}>

                
            
                {
                    taskNumber===0 ? 
                    (<View style={{height: "100%", width: "100%", alignItems: "center", justifyContent: "center"}}>
                        <Image style={{height: 280, width: 280}} source={require("../assets/todoBack.jpg")} />
                        <Text style={{color: "grey", fontWeight: "400", fontSize: 18, marginTop: 40}}>What´s your plan for today? :)</Text>
                    </View>)
                         : 
                         null
                }
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {
                        taskItems.map(({id, data: { taskName, color, descName }}) => {
                            return <Task key={id} id={id} onPress={() => deleteItem(id)} taskText={taskName} color={color} descText={descName} />
                        })
                    }
                </View>
                <View>
                    {
                        leaderItems.map(({id, data: { title }}) => {
                            return <Leader key={id} id={id} onPress={() => testek(id)} leaderText={title} onPressTwo={() => deleteShow(id)} />
                        }) 
                    }
                </View>
            
                {/*
                <Pressable onPress={() => animateBall() } >
                        <Animated.View style={[styles.inputContainer, taskAnimation]}>
                        <View style={{height: 20, width: 20, backgroundColor: "grey", borderRadius: 10}} />
                        {
                            inputAnimation ? (
                                <>
                                    <TextInput autoFocus onSubmitEditing={addTask} value={input} onChangeText={(text) => setInput(text)} style={{paddingHorizontal: 10, position: "absolute", top: 20, left: 40}} placeholder="Write your task . . ." />
                                    <View style={{flexDirection: "row", width: "50%", justifyContent: "space-between", position: "absolute", bottom: 20, paddingLeft: 20}}>
                                        {
                                            barve.map((item, index) => {
                                                return <Pressable onPress={() => setColorClicked(item)} key={index} style={{height: 30, width: 30, backgroundColor: item, borderRadius: 15, borderColor: "black", borderWidth: colorClicked===item ? 2 : 0, marginHorizontal: 10}} />
                                            })
                                        }
                                    </View>
                                    <TouchableOpacity onPress={addTask} style={{height: 30, width: 70, backgroundColor: "white", borderColor: "grey", borderWidth: 2, justifyContent: "center", alignItems: "center", position: "absolute", bottom: 20, right: 20}}>
                                        <Text>Save</Text>
                                    </TouchableOpacity>
                                </>
                            ) : <Text style={{marginLeft: 10, color: "grey"}}>Write your task . . .</Text>
                        }
                        </Animated.View>
                </Pressable>
                */}
            <View style={{height: 100}} />
            </ScrollView>
            
            <TouchableOpacity onPress={() => setAddTaskNote(true)} style={{backgroundColor: "#029C88", height: 60, width: 60, borderRadius: 30, alignSelf: "center", position: "absolute", bottom: 30, right: 30, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 30, fontWeight: "bold"}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModalTwo(true)} style={{backgroundColor: "#004DA3", height: 60, width: 60, borderRadius: 30, alignSelf: "center", position: "absolute", bottom: 30, right: 120, justifyContent: "center", alignItems: "center"}}>
                <MaterialIcons name="group-add" size={30} color="white" />
            </TouchableOpacity>
            
            


            {
                timer ? (
                    <View style={{alignItems: "center", backgroundColor: "lightblue", flex: 1, position: "absolute", top: 0, width: "100%", alignSelf: "center", height: "100%", justifyContent: "center"}}>
                        <Text style={{fontSize: 30, marginBottom: 30}}>Breath in</Text>
                        <CountdownCircleTimer
                            isPlaying={timer}
                            duration={5}
                            onComplete={() => setTimer(false)}
                            colors={[
                            ['#004777', 0.4],
                            ['#F7B801', 0.4],
                            ['#A30000', 0.2],
                            ]}
                        >
                            {({ remainingTime, animatedColor }) => (
                            <Animated.Text style={{ color: animatedColor }}>
                                {remainingTime}
                            </Animated.Text>
                            )}
                        </CountdownCircleTimer>
                    </View>
                ) : null
            }
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Pressable onPress={() => setShowModal(false)} style={{height: 200, width: 300, backgroundColor: "#004DA3", justifyContent: "center", alignItems: "center", borderRadius: 20}}>
                        <Text style={{color: "white", fontSize: 20}}>{route.params.message}</Text>
                    </Pressable>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalTwo}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", height: "100%", width: "100%", backgroundColor: "#004DA3"}}>
                    <TextInput value={title} onChangeText={(text) => setTitle(text)} placeholder="Title ... " placeholderTextColor="white" style={{fontSize: 20, borderBottomColor: "white", borderBottomWidth: 1, width: 300, marginTop: 50, marginBottom: 20, justifyContent: "center"}} />
                    <TextInput placeholder="Write your message..." value={writeMessage} onChangeText={(text) => setWriteMessage(text)} style={{borderWidth: 2, borderColor: "white", width: 300, height: 150, fontSize: 20, textAlign: "auto", marginTop: 50, paddingBottom: 80, paddingLeft: 10}} placeholderTextColor="white"/>
                    <Text style={{marginTop: 50, fontSize: 20, color: "white", justifyContent: "center", alignItems: "center"}}>Select one guided meditation</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 20}}>
                        <Pressable onPress={() => setClickedColor(!clickedColor)}>
                            <Image source={require("../assets/videoImage.png")} style={{width: 100, height: 100, marginHorizontal: 10, borderColor: clickedColor ? "black" : null , borderWidth: clickedColor ? 10 : 0}} />
                        </Pressable>
                        <Pressable onPress={() => setClickedColorTwo(!clickedColorTwo)}>
                            <Image source={require("../assets/videoImage1.png")} style={{width: 100, height: 100, marginHorizontal: 10, borderColor: clickedColorTwo ? "black" : null , borderWidth: clickedColorTwo ? 10 : 0}} />
                        </Pressable>
                        <Pressable onPress={() => setClickedColorThree(!clickedColorThree)}>
                            <Image source={require("../assets/videoImage2.png")} style={{width: 100, height: 100, marginHorizontal: 10, borderColor: clickedColorThree ? "black" : null , borderWidth: clickedColorThree ? 10 : 0}} />
                        </Pressable>
                        <Pressable onPress={() => setClickedColorFour(!clickedColorFour)}>
                            <Image source={require("../assets/videoImage.png")} style={{width: 100, height: 100, marginHorizontal: 10, borderColor: clickedColorFour ? "black" : null , borderWidth: clickedColorFour ? 10 : 0}} />
                        </Pressable>
                        <Pressable onPress={() => setClickedColorFive(!clickedColorFive)}>
                            <Image source={require("../assets/videoImage1.png")} style={{width: 100, height: 100, marginHorizontal: 10, borderColor: clickedColorFive ? "black" : null , borderWidth: clickedColorFive ? 10 : 0}} />
                        </Pressable>
                        
                    </ScrollView>
                    <View style={{marginBottom: 10}}> 
                        <Pressable onPress={() => addMessage()} style={{ height: 60, width: 200, backgroundColor: "lightblue", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{color: "black", fontSize: 16}}>Click here</Text>
                        </Pressable>
                        <Button style={{marginBottom: 100}} title="Skip" onPress={() => setShowModalTwo(false)} />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalThree}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", height: "100%", width: "100%", backgroundColor: "#004DA3"}}>
                    <View style={{position: "absolute", top: 80, alignItems: "center"}}>
                        <Text style={{fontSize: 30, color: "white"}}>MESSAGE: </Text>
                        <Text style={{fontSize: 30, color: "lightgrey"}}>{test}</Text>
                    </View>
                    <ImageBackground source={require("../assets/background.png")} style={{justifyContent: "center", alignItems: "center", height: 300, width: 200, backgroundColor: "#004DA3"}}>
                        <Pressable onPress={() => Linking.openURL('https://www.youtube.com/watch?v=F7PxEy5IyV4')} style={{height: 200, width: 300, backgroundColor: "transparent", justifyContent: "center", alignItems: "center", borderRadius: 20}}>
                            {
                                clickedImage ? (
                                    <Image source={require("../assets/pauseButton.png")} style={{height: 100, width: 100}} />
                                ) : <Image source={require("../assets/playButton.png")} style={{height: 100, width: 100}} />
                            }
                        
                        </Pressable>
                    </ImageBackground>
                    <Pressable onPress={() => clickclick()} style={{ height: 60, width: 200, backgroundColor: "lightblue", borderRadius: 10, justifyContent: "center", alignItems: "center", position: "absolute", bottom: 70}}>
                        <Text style={{color: "black", fontSize: 16}}>Go back</Text>
                    </Pressable>
                </View>
            </Modal>
            
            <Modal 
                animationType="slide"
                transparent={true}
                visible={addTaskNote}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Pressable onPress={() => setAddTaskNote(false)} style={{height: 300, width: "95%", backgroundColor: "#005E50", justifyContent: "center", alignItems: "center", borderRadius: 15}}>
                        <View style={{position: "absolute", top: 5, width: "100%", paddingLeft: 25 }}>
                            <TextInput autoFocus value={input} onChangeText={(text) => setInput(text)} placeholder="Write your task . . ." placeholderTextColor="white" style={{fontSize: 17, marginTop: 20, borderBottomColor: "white", borderBottomWidth: 1, width: 200, paddingVertical: 8, color: "#fff"}} />
                            <TextInput value={description} onChangeText={(text) => setDescription(text)} placeholder="Description" placeholderTextColor="white" style={{fontSize: 15, marginTop: 20, borderBottomWidth: 1, width: 200, paddingVertical: 8, borderBottomColor: "white", color: "#fff"}} />
                            <View style={{flexDirection: "row", marginTop: 40}}>
                                <View style={{flexDirection: "row", width: "50%", justifyContent: "space-between", marginTop: 30}}>
                                    {
                                        barve.map((item, index) => {
                                            return <Pressable onPress={() => setColorClicked(item)} key={index} style={{height: 30, width: 30, backgroundColor: item, borderRadius: 15, borderColor: "black", borderWidth: colorClicked===item ? 2 : 0, marginHorizontal: 10}} />
                                            })
                                    }
                                </View>
                                <Pressable onPress={() => addTaskBottom()} style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", height: 50, width: 100, marginTop: 20, marginLeft: 40, borderRadius: 5}}>
                                    <Text>Save</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                </View> 
            </Modal>
            <StatusBar style="light" />
        </View>
    )
}



export default ToDo

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flex: 1,
        
    },

    box: {
        height: 50,
        width: 250,
        backgroundColor: "blue",
        marginBottom: 100
    },

    inputContainer: {
        backgroundColor: "white", 
        height: 60, 
        marginTop: 15, 
        borderRadius: 10, 
        flexDirection: "row", 
        paddingTop: 20,
        marginVertical: 10,
        paddingHorizontal: 20
    }
})
