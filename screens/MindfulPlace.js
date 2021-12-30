import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity, Keyboard, Modal, Dimensions, SafeAreaView, Animated, Button, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../firebase';
import * as firebase from "firebase";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useEffect } from 'react/cjs/react.development';
import dataLinks from './dataLinks';
import dataLinksTwo from './dataLinksTwo';
import dataLinksThree from './dataLinksThree';
import { FontAwesome } from '@expo/vector-icons';
import Ideas from '../components/Ideas';
import Package from '../components/Package';
import ShowIdeas from "../components/ShowIdeas"




const MindfulPlace = ({navigation, route}) => {


  const [input, setInput] = useState(null);
  const [clicked, setClicked] = useState(true);
  const [messages, setMessages] = useState([]);
  const [showLink, setShowLink] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [inputLink, setInputLink] = useState("");
  const [breathingTimer, setBreathingTimer] = useState("");
  const [timer, setTimer] = useState(false);
  const [meditationTimer, setMeditationTimer] = useState("");
  const [mindfulMessage, setMindfulMessage] = useState("");
  const [message, setMessage] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const [mindMessage, setMindMessage] = useState(false);
  const [infoButton, setInfoButton] = useState(false);
  const [link, setLink] = useState(false);
  const [randomMeditation, setRandomMeditation] = useState("Find new Mindful content")
  const [randomBusiness, setRandomBusiness] = useState("Find new Business content")
  const [randomHelp, setRandomHelp] = useState("Find new Self-help content")
  const [linkClick, setLinkClick] = useState("");
  const [linkClickTwo, setLinkClickTwo] = useState("");
  const [linkClickThree, setLinkClickThree] = useState("");
  const [countDown, setCountDown] = useState(null);
  const [breathText, setBreathText] = useState("Breath In");
  const [pasteLink, setPasteLink] = useState(false);

  const [saveItem, setSaveItem] = useState("");

  const [randomLink, setRandomLink] = useState("");

  const [accountability, setAccountability] = useState(false);

  const [color, setColor] = useState("#257CFF");

  const [greenButton, setGreenButton] = useState(false);

  const [creativityOn, setCreativityOn] = useState(false);

  const [create, setCreate] = useState("");
  
  const [wawa, setWawa] = useState("");

  const [ideaInput, setIdeaInput] = useState("");

  const [allIdeas, setAllIdeas] = useState("");
  const [getIdeas, setGetIdeas] = useState([]);
  const [notification, setNotification] = useState(true);

  const [seeIdeas, setSeeIdeas] = useState([]);

  const [barvaIkone, setBarveIkone] = useState("");
  const [ikona, setIkona] = useState("");

  const plusIdea = () => {
    setBarveIkone("#11FF1B");
    setIkona("plus");
  }

  const minusIdea = () => {
    setBarveIkone("#FF5311");
    setIkona("minus");
  }

  const newIdea = () => {
    setBarveIkone("#FFB613");
    setIkona("lightbulb-o");
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

  const links = ["https://www.youtube.com/1", "https://www.youtube.com/2", "https://www.youtube.com/3"];

  
  const {id} = route.params;
  const {leaderButton} = route.params;


  const sendMessage = () => {
    db.collection("groups").doc(id).collection("chats").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      meditation: mindMessage,
      link: link,
      creativity: greenButton
    })

    Keyboard.dismiss();

    setInput("");
    setMindMessage(false);
    setGreenButton(false);
  }


  const betterIdea = () => {
    db.collection("groups").doc(id).collection("chats").doc(wawa).collection("ideas").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      newIdeas: ideaInput,
      iconColor: barvaIkone,
      iconIdea: ikona
    })

    db.collection("groups").doc(id).collection("chats").doc(wawa).update({
      notification: true,
    })

    setCreativityOn(false);
    setBarveIkone("");
    setIkona("");
    setIdeaInput("");
  }

  const sendLink = () => {
    db.collection("groups").doc(id).collection("chats").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      link: inputLink,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      message: linkMessage,
    })

    setShowLink(false);
  }

  const sendMeditation = () => {
    db.collection("groups").doc(id).collection("chats").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      meditation: breathingTimer,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      message: mindMessage,
    })

    setShowMeditation(false);
  }


  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("groups")
      .doc(id)
      .collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),

          }))
      ));


    return unsubscribe;
  }, [route])


  const signOutUser = () => {
    auth.signOut().then(() => {
        navigation.replace("Login")
    })
}

  


  const openMeditation = (id) => {
    db.collection("groups").doc(route.params.id).collection("chats").doc(id).get()
            .then((doc) => {
                if (doc.exists) {
                    setMeditationTimer(doc.data().meditation);
                    setMessage(doc.data().message)
                }
              })
            .catch(error => {
              console.log('firebase Error::'+error)
            })
    
    animateBall()
    setTimer(true);
  }


  const updateMessage = (id) => {
    db.collection("groups").doc(route.params.id).collection("chats").doc(id).update({
      odgovornost: true,
    })

    setAccountability(false);
    setGreenButton(false);
  }

  const reset = () => {
    setTimer(false);
    setMeditationTimer(null);
  }
  

  const pressMeditation = () => {
    setMindMessage(!mindMessage)
    setClicked(true);
    setGreenButton(false);
    setAccountability(false);
    setPasteLink(false);
  }

  const pressLink = () => {
    setMindMessage(false)
    setClicked(!clicked);
    setLink(!link);
    setPasteLink(!pasteLink)
  }

  const pressLinkDown = () => {
    setMindMessage(false)
    setClicked(!clicked);
    setLink(!link);
    setInput(null);
    setPasteLink(!pasteLink)
    
  }

  const randomLinkGenerator = () => {
    const randomNumber = Math.floor(Math.random()*dataLinks.length)
    setRandomMeditation(dataLinks[randomNumber].title)
    setInput(dataLinks[randomNumber].link)
    setLinkClick(dataLinks[randomNumber].link);
  }

  const randomLinkGeneratorTwo = () => {
    const randomNumber = Math.floor(Math.random()*dataLinksTwo.length)
    setRandomBusiness(dataLinksTwo[randomNumber].title)
    setInput(dataLinksTwo[randomNumber].link)
    setLinkClickTwo(dataLinksTwo[randomNumber].link);
  }

  const randomLinkGeneratorThree = () => {
    const randomNumber = Math.floor(Math.random()*dataLinksThree.length)
    setRandomHelp(dataLinksThree[randomNumber].title)
    setInput(dataLinksThree[randomNumber].link)
    setLinkClickThree(dataLinksThree[randomNumber].link);
  }


