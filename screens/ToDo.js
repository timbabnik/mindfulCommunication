import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, Modal, Pressable, TouchableOpacity, Animated, Button, ScrollView, Image, ImageBackground, ActivityIndicator, Dimensions, FlatList, Switch } from 'react-native'
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
import { Entypo } from '@expo/vector-icons';
import data from './data';
import Fivemin from '../components/Fivemin';
import ShareContent from '../components/ShareContent';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



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
    const [messageGroup, setMessageGroup] = useState([]);
    const [testTwo, setTestTwo] = useState([]);
    const [breathingTimer, setBreathingTimer] = useState("");
    const [groupTimer, setGroupTimer] = useState("");
    const [link, setLink] = useState("");
    const [groupLink, setGroupLink] = useState("");
    const [helpClicked, setHelpClicked] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const [inputAnimation, setinputAnimation] = useState(false);
    const [colorClicked, setColorClicked] = useState("");

    const [addTaskNote, setAddTaskNote] = useState(false);
    const [addTaskNoteGroup, setAddTaskNoteGroup] = useState(false);
    const [taskNumber, setTaskNumber] = useState("");

    const [refreshData, setRefreshData] = useState(false);
    const [messageNumber, setMessageNumber] = useState("");

    const [inspiro, setInspiro] = useState([]);
    const [inspirationNumber, setInspirationNumber] = useState("");

    const [clicked, setClicked] = useState(false);

    const [neki, setNeki] = useState("");

    const [write, setWrite] = useState(false);
    const [inputInspire, setInputInspire] = useState("");

    const resetTimer = () => {
        setShowModalTwo(false)
        setClicked(false);
    }

    const timerOne = [
        "0",
        "15",
        "30",
    ]

    const timerTwo = [
        "60",
        "300"
    ]

    const leaderHelp = [{
        agenda: "Motivation",
        message: ["Motivation 1", "Motivation 2", "Motivation 3"],
        color: "#FFA4A4"
    }, {
        agenda: "Mindful",
        message: ["Mindful 1", "Mindful 2", "Mindful 3"],
        color: "#00F0FF"
    }, {
        agenda: "Business",
        message: ["Business 1", "Business 2", "Business 3"],
        color: "#689BFF"
    }]

    /* 
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
    */

    
    
    
    // Get an id of the group message and show the message
    const openGroup = (id) => {
        db.collection("groups").doc(route.params.id).collection("messagesGroup").doc(id).get()
                 .then((doc) => {
                    if (doc.exists) {
                        setMessageGroup(doc.data().leaderMessage);
                        setGroupTimer(doc.data().timer)
                        setGroupLink(doc.data().links)
                    }
                  })
                .catch(error => {
                  console.log('firebase Error::'+error)
                 })
        
        setShowModalThree(true);
        
    }




    // Delete your task
    const deleteItem = (id) => {
        db.collection("groups").doc(route.params.id).collection("teamGroup").doc(auth.currentUser.uid).collection("tasks").doc(id).delete();
        setShowModal(true);
        setRefreshData(!refreshData);
        

    }


    // Delete message from your group (blue circle)
    const deleteShow = (id) => {
        db.collection("groups").doc(route.params.id).collection("messagesGroup").doc(id).delete();
        
    }

    /* const besediloSend = () => {
        <Text>{messagesItems[Math.floor(Math.random() * messagesItems.length)].data.messages}</Text>
    } */

    
    // Get all your tasks from firebase
    useEffect(() => {
        const unsubscribe = db.collection("groups").doc(route.params.id).collection("teamGroup").doc(auth.currentUser.uid).collection("tasks").onSnapshot((snapshot) => 
            setTaskItems(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])

    
    // Get all your messages from your group (blue circle)
    useEffect(() => {
        const unsubscribe = db.collection("groups").doc(route.params.id).collection("messagesGroup").onSnapshot((snapshot) => 
            setLeaderItems(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])



    
    /* useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("messages").onSnapshot((snapshot) => 
            setMessagesItems(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, []) */

    

    


    // Add new task
    const addTask = async () => {
        await db
            .collection("groups")
            .doc(route.params.id)
            .collection("teamGroup")
            .doc(auth.currentUser.uid)
            .collection("tasks")
            .add({
                taskName: input,
                color: colorClicked,
                descName: description,
            })

        setInput(null);
        setDescription(null);
        
        setRefreshData(!refreshData);
    }

    const addTaskGroup = async () => {
        await db
            .collection("groups")
            .doc(route.params.id)
            .collection("messagesGroup")
            .add({
                title: title,
                message: writeMessage
            })

        setAddTaskNoteGroup(false);
    }


    // Add group message (blue circle)
    const addMessage = async () => {
        await db
            .collection("groups")
            .doc(route.params.id)
            .collection("messagesGroup")
            .add({
                title: title,
                leaderMessage: writeMessage,
                timer: breathingTimer,
                links: link,
            })

        setTitle(null);
        setWriteMessage(null);
        setShowModalTwo(false);
    }

    

    /* const random = ["If it’s out of your hands, it deserves freedom from your mind too.", "The way you speak to yourself matters", "Visualize your highest self and start showing up as him/her", "The first and best victory is to conquer self"]; */


    // Sign out from your account
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }


    // Close the group message (blue circle)
    const closeGroupMessage = () => {
        setShowModalThree(false);
        setClickedImage(false);
    }

    // Task colors
    const barve = [
        "yellow",
        "red",
        "orange",
        "pink"
    ]


    // Get number of your tasks
    useEffect(() => {
        db.collection("groups").doc(route.params.id).collection("teamGroup").doc(auth.currentUser.uid).collection("tasks").get().then((querySnapshot) => {
            return setTaskNumber(querySnapshot.size)
        }     
            
        );
        
        
    }, [refreshData])


    /*
    useEffect(() => {
        db.collection("users").doc(auth.currentUser.uid).collection("messages").get().then((querySnapshot) => {
            return setMessageNumber(querySnapshot.size)
        }     
            
        );
        
        
    }, [refreshData])
    */

    
    
    // Get all the written messages from the team
    useEffect(() => {
        const unsubscribe = db.collection("groups").doc(route.params.id).collection("inspirationMessage").onSnapshot((snapshot) => 
            setInspiro(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                    
                }))
            )
        );

        return unsubscribe;
    }, [refreshData])


    // Get number of all the written messages from the team
    useEffect(() => {
        db.collection("groups").doc(route.params.id).collection("inspirationMessage").get().then((querySnapshot) => {
            return setInspirationNumber(querySnapshot.size)
        }     
            
        );
        
        
    }, [refreshData])
  
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Today´s tasks",
            headerStyle: { backgroundColor: "#029C88" },
            headerTitleStyle: { color: "white"},
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Mindful")}>
                    <MaterialCommunityIcons name="meditation" size={30} color="white" />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="back" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    },[navigation])



    const writeRead = () => {
        setShowModal(false), 
        setWrite(false)
    }

    const createMessage = async () => {
        await db
            .collection("groups")
            .doc(route.params.id)
            .collection("inspirationMessage")
            .add({
                msg: inputInspire,
            })

        setShowModal(false);
        setWrite(false)
    }



    const youtubeLinks = ["https://www.youtube.com/watch?v=W608u6sBFpo&t=31s", "https://www.youtube.com/watch?v=fWEX3SRX7Ro", "https://www.youtube.com/watch?v=GXoErccq0vw&t=287s"];
    

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
                {
                    isEnabled ? null : (
                        <View>
                                {
                                leaderItems.map(({id, data: { title, message }}) => {
                                    return <Leader key={id} id={id} /*onPress={() => openGroup(id)}*/ leaderText={title} onPressTwo={() => deleteShow(id)} descText={message} iconName={route.params.leaderButton ? "cancel" : null} />
                                }) 
                                }
                        </View>
                    )
                        
                    
                }
                
                
            
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
            {
                route.params.leaderButton ? (
                <View style={{height: 40, position: "absolute", bottom: 20, right: 30, justifyContent: "center",   width:"100%"}}>
                    <TouchableOpacity onPress={() => setAddTaskNoteGroup(true)} style={{backgroundColor: "#004DA3", height: 60, width: 60, borderRadius: 30, alignSelf: "center", position: "absolute", bottom: 10, right: 90, justifyContent: "center", alignItems: "center"}}>
                        <MaterialIcons name="group-add" size={24} color="white" />
                    </TouchableOpacity>
                    {/*<TouchableOpacity style={{paddingLeft: 10, width: 46}} onPress={() => setHelpClicked(!helpClicked)}>
                        <Entypo name="help-with-circle" size={24} color="grey" />
                </TouchableOpacity>*/}
                    {
                        helpClicked ? (
                            <View style={{height: 150, width: 250, backgroundColor: "#fff", position: "absolute", bottom: 60, padding: 20, borderRadius: 10}}>
                                <Text>Leadership tips</Text>
                                <View style={{height: 20, width: 20, backgroundColor: "#fff", position: "absolute", bottom: -8, left: 11, transform: [{ rotateZ: '45deg'}]}} />
                            </View>
                        ) : null
                        }
                </View>
            ) : null
            }
                    <Switch 
                        trackColor={{true: "#029C88", false: "#004DA3"}}
                        onValueChange={(value) => setIsEnabled(value)}
                        value={isEnabled}
                        
                        ios_backgroundColor="#004DA3"
                        style={{position: "absolute", bottom: 30, left: 30}}
                    />
          
            


            
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Pressable onPress={() => writeRead()} style={[styles.inspirationContainer]}>
                        {
                            write ? (
                                <View>
                                    <Text style={{fontSize: 20, color: "#fff", fontWeight: "bold"}}>Write something</Text>
                                    <TextInput value={inputInspire} onChangeText={(text) => setInputInspire(text)} placeholderTextColor="white" style={{height: 40, width: 180, borderColor: "#fff", borderWidth: 1, marginTop: 15, paddingHorizontal: 12}} placeholder="Write something ..." />
                                    <Pressable onPress={() => createMessage()} style={{height: 35, width: 100, backgroundColor: "lightblue", alignSelf: "center", justifyContent: "center", alignItems: "center", marginTop: 25, borderRadius: 5}}>
                                        <Text>Send</Text>
                                    </Pressable>
                                </View>
                            ) : 
                            <View>
                                <Text style={{color: "white", fontSize: 20}}>
                                {
                                    inspiro.splice(Math.floor(Math.random()*inspirationNumber), 1).map(({id, data: {msg}}) => {
                                        return <Text key={id}>{msg}</Text>
                                    })
                                }
                            </Text>
                            
                            </View>
                        }
                        {
                            write ? null : (
                        
                        <>
                       <TouchableOpacity style={{position: "absolute", bottom: 10, right: 10}} onPress={() => setWrite(!write)} >
                            <FontAwesome name="pencil-square-o" size={24} color="white"  />
                        </TouchableOpacity>
                        </>)}
                    </Pressable>
                </View>
            </Modal>

            {/*<Modal
                animationType="slide"
                transparent={true}
                visible={showModalTwo}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#056FE5"}}>
                    <ScrollView 
                        decelerationRate={0}
                        showsVerticalScrollIndicator={false}
                        snapToAlignment="center"
                        snapToInterval={Dimensions.get("screen").height}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{height: (Dimensions.get("screen").height + 0), width: Dimensions.get("screen").width, paddingTop: 70, alignItems: "center", flex: 1, paddingBottom: 100}}>
                            <View style={{alignItems: "center", }}>
                                <Text style={{fontSize: 30, color: "#fff", fontWeight: "bold", width: 230, textAlign: "center"}}>Send your team a message</Text>
                                <TextInput value={title} onChangeText={(text) => setTitle(text)} placeholder="Title ... " placeholderTextColor="white" style={{fontSize: 20, borderBottomColor: "white", borderBottomWidth: 1, width: 300, marginTop: 50, justifyContent: "center"}} />
                                <TextInput placeholder="Write your message..." value={writeMessage} onChangeText={(text) => setWriteMessage(text)} style={{borderWidth: 2, borderColor: "white", width: 300, height: 150, fontSize: 20, textAlign: "auto", marginTop: 20, paddingBottom: 80, paddingLeft: 10, color: "white"}} placeholderTextColor="white"/>
                                <Text style={{color: "#fff", fontSize: 18, paddingTop: 30}}>Don´t know what to write?</Text>
                                <View style={{flexDirection: "row", paddingTop: 20}}>
                                    {
                                        leaderHelp.map((item, key) => {
                                            return <TouchableOpacity onPress={() => setWriteMessage(item.message[Math.floor(Math.random() * item.message.length)])} style={{height: 90, width: 90, backgroundColor: item.color, justifyContent: "center", alignItems: "center", marginHorizontal: 5, borderRadius: 100}} id={key}><Text style={{color: "#fff", fontWeight: "bold"}}>{item.agenda}</Text></TouchableOpacity>
                                        })
                                    }
                                </View>
                            </View>
                            <View>
                                
                            </View>
                        </View>
                        <View style={{height: (Dimensions.get("screen").height - 30), width: Dimensions.get("screen").width, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontSize: 22, fontWeight: "bold", color: "#fff", width: 220, textAlign: "center", paddingTop: 50}}>Select content you want to share</Text>
                            <View style={{marginTop: 30, height: 360}}>
                                
                            <FlatList 
                                horizontal
                                data={data}
                                renderItem={({item}) => <ShareContent list={item} />}
                                showsHorizontalScrollIndicator={false}
                                style={{marginTop: 10}}
                            />
                               
                                
                                <View style={{alignItems: "center"}}>
                                    <Text style={{fontSize: 20, color: "#fff", marginLeft: 20, paddingTop: 10, textAlign: "center", paddingBottom: 10}}>... or paste the link: </Text>
                                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "90%"}}>
                                        <TextInput value={link} onChangeText={(text) => setLink(text)} placeholder="Your link . . ." style={{height: 50, width: 260, borderWidth: 2, borderColor: "#fff", textAlign: "center", color: "white", paddingBottom: 10}} placeholderTextColor="white" />
                                        <TouchableOpacity onPress={() => setLink(youtubeLinks[Math.floor(Math.random() * youtubeLinks.length)])}>
                                            <FontAwesome name="random" size={24} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                            </View>
                            
                        </View>
                        <View style={{height: (Dimensions.get("screen").height - 50), width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{top: 40, position: "absolute", fontSize: 30, fontWeight: "bold", color: "#fff", width: 270, textAlign: "center", paddingTop: 50}}>Remind your team to be mindful</Text>
                            <Text style={{fontSize: 18, color: "lightgrey", top: 130, position: "absolute", paddingTop: 50}}>Select a timer for a breath meditation.</Text>
                            <View style={{flexDirection: "row", position: "absolute", top: 200, paddingTop: 50}}>
                                {
                                    timerOne.map((item, key) => {
                                        return <TouchableOpacity onPress={() => setBreathingTimer(item)} style={{height: 100, width: 100, backgroundColor: breathingTimer===item ? "darkblue" : "#FFB800", borderRadius: 50, justifyContent: "center", alignItems: "center", marginHorizontal: 10}}>
                                                    <Text style={{color: "#fff", fontSize: 20}} id={key}>{item} s</Text>
                                                </TouchableOpacity>
                                    })
                                }
                               
                            </View>
                            <View style={{flexDirection: "row", position: "absolute", top: 310, paddingTop: 50}}>
                                {
                                    timerTwo.map((item, key) => {
                                        return <TouchableOpacity onPress={() => setBreathingTimer(item)} style={{height: 100, width: 100, backgroundColor: breathingTimer===item ? "darkblue" : "#FFB800", borderRadius: 50, justifyContent: "center", alignItems: "center", marginHorizontal: 10}}>
                                                    <Text style={{color: "#fff", fontSize: 20}} id={key}>{item} s</Text>
                                                </TouchableOpacity>
                                    })
                                }
                            </View>
                            
                        </View>
                    </ScrollView>



                    <TextInput value={title} onChangeText={(text) => setTitle(text)} placeholder="Title ... " placeholderTextColor="white" style={{fontSize: 20, borderBottomColor: "white", borderBottomWidth: 1, width: 300, marginTop: 50, marginBottom: 20, justifyContent: "center"}} />
                    <TextInput placeholder="Write your message..." value={writeMessage} onChangeText={(text) => setWriteMessage(text)} style={{borderWidth: 2, borderColor: "white", width: 300, height: 150, fontSize: 20, textAlign: "auto", marginTop: 20, paddingBottom: 80, paddingLeft: 10}} placeholderTextColor="white"/>
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
                        <Button color= "white" title="Skip" onPress={() => setShowModalTwo(false)} />
                        </View>
                    <View style={{marginBottom: 10, flexDirection: "row", alignItems: "center", width: "60%", justifyContent: "space-between"}}> 
                        <Pressable onPress={() => addMessage()} style={{ height: 50, width: 130, backgroundColor: "#B5D8FF", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{color: "black", fontSize: 16}}>Send</Text>
                        </Pressable>
                        <Button color= "white" title="Skip" onPress={() => resetTimer()} />
                    </View>
                </View>
            </Modal>*/}

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalThree}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#004DA3"}}>
                    <Image source={require("../assets/blueBackground.png")} style={{height: 810, width: "100%", position: "absolute", bottom: 0}} />
                    <View style={{height: 500, alignItems: "center", width: "80%"}}>
                        <Text style={{fontSize: 30, color: "white", textAlign: "center"}}>Mindful message</Text>
                        <Text style={{fontSize: 22, color: "lightgrey", textAlign: "center", marginTop: 20}}>{messageGroup}</Text>

                        
                        
                    </View>
                    <View style={{position: "absolute", bottom: 0}}>
                        <View style={{width: "100%", alignItems: "center"}}>
                            <Pressable onPress={() => closeGroupMessage()} style={{ height: 60, width: 200, backgroundColor: "lightblue", borderRadius: 10, justifyContent: "center", alignItems: "center", position: "absolute", bottom: 40}}>
                                <Text style={{color: "black", fontSize: 16}}>Go back</Text>
                            </Pressable>
                        </View>
                    </View>
                    
                    {
                timer ? (
                    <View style={{alignItems: "center", backgroundColor: "lightblue", flex: 1, position: "absolute", top: 0, width: "100%", alignSelf: "center", height: "100%", justifyContent: "center"}}>
                        <Text style={{fontSize: 30, marginBottom: 30}}>Breath in</Text>
                        <CountdownCircleTimer
                            isPlaying={timer}
                            duration={groupTimer}
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
                ) : groupTimer ? 
                
                    (<View style={{flexDirection: "row", position: "absolute", bottom: 170, left: 0}}>
                        {
                            groupLink ? <Pressable onPress={() => Linking.openURL(groupLink)} style={{height: 100, width: 100, backgroundColor: "#FFB800", borderRadius: 70, marginHorizontal: 30, justifyContent: "center", alignItems: "center"}}>
                            <Image source={require("../assets/link.png")} style={{height: 50, width: 50}} />
                        </Pressable> : null
                        }
                        
                        <Pressable onPress={() => setTimer(true)} style={{height: 100, width: 100, backgroundColor: "#00D1FF", borderRadius: 70, justifyContent: "center", alignItems: "center", position: "absolute", left: 150, bottom: 0}}>
                            <Image source={require("../assets/meditate.png")} style={{height: 50, width: 50}} />
                        </Pressable>
                    </View>)
                    
                    
                    
                
                
                : null
            }
                    
                    
                    
                    
                   
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
                                <Pressable onPress={() => addTask()} style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", height: 50, width: 100, marginTop: 20, marginLeft: 40, borderRadius: 5}}>
                                    <Text>Save</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                </View> 
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={addTaskNoteGroup}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Pressable onPress={() => setAddTaskNoteGroup(false)} style={{height: 300, width: "95%", backgroundColor: "#004DA3", justifyContent: "center", alignItems: "center", borderRadius: 15}}>
                        <View style={{position: "absolute", top: 5, width: "100%", paddingLeft: 25 }}>
                            <View>
                                <Text style={{color: "#fff", fontWeight: "bold", fontSize: 25, marginTop: 20}}>Write a task for whole team</Text>
                                <TextInput autoFocus value={title} onChangeText={(text) => setTitle(text)} placeholder="Write your task . . ." placeholderTextColor="white" style={{fontSize: 17, marginTop: 20, borderBottomColor: "white", borderBottomWidth: 1, width: 200, paddingVertical: 8, color: "#fff"}} />
                                <TextInput value={writeMessage} onChangeText={(text) => setWriteMessage(text)} placeholder="Description" placeholderTextColor="white" style={{fontSize: 15, marginTop: 20, borderBottomWidth: 1, width: 200, paddingVertical: 8, borderBottomColor: "white", color: "#fff"}} />
                            </View>
                            
                            <Pressable onPress={() => addTaskGroup()} style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", height: 50, width: 80, borderRadius: 5, position: "absolute", right: 20, top: 115}}>
                                <FontAwesome name="send" size={24} color="black" />
                            </Pressable>
                            
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
    },

    inspirationContainer : {
        width: 300, backgroundColor: "#004DA3", justifyContent: "center", alignItems: "center", borderRadius: 20, height: 200
    }
})
