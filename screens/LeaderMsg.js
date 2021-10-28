import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { db, auth } from '../firebase';

const LeaderMsg = ({route}) => {

    const [all, setAll] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("leader").onSnapshot((snapshot) => 
            setAll(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])

    return (
        <View>
            {
                all.map(({id, data: {leaderMessage}}) => {
                    return <Text id={id} key={id}>{leaderMessage}</Text>
                })
            }
        </View>
    )
}

export default LeaderMsg

const styles = StyleSheet.create({})
