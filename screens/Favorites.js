import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Favorites = () => {
    return (
        <View style={{justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "#fff"}}>
            <Image source={require("../assets/favorites.jpg")} style={{height: 230, width: 300}} />
            <Text style={{color: "grey", marginTop: 40, fontSize: 17}}>You have no favorites</Text>
        </View>
    )
}

export default Favorites

const styles = StyleSheet.create({})
