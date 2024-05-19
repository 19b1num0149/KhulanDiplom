import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function Header(params) {
    return(
        <View style={styles.container}>
            <Image source={require('../assets/menu.png')} />
            <Text>Улаанбаатар</Text>
            <Text>       </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: 90,
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems:"center",
      paddingHorizontal: 15,
      paddingTop: 50,
      paddingBottom: 10,
      backgroundColor: 'white'
      
      
    },
    map: {
      flex: 1,
    },
  });