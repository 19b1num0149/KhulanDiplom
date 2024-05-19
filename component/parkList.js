import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import MapMarker from './mapMarker';

const ParkList=(props)=>{
    const {ParkName, ParkClosingTime,ParkOpeningTime, ParkCost, CurrentCapacity, onPress}=props;

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
            <View style={styles.row}>
            <Image source={require('../assets/Park1.jpg')} style={styles.image}></Image>
                <View style={styles.textContainer}>
                   
                    <Text style={styles.title}>{ParkName}</Text>
                    <View style={styles.row}>
                    <Text style={styles.text}> Нээх цаг</Text>
                    <Text style={[styles.text, {color:'green', fontWeight: 'bold'}]}> {ParkOpeningTime}</Text>
                    </View>
                    <View style={styles.row}>
                    <Text style={styles.text}> Хаах цаг </Text>
                    <Text style={[styles.text, {color:'green', fontWeight: 'bold'}]}> {ParkClosingTime}</Text>
                    </View>
                    <Text style={styles.text}>Цагийн төлбөр:</Text>

                    <View style={styles.row}>
                    <Text style={styles.text}> * 1 цагийн: -> </Text>
                    <Text style={[styles.text, {color:'green', fontWeight: 'bold'}]}> {ParkCost}</Text>
                    </View>
                    </View>
                    <View style={styles.slot}><Text style={{ fontSize: 13,color: 'white', fontWeight: 'bold',}}>{CurrentCapacity}</Text>
                    </View>
                </View>
                </TouchableOpacity>
                
            </View>

    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        padding: 20,

    },
    container: {
        justifyContent: 'center',
        height: 100,
        width: '100%',
        padding: 15,
        borderColor: '#D0D0D0',
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 15,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold'


    },
    textContainer: {
        marginLeft: 10,
        height: '100%',
        borderRightWidth: 1,
        borderColor: 'Grey',
        paddingRight: 5,
        width: '60%'

    },
    row: {
        flexDirection: 'row',
        marginBottom: 0,
        width: 300

    },
    image: {
        height: 70,
        width: '35%',
        objectFit: 'cover',
        borderRadius: 5
    },
    slot: {
        marginLeft: 10,
        marginTop: 20,
        backgroundColor: 'green',
        height:30,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        

    }
})
export default ParkList