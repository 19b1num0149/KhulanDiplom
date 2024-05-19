import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';



const HomeScreenList =() =>{
    return(
        <View style={styles.body}>
        <View style={styles.container}>
            <View style={styles.row}>
                <View>
                    <Image source={require('../assets/Park1.jpg')} style={styles.image}></Image>
                    <Text style={styles.text}>Zogsool 1</Text>
                    <Text style={styles.text}>Tsagiin huvaari</Text>
                    <Text style={styles.text}>Tsaggin tukbur</Text>

                </View>
                <Text style={align}> Sul 5</Text>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        padding: 20,

    },
    container: {   
        height: 250,
        width: 400,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 20,
        borderColor: 'black',
        borderRadius: 25,
        borderWidth: 1,
    },
    text: {
       padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 0,

    },
    image: {
        borderRadius: 10,
        height: 200,
        width: 20,
    }
})
export default HomeScreenList