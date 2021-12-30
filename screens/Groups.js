import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, Pressable, TextInput, Image, ImageBackground, Dimensions, Linking} from 'react-native'
import { db, auth } from '../firebase'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Groups = ({navigation}) => {


    const [groups, setGroups] = useState([]);
    const [join, setJoin] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalDeleteJoin, setShowModalDeleteJoin] = useState(false);
    const [input, setInput] = useState("");
    const [groupNumber, setGroupNumber] = useState("");
    const [joinNumber, setJoinNumber] = useState("");
    const [clicked, setClicked] = useState(false);

    const [leaderButton, setLeaderButton] = useState(true);

    const [changed, setChanged] = useState(false);

    const [inviteClicked, setInviteClicked] = useState(false);

    
  

    // Get your group you created from the firebase
    useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("teams").onSnapshot((snapshot) => 
        setGroups(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])


    // Get the group you joined from the firebase
    useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("join").onSnapshot((snapshot) => 
        setJoin(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])


    // Create new group
    const addGroupTeam = () => {
        db.collection("users").doc(auth.currentUser.uid).collection("teams").add({
            
        })

        setClicked(true);

    }


    // Join the group
    const addGroupJoin = () => {
        db.collection("users").doc(auth.currentUser.uid).collection("join").add({
            id: input,
            
        })

        setShowModal(false)

        setClicked(true);

    }

    // Get the number of groups you have created
    useEffect(() => {
        db.collection("users").doc(auth.currentUser.uid).collection("teams").get().then((querySnapshot) => {
            return setGroupNumber(querySnapshot.size)
        }     
            
        );
        
        
    }, [clicked])


    // Get the number of groups you have joined
    useEffect(() => {
        db.collection("users").doc(auth.currentUser.uid).collection("join").get().then((querySnapshot) => {
            return setJoinNumber(querySnapshot.size)
        }     
            
        );
        
        
    }, [clicked])


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing : true
        })

        if(!result.cancelled){
            setImage(result.uri)
        }
    }
    


    const deleteGroup = () => {
        db.collection("users").doc(auth.currentUser.uid).collection("teams").doc(groups[0].id).delete();
        setShowModalDelete(false);
        setClicked(true);
    }

    const deleteGroupJoin = () => {
        db.collection("users").doc(auth.currentUser.uid).collection("join").doc(join[0].id).delete();
        setShowModalDeleteJoin(false);
        setClicked(true);
    }
    
    


    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center" , backgroundColor: inviteClicked ? "grey" : "#fff"}}>



            {
                groupNumber > 0 || joinNumber > 0 ? (
                    <View style={{alignItems: "center"}}>
                       
                        <View style={{marginBottom: 100}}>
                        {
                            groups.map(({id, data: {}}) => {
                                return <View key={id} style={{marginVertical: 10, marginTop: 40, flexDirection: "row", alignItems: "center"}}>
                                            <TouchableOpacity style={{paddingRight: 30}} onPress={() => navigation.navigate("MindfulPlace", {id, leaderButton})}>
                                                <Image source={require("../assets/groupAvatar.png")} style={{height: 200, width: 200}} />
                                                <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                                                    <Text style={{fontSize: 25}} key={id}></Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{marginBottom: 30, width: 40}}>
                                                <TouchableOpacity onPress={() => setShowModalDelete(true)} >
                                                    <AntDesign name="delete" size={24} color="black" />
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => setInviteClicked(!inviteClicked)} style={{flexDirection: "row", alignItems: "center"}}>
                                                    <AntDesign name="adduser" size={26} color="black" style={{marginTop: 20}} />
                                                </TouchableOpacity>
                                                
                                               
                                            </View>
                                            
                                        </View>
                                        
                            })
                        }
                    
                        {
                            join.map(({data: {id}}) => {
                                return <View key={id} style={{marginVertical: 10, marginTop: 40, flexDirection: "row", alignItems: "center"}}>
                                        <TouchableOpacity style={{paddingRight: 30}} onPress={() => navigation.navigate("MindfulPlace", {id, leaderButton})}>
                                            <Image source={require("../assets/groupAvatar.png")} style={{height: 200, width: 200}} />
                                            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                                                <Text style={{fontSize: 25}} key={id}></Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{marginBottom: 30}}>
                                            
                                            <TouchableOpacity onPress={() => setShowModalDeleteJoin(true)}>
                                                <AntDesign name="delete" size={24} color="black" style={{marginTop: 15}} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                            })
                        }
                        </View>
                    </View>
                ) : <View style={{alignItems: "center"}}>
                        <Image source={require("../assets/noGroup.png")} style={{height: 200, width: 200}}  />
                        <View style={{marginBottom: 100}}>
                            <Text style={{marginTop: 40}}></Text>
                        </View>
                    </View>
            }

            
            <View style={{position: "absolute", bottom: 60}}>
                <View style={{flexDirection: "row"}}>
                    <Pressable disabled={groupNumber > 0 || joinNumber > 0} onPress={() => addGroupTeam()} style={{width: 130, height: 70, backgroundColor: groupNumber > 0 || joinNumber > 0 ? "grey" : "#029C88", justifyContent: "center", alignItems: "center", borderRadius: 10, marginRight: 10}}>
                        <Text style={{color: "#fff", fontSize: 16}}>Create</Text>
                    </Pressable>
                    <Pressable disabled={groupNumber > 0 || joinNumber > 0} onPress={() => setShowModal(true)} style={{marginLeft: 10, width: 130, height: 70, backgroundColor: "transparent", justifyContent: "center", alignItems: "center", borderRadius: 10, borderColor: groupNumber > 0 || joinNumber > 0 ? "grey" : "#029C88", borderWidth: 2}}>
                        <Text style={{color: groupNumber > 0 || joinNumber > 0 ? "grey" : "#029C88", fontSize: 16}}>Join</Text>
                    </Pressable>
                </View>
                {
                    groupNumber > 0 || joinNumber > 0 ? (
                        <Text style={{marginTop: 20, textAlign: "center", fontSize: 12, color: "grey"}}>You can only be in one group.</Text>
                    ) : null
                }
                
            </View>
            

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Pressable onPress={() => setShowModal(false)} style={{height: 200, width: 300, backgroundColor: "#004DA3", justifyContent: "center", alignItems: "center", borderRadius: 20}}>
                        <Text style={{color: "white", fontSize: 20}}>Write your group code</Text>
                        <TextInput autoCapitalize="none" onChangeText={(text) => setInput(text)} value={input} placeholder="Code . . . " style={{marginTop: 20, fontSize: 18}} placeholderTextColor="lightgrey" />
                        <Pressable onPress={() => addGroupJoin()} style={{backgroundColor: "orange", height: 45, width: 100, justifyContent: "center", alignItems: "center", marginTop: 30}}>
                            <Text style={{color: "black"}}>Join</Text>
                        </Pressable>
                    </Pressable>
                </View>
            </Modal>

            <Modal 
                animationType="fade"
                transparent={true}
                visible={showModalDelete}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Pressable style={{height: 200, width: 300, backgroundColor: "#A9E8DF", justifyContent: "center", alignItems: "center", borderRadius: 20}}>
                        <Text style={{color: "black", fontSize: 20, textAlign: "center", fontSize: 18, width: 200, marginBottom: 50}}>Are you sure you want to leave this group?</Text>
                        <View style={{flexDirection: "row", position: "absolute", bottom: 0, width: "100%"}}>
                            <TouchableOpacity onPress={() => setShowModalDelete(false)} style={{backgroundColor: "#03A38E", height: 60, width: "50%", justifyContent: "center", alignItems: "center", marginTop: 30, borderBottomLeftRadius: 20}}>
                                <Text style={{color: "white"}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteGroup()} style={{backgroundColor: "#00BDA5", height: 60, width: "50%", justifyContent: "center", alignItems: "center", marginTop: 30, borderBottomRightRadius: 20}}>
                                <Text style={{color: "red"}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </View>
            </Modal>

            <Modal 
                animationType="fade"
                transparent={true}
                visible={showModalDeleteJoin}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Pressable style={{height: 200, width: 300, backgroundColor: "#A9E8DF", justifyContent: "center", alignItems: "center", borderRadius: 20}}>
                        <Text style={{color: "black", fontSize: 20, textAlign: "center", fontSize: 18, width: 200, marginBottom: 50}}>Are you sure you want to leave this group?</Text>
                        <View style={{flexDirection: "row", position: "absolute", bottom: 0, width: "100%"}}>
                            <TouchableOpacity onPress={() => setShowModalDeleteJoin(false)} style={{backgroundColor: "#03A38E", height: 60, width: "50%", justifyContent: "center", alignItems: "center", marginTop: 30, borderBottomLeftRadius: 20}}>
                                <Text style={{color: "white"}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteGroupJoin()} style={{backgroundColor: "#00BDA5", height: 60, width: "50%", justifyContent: "center", alignItems: "center", marginTop: 30, borderBottomRightRadius: 20}}>
                                <Text style={{color: "red"}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={inviteClicked}
            >
                <Pressable onPress={() => setInviteClicked(false)} style={{padding: 30 ,position: "absolute", bottom: 0, backgroundColor: "white", width: "100%", height: 250, borderTopEndRadius: 20, borderTopStartRadius: 20}}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Your invite code:</Text>
                    {
                            groups.map(({id, data: {}}) => {
                                return <Text style={{marginTop: 10, fontSize: 17}} key={id}>{id}</Text>
                            })          
                        }
                    <View style={{flexDirection: "row", justifyContent: "center", position: "absolute", bottom: 50, width: Dimensions.get("screen").width}}> 
                        
                            {
                                groups.map(({id, data: {}}) => {
                                    return <Pressable onPress={() => Linking.openURL(`sms:&body=${id}`)} style={{height: 70, width: 70, backgroundColor: "#5DE458", borderRadius: 40, marginHorizontal: 5, justifyContent: "center", alignItems: "center"}} key={id}><Entypo name="message" size={40} color="white" /></Pressable>
                                })          
                            }
                        
                        
                            {
                                groups.map(({id, data: {}}) => {
                                    return <Pressable key={id} onPress={() => Linking.openURL(`mailto:?subject=Invite Code&body=${id}`)} style={{height: 70, width: 70, backgroundColor: "red", borderRadius: 40, marginHorizontal: 5, justifyContent: "center", alignItems: "center"}}><Foundation name="mail" size={40} color="white" /></Pressable>
                                })          
                            }
                        
                        
                        <Pressable style={{height: 70, width: 70, backgroundColor: "blue", borderRadius: 40, marginHorizontal: 5, justifyContent: "center", alignItems: "center"}}><FontAwesome5 name="facebook-messenger" size={30} color="white" /></Pressable>
                        <Pressable style={{height: 70, width: 70, backgroundColor: "green", borderRadius: 40, marginHorizontal: 5, justifyContent: "center", alignItems: "center"}}><FontAwesome name="whatsapp" size={40} color="white" /></Pressable>
                    </View>
                </Pressable>

            </Modal>
        </View>
    )
}

export default Groups

const styles = StyleSheet.create({})