const taskAnimated = useRef(
    new Animated.Value(50),
    
).current;

const animateBall = () => {
    Animated.timing(taskAnimated, {
        toValue: 180,
        duration: 3000,
        useNativeDriver: false
    }).start(() => {
      setCountDown(1)
      setBreathText("");
    })
    
    
}

const animateBallTwo = () => {
  setBreathText("Breath In");
  Animated.timing(taskAnimated, {
      toValue: 180,
      duration: 3000,
      useNativeDriver: false
  }).start(() => {
    setCountDown(countDown + 1)
    setBreathText("");
  })
  
  
}


const animateBallBack = () => {
    Animated.timing(taskAnimated, {
        toValue: 50,
        duration: 3000,
        useNativeDriver: false
    }).start(() => {
      if (countDown === 3) {
        setTimer(false)
        setBreathText("Breath In")
      } else {
        animateBallTwo()
      }
     
    })
    
    
}

const taskAnimation = {
    height: taskAnimated,
    width: taskAnimated
}


const backAnimation = () => {
  animateBallBack();
  setCountDown(null);
  setBreathText("Breath Out");
  
}


{/*const taskAnimatedTwo = useRef(
  new Animated.Value(200),
  
).current;

const animateBallTwoo = () => {
  Animated.timing(taskAnimatedTwo, {
      toValue: 300,
      duration: 3000,
      useNativeDriver: false
  }).start(() => {
    animateBallBackTwo()
  })
  
  
}


const animateBallBackTwo = () => {
  Animated.timing(taskAnimatedTwo, {
      toValue: 200,
      duration: 3000,
      useNativeDriver: false
  }).start(() => {
    animateBallTwoo()
  })
}




const taskAnimationTwo = {
  height: taskAnimatedTwo,
  width: taskAnimatedTwo
}*/}



const chatToTodo = () => {
  setSaveItem(data.message);
  navigation.navigate("Todo", {saveItem});

}



const greenButtonOn = () => {
  setGreenButton(!greenButton);
  setMindMessage(false);
}

const clickCreativity = () => {
  setCreativityOn(true);
  
}


const openCreativity = (id) => {
  const unsubscribe = db.collection("groups").doc(route.params.id).collection("chats").doc(id).get()
          .then((doc) => {
              if (doc.exists) {
                  setCreate(doc.data().message)
              }
            })
          .catch(error => {
            console.log('firebase Error::'+error)
          })
  
  setWawa(id)
  setCreativityOn(true);


  db.collection("groups").doc(route.params.id).collection("chats").doc(id).collection("ideas").onSnapshot((snapshot) =>
          setSeeIdeas(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
  )

  return unsubscribe;
}


const myCreativity = (id) => {
  const unsubscribe = db.collection("groups").doc(route.params.id).collection("chats").doc(id).collection("ideas").onSnapshot((snapshot) => 
      setGetIdeas(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
      }))
      )
  )
  
  db.collection("groups").doc(route.params.id).collection("chats").doc(id).update({
    notification: false,
  })

  setAllIdeas(true);

  return unsubscribe;
}

const closeIdea = () => {
  setCreativityOn(false);
  setIdeaInput("");
  setBarveIkone("");
  setIkona("");
}
  

  return (
    <View style={styles.container}>
      
      <Text style={{fontSize: 22, paddingTop: 20, fontWeight: "600", paddingVertical: 5, textAlign: "center", width: "80%"}}>Mindful Place</Text>
      <TouchableOpacity onPress={signOutUser} style={{position: "absolute", left: 20, top: 38}}>
        <AntDesign name="logout" size={20} color="black" />
      </TouchableOpacity>
      
      <ScrollView style={{width: "90%", height: 200, backgroundColor: "#F9F9F9", marginTop: 10, borderRadius: 10}}>
        
        {
          
          clicked ? (
            <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
              {
                messages.map(({ id, data }) => 
                  data.email === auth.currentUser.email ? (
                    <View key={id} style={[styles.receiver, {backgroundColor: data.link ? "#E5E5E5" : data.meditation ? "#E5E5E5" : "#E5E5E5", borderColor: "#15eabc", borderWidth: data.notification ? 2 : 0}]}>
                      
                      {
                        data.creativity ? (
                          <TouchableOpacity onPress={() => myCreativity(id)} style={{flexDirection: "row", alignItems: "center"}}><Text style={{fontWeight: "500", paddingRight: 5}}>{data.message}</Text><Ionicons name="bulb" size={24} color="black" /></TouchableOpacity>
                        ) : data.meditation ? (
                          <TouchableOpacity style={{flexDirection: "row", alignItems: "center", }} onPress={() => openMeditation(id)}>
                           { data.message ? (<Text>{data.message}</Text>) : <Text>Be Mindful</Text>}
                            <MaterialCommunityIcons style={{marginLeft: 5}} name="meditation" size={30} color="black" />
                          </TouchableOpacity>
                        ) : <Text style={styles.receiverText}>{data.message}</Text>
                      }
                    </View>
                  ) : (
                    <View key={id}>
                      <Text style={styles.senderName}>{data.displayName}</Text>
                      <View style={[styles.sender, {backgroundColor: data.creativity ? "#15eabc" : data.meditation ? "#FFCB7D" : color, borderColor: "black", borderWidth: accountability ? 2 : 0}]}>
                      
                        {
                          data.creativity ? (
                            <TouchableOpacity onPress={() => openCreativity(id)} style={{flexDirection: "row", alignItems: "center"}}>
                              <Text style={{fontWeight: "500", marginRight: 5}}>{data.message}</Text>
                              <Ionicons name="bulb-outline" size={24} color="black" />
                              
                            </TouchableOpacity>
                          ) : data.meditation ? (
                            <Pressable style={{flexDirection: "row", alignItems: "center", }} onPress={() => openMeditation(id)}>
                              { data.message ? (<Text>{data.message}</Text>) : <Text>Be Mindful</Text>}
                              <MaterialCommunityIcons style={{marginLeft: 5}} name="meditation" size={30} color="black" />
                            </Pressable>
                          ) :  accountability ? (<Pressable onPress={() => updateMessage(id)}><Text style={styles.senderText}>{data.message}</Text></Pressable>)
                            : (<Text style={styles.senderText}>{data.message}</Text>)
                        }
                        
                      </View>
                    </View>
                  )
                )}
                
            </ScrollView>
          )
          
          
          : (
          <View style={{alignItems: "left"}}>
            <Text style={{fontSize: 18, textAlign: "center", width: 250, paddingTop: 20, alignSelf: "center", fontWeight: "600"}}>Discover new content for you and your team</Text>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 50, marginLeft: 20}}>
              <TouchableOpacity onPress={randomLinkGenerator}>
                <Image source={require("../assets/meditationLink.png")} style={{height: 70, width: 70}} />
              </TouchableOpacity>
              <Pressable onPress={() => Linking.openURL(linkClick)}>
                <Text style={{fontSize: 15, marginLeft: 15, width: 200}}>{randomMeditation}</Text>
              </Pressable>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 20, marginLeft: 20}}>
              <TouchableOpacity onPress={randomLinkGeneratorTwo}>
                <Image source={require("../assets/businessLink.png")} style={{height: 70, width: 70}} />
              </TouchableOpacity>
              <Pressable onPress={() => Linking.openURL(linkClickTwo)}>
                <Text style={{fontSize: 15, marginLeft: 15, width: 200}}>{randomBusiness}</Text>
              </Pressable>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", marginTop: 20, marginLeft: 20}}>
              <TouchableOpacity onPress={randomLinkGeneratorThree}>
                <Image source={require("../assets/development.png")} style={{height: 70, width: 70}} />
              </TouchableOpacity>
              <Pressable onPress={() => Linking.openURL(linkClickThree)}>
                <Text style={{fontSize: 15, marginLeft: 15, width: 200}}>{randomHelp}</Text>
              </Pressable>
            </View>
            
            {/*<View style={{width: 300, height: 200, backgroundColor: "#EAEAEA", marginTop: 30, alignItems: "center", borderRadius: 30}}>
                    <ScrollView 
                        decelerationRate={0}
                        horizontal
                        snapToAlignment="center"
                        snapToInterval={300}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{flexDirection: "row", alignItems: "center", width: 300, }}>
                            <Image source={require("../assets/meditationLink.png")} style={{height: 80, width: 80, marginHorizontal: 20}} />
                            <Text style={{width: 150, marginHorizontal: 10, color: "black", fontSize: 18}}>4 stages of life</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", width: 300, }}>
                            <Image source={require("../assets/businessLink.png")} style={{height: 80, width: 80, marginHorizontal: 20}} />
                            <Text style={{width: 150, marginHorizontal: 10, color: "black", fontSize: 18}}>Habits of a billionaire</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", width: 300, }}>
                            <Image source={require("../assets/development.png")} style={{height: 80, width: 80, marginHorizontal: 20}} />
                            <Text style={{width: 150, marginHorizontal: 10, color: "black", fontSize: 18}}>5 Strategies To TRAIN Your Mind For Unlimited SUCCESS</Text>
                        </View>
                        
                    </ScrollView>
                   
            </View>
            <Text style={{fontSize: 20, paddingTop: 30}}>Random link</Text>
            <View style={{flexDirection: "row", marginTop: 20}}>
              <View style={{alignItems: "center"}}>
                <Image source={require("../assets/meditationLink.png")} style={{height: 70, width: 70, marginHorizontal: 10}} />
                <Text style={{color: "grey", marginTop: 10, fontSize: 12}}>Mindfulness</Text>
              </View>
              <View style={{alignItems: "center"}}>
                <Image source={require("../assets/businessLink.png")} style={{height: 70, width: 70, marginHorizontal: 10}} />
                <Text style={{color: "grey", marginTop: 10, fontSize: 12}}>Business</Text>
              </View>
              <View style={{alignItems: "center"}}>
                <Image source={require("../assets/development.png")} style={{height: 70, width: 70, marginHorizontal: 10}} />
                <Text style={{color: "grey", marginTop: 10, fontSize: 12}}>Self-help</Text>
          </View>
            </View>*/}
            <View style={{height: 40}} />
          {/*<TouchableOpacity onPress={() => setShowMeditation(!showMeditation)} style={{flexDirection: "row", paddingLeft: 20, alignItems: "center", marginTop: 30}}>
            <View style={{height: 50, width: 50, backgroundColor: "#FFCB7D", borderRadius: 30, justifyContent: "center", alignItems: "center"}}>
              <MaterialCommunityIcons name="meditation" size={24} color="white" />
            </View>
            <Text style={{marginLeft: 20}}>
              Take the time for meditation
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setShowLink(!showLink)} style={{flexDirection: "row", paddingLeft: 20, alignItems: "center", marginTop: 30}}>
            <View style={{height: 50, width: 50, backgroundColor: "#15eabc", borderRadius: 30, justifyContent: "center", alignItems: "center"}}>
              <AntDesign name="link" size={24} color="white" />
            </View>
            <Text style={{marginLeft: 20}}>
              Share something to your team
            </Text>
          </TouchableOpacity>
          <View style={{borderBottomColor: "lightgrey", borderBottomWidth: 1, paddingTop: 40, width: "85%", alignSelf: "center"}} />
          <Text style={{color: "grey", paddingTop: 30, width: "70%", alignSelf: "center", textAlign: "center", fontSize: 16}}>"Gratitude is wine for the soul. Go on, get drunk."</Text>*/}
        </View>)}
        
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{width: "93%", marginTop: 10, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        {
          link ? (
              <TouchableOpacity onPress={pressLinkDown} style={{marginLeft: 10}}>
                  <MaterialIcons name="cancel" size={33} color={link ? "black" : "#676767"} />
              </TouchableOpacity>
          ) : <TouchableOpacity onPress={greenButtonOn} style={{backgroundColor: greenButton ? "black" :  "#676767", borderRadius: 30, height: 27, width: 27, justifyContent: "center", alignItems: "center", marginLeft: 10}}>
                 <Ionicons name="bulb-outline" size={20} color={"#fff"} />
              </TouchableOpacity>
          }
        <TouchableOpacity onLongPress={() => setInfoButton(!infoButton)} onPress={pressMeditation} style={{backgroundColor: mindMessage ? "black" :  "#676767", borderRadius: 30, height: 27, width: 27, justifyContent: "center", alignItems: "center", marginHorizontal: 15}}>
          <MaterialCommunityIcons name="meditation" size={20} color="white" />
        </TouchableOpacity>
        <TextInput placeholder={"Aa"} placeholderTextColor={"grey"} style={{backgroundColor: mindMessage ? "#FFCB7D" : greenButton ? "#15eabc" : "#F2F2F2", borderRadius: 20, flex: 1, height: 35, paddingLeft: 10}} value={input} onChangeText={(text) => setInput(text)} />
        <TouchableOpacity onPress={sendMessage} style={{paddingLeft: 20}}>
            <Ionicons name="send" size={28} color="#676767" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
      <View style={{marginTop: 20}}>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => navigation.navigate("Todo", {id, leaderButton})} style={{height: 70, width: 150, backgroundColor: "#FF8E8E", marginRight: 10, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 20}}>Business</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Mindful")} style={{height: 70, width: 150, backgroundColor: "#8EBBFF", marginLeft: 10, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 20}}>Mindful</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      
      <StatusBar style="auto" />

      {
        timer ? (
          <View style={{alignItems: "center", backgroundColor: "lightblue", flex: 1, position: "absolute", top: 0, width: Dimensions.get("screen").width, alignSelf: "center", height: Dimensions.get("screen").height , justifyContent: "center"}}>
              
              
              <Text style={{position: "absolute", top: 180, fontSize: 30, fontWeight: "500"}}>{breathText}</Text>
              
              <Animated.View style={[styles.circle, taskAnimation]}></Animated.View>
               
              {
                countDown ? (<CountdownCircleTimer
                  isPlaying={countDown}
                  duration={5}
                  strokeWidth={15}
                  size={220}
                  onComplete={() => backAnimation()}
                  
                  colors={[
                    ['#FF9898', 0.33],
                    ['#FF5454', 0.33],
                    ['#FF0000', 0.33],
                  
                  ]}
              >
                  {({ remainingTime, animatedColor }) => (
                  <Animated.Text style={{ color: "white" }}>
                      <Text style={{fontSize: 20}}>Hold</Text>
                  </Animated.Text>
                  )}
              </CountdownCircleTimer>) : null
              }
              <Text style={{position: "absolute", bottom: 100, fontSize: 20}}>3 deep breaths in and out</Text>
          </View>
        ) : null
        
        

      } 
                    

      <Modal
        animationType="slide"
        transparent={true}
        visible={showLink}
      >
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#056FE5"}}>
            <View style={{alignItems: "center"}}>
              <Text style={{color: "#fff", fontSize: 30, fontWeight: "500"}}>Self development</Text>
              <Text style={{color: "lightgrey", fontSize: 18, width: 300, textAlign: "center", paddingTop: 15}}>Find new awesome content for you and your team</Text>
            </View>
            <View style={{height: 200}}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{paddingTop: 50}}>
                <View style={{height: 120, width: 120, backgroundColor: "#B5D8FF", marginHorizontal: 10}} />
                <View style={{height: 120, width: 120, backgroundColor: "#B5D8FF", marginHorizontal: 10}} />
                <View style={{height: 120, width: 120, backgroundColor: "#B5D8FF", marginHorizontal: 10}} />
                <View style={{height: 120, width: 120, backgroundColor: "#B5D8FF", marginHorizontal: 10}} />
              </ScrollView>
            </View>
            <View style={{alignItems: "center", paddingTop: 10}}>
              <Text style={{fontSize: 25, color: "#fff"}}>Random Link</Text>
              <View style={{flexDirection: "row", paddingTop: 20}}>
                <TouchableOpacity onPress={() => setInputLink(links[Math.floor(Math.random()*links.length)])} style={{height: 80, width: 80, backgroundColor: "#FFA4A4", borderRadius: 40, justifyContent: "center", alignItems: "center", marginHorizontal: 10}}>
                  <Text>Mindful</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 80, width: 80, backgroundColor: "#00F0FF", borderRadius: 40, justifyContent: "center", alignItems: "center", marginHorizontal: 10}}>
                  <Text>Business</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 80, width: 80, backgroundColor: "#689BFF", borderRadius: 40, justifyContent: "center", alignItems: "center", marginHorizontal: 10}}>
                  <Text>Self-help</Text>
                </TouchableOpacity>
              </View>
              <View style={{paddingTop: 20, flexDirection: "row", alignItems: "center", paddingBottom: 80}}>
                <TextInput value={inputLink} style={{height: 40, width: 280, borderColor: "white", borderWidth: 2, color: "white", paddingHorizontal: 12}} />
                <TouchableOpacity onPress={sendLink}>
                  <Feather name="send" size={24} color="white" style={{paddingHorizontal: 10}} />
                </TouchableOpacity>
                
              </View>
              <TextInput value={linkMessage} onChangeText={(text) => setLinkMessage(text)} placeholder="Write a message ..." style={{height: 50, width: 200, borderColor: "#fff", borderWidth: 2, position: "absolute", bottom: 10}} />
            </View>
            <TouchableOpacity onPress={() => setShowLink(!showLink)} style={{position: "absolute", bottom: 30}}>
              <AntDesign name="closecircle" size={50} color="#B5D8FF" />
            </TouchableOpacity>
        </View>
      </Modal>

      {/*<Modal
        animationType="slide"
        transparent={true}
        visible={showMeditation}
      >
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#056FE5"}}>
            
            <View style={{height: 500, width: Dimensions.get("screen").width, justifyContent: "center", alignItems: "center"}}>
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
            <TextInput placeholder="Write a message..." style={{height: 50, width: 250, borderColor: "white", borderWidth: 2, paddingHorizontal: 10}} placeholderTextColor="white" value={mindfulMessage} onChangeText={(text) => setMindfulMessage(text)} />
            <Pressable onPress={sendMeditation} style={{height: 50, width: 100, backgroundColor: "#B5D8FF", marginBottom: 150, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 20}}>
              <Text>Send</Text>
            </Pressable>
            <TouchableOpacity onPress={() => setShowMeditation(!showMeditation)} style={{position: "absolute", bottom: 30}}>
              <AntDesign name="closecircle" size={50} color="#B5D8FF" />
            </TouchableOpacity>
        </View>
      </Modal>*/}

      <Modal
        animationType="fade"
        transparent={true}
        visible={infoButton}
      >
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", width: Dimensions.get("screen").width, height: Dimensions.get("screen").height}}>
          <Pressable onPress={() => setInfoButton(false)} style={{height: 200, width: 280, backgroundColor: "grey", justifyContent: "center", alignItems: "center", borderRadius: 20}}>
            <Text style={{color: "#fff", padding: 50, fontSize: 20}}>Use this button if you want to send a mindful message.</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={creativityOn}
      >
        <View  style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "white", justifyContent: "center", alignItems: "center"}}>
          
          <View style={{width: Dimensions.get("screen").width, height: "20%", backgroundColor: "white", alignItems: "center", borderRadius: 50, position: "absolute", top: 0}}>
                    <FontAwesome style={{position: "absolute", left: 10, top: "45%"}} name="chevron-left" size={24} color="black" />
                    <ScrollView 
                        decelerationRate={0}
                        horizontal
                        snapToAlignment="center"
                        snapToInterval={Dimensions.get("screen").width}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            seeIdeas.map(({id, data: {newIdeas, iconColor, iconIdea}}) => {
                                return <Ideas key={id} newIdeas={newIdeas} iconIdea={iconIdea} iconColor={iconColor}/>
                            })
                        }
                        
                    </ScrollView>
                    <FontAwesome style={{position: "absolute", right: 10, top: "45%"}} name="chevron-right" size={24} color="black" />
          </View>
                              
          <View style={{ backgroundColor: "#1C99EE", width: "100%", height: "80%", alignItems: "center", position: "absolute", bottom: 0, justifyContent: "center", paddingBottom: 40, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            
            <View style={{width: "100%", alignItems: "center"}}>
              <Text style={{fontWeight: "bold", marginTop: 50, fontSize: 25, color: "#fff"}}>Make the idea better</Text>
              <Text style={{fontSize: 12, color: "#D2D2D2", width: "80%", marginTop: 10, textAlign: "center"}}>What can you add, decrease or create to make this idea a little bettter?</Text>
              <TextInput onChangeText={(text) => setIdeaInput(text)} value={ideaInput} placeholder="Write your idea ... " placeholderTextColor="black" style={{height: 150, width: "80%", backgroundColor: "#fff", marginTop: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 100, paddingLeft: 15}} />
              <View style={{height: 50, width: 100, backgroundColor: "#F1F1F1", width: "80%", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: "space-around", flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity onPress={plusIdea} style={{height: 35, width: 35, backgroundColor: barvaIkone === "#11FF1B" ? "black" : "#11FF1B", justifyContent: "center", alignItems: "center", borderRadius: 30}}>
                  <FontAwesome name="plus" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={minusIdea} style={{height: 35, width: 35, backgroundColor: barvaIkone === "#FF5311" ? "black" : "#FF5311", justifyContent: "center", alignItems: "center", borderRadius: 30}}>
                  <FontAwesome name="minus" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={newIdea} style={{height: 35, width: 35, backgroundColor: barvaIkone === "#FFB613" ? "black" : "#FFB613", justifyContent: "center", alignItems: "center", borderRadius: 30}}>
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Pressable onPress={closeIdea} style={{height: 50, width: 50, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", marginTop: 20, borderRadius: 25, marginRight: 5}}>
                  <Text style={{fontWeight: "bold"}}>X</Text>
                </Pressable>
                <Pressable disabled={ideaInput === ""} onPress={betterIdea} style={{marginLeft: 5, marginTop: 20, height: 50, width: 150, borderRadius: 50, backgroundColor: "#36A4F0", alignItems: "center", justifyContent: "center"}}>
                  <Text style={{color: "#fff"}}>SEND</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={allIdeas}
      >
        <View onPress={() => setAllIdeas(false)} style={{height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, backgroundColor: "#1C99EE", justifyContent: "center", alignItems: "center"}}>
          
          <Text style={{fontSize: 30, color: "#fff", marginTop: 50}}>All Ideas :</Text>
          <ScrollView showsVerticalScrollIndicator="false" contentContainerStyle={{marginTop: 30, width: "100%", alignItems: "center"}}>
            {
              getIdeas.map(({id, data: {newIdeas, iconIdea, iconColor}}) => {
                return <ShowIdeas key={id} newIdeas={newIdeas} iconIdea={iconIdea} iconColor={iconColor} />
              })
            }                    
          </ScrollView>
         <Button title="Back" onPress={() => setAllIdeas(false)} />
        </View>
      </Modal>
      
    </View>
  );
}

export default MindfulPlace

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 12,
    flex: 1
  },

  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative"
  },

  sender: {
    padding: 15,
    backgroundColor: "#257CFF",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 15,
    maxWidth: "80%",
    position: "relative"
  },

  senderName: {
    
    paddingRight: 10,
    fontSize: 12,
    color: "grey",
    marginLeft: 20,
    marginTop: 8
  },

  senderText: {
    color: "white",
    marginBottom: 0,
    
    fontWeight: "500"
  },

  circle: { 
    backgroundColor: "blue", 
    borderRadius: 200,
    position: "absolute"
  }
});
