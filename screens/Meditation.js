import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const Meditation = () => {

    const [timer, setTimer] = useState(true);

    

    return (
        <View style={{padding: 20, flex: 1, backgroundColor: timer ? "lightblue" : "white"}}>
            {
                timer ? (
                    <Text></Text>
                ) : <Text>Meditation</Text>
            }
            
            <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
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
            </View>

           
        </View>
    )
}

export default Meditation

const styles = StyleSheet.create({})
