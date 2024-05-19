    import React from "react";
    import { View, Image, Text, StyleSheet } from "react-native";
    import { useNavigation } from '@react-navigation/native';
    import { Entypo ,MaterialIcons,Ionicons} from '@expo/vector-icons';

    
    export default Footer=()=> {
        const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <View style={styles.sideContainer}>
             <MaterialIcons name="history" size={30} color="#C4C4C4" style={styles.icon} onPress={()=> navigation.navigate('History')}/>
         </View>
         <View style={{borderRadius: 50, height: 90, width: 90,color: 'white'}}>
         <View style={styles.icContainer}>
             <Entypo name="home" size={30} color="white" style={styles.icon} onPress={()=> navigation.navigate('Home')} />
         </View>
         </View>
         <View style={styles.rightContainer}>
             <Ionicons name="person" size={30} color="#C4C4C4" style={styles.icon} onPress={()=> navigation.navigate('User')}/>
         </View>
      
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    sideContainer:{
        position: 'absolute',
        top: 20,
        left: '20%',
    },

    rightContainer:{
        position: 'absolute',
        top: 20,
        right: '20%',

    },

    icContainer: {
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: '#5754FF',
        alignItems: 'center',
        borderColor: '#F4F4F4' ,
        borderWidth: 10,
    
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        


    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    });
