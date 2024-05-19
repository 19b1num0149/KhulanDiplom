import  React, {useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text,TextInput, Image, KeyboardAvoidingView,TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const OrderInfo =(props) =>{
    const {ParkName, ParkClosingTime,ParkOpeningTime, ParkCost,TotalCapacity, CurrentCapacity, onPress}=props;
    const navigation = useNavigation();
  return(
        <View style={styles.container}>
          <Image source={require("../assets/Park1.jpg")} style={styles.image}/>
          
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
          <Image source={require('../assets/red_marker.png')} style={{height: 35,width:35,marginTop:10}}></Image>
          <Text style={styles.title}>{ParkName}</Text>
          </View>

          <View style={{marginLeft: 40}}>
          <Text>Цагийн хуваарь:   {ParkOpeningTime} - {ParkClosingTime}</Text>
          <Text>Цагийн төлбөр:</Text>
          <Text>*   1 цагийн:  -> {ParkCost}</Text>
          
          </View>

          <View style={{flexDirection: 'row',alignItems: 'center'}}>
          <Image source={require('../assets/Local parking.png')} style={{height: 22,width:22,margin:9}}></Image>
          <Text style={styles.title}>Зогсоолын Захиалга                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             </Text>
          </View>

        <View style={{marginLeft: 40, marginRight: 10}}>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Нийт зогсоол:</Text>
                <Text style={{color: 'orange'}}>{TotalCapacity}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Сул  зогсоол:</Text>
                <Text style={{color: 'green'}}>{CurrentCapacity}</Text>
            </View>
        
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '25%',mapginRight: 10}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={{color: 'rgba(0, 0, 0, 0.5)'}}>Буцах</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}

          >
            <Text style={{color: 'rgba(0, 0, 0, 0.5)'}}>Цааш</Text>
          </TouchableOpacity>
        </View>
      </View>
    

  )}
  
const styles = StyleSheet.create({
    
    container: {
      backgroundColor: 'white',
      height: '65%',
      width: '80%',
      padding: 20,
      borderRadius: 20,
      marginBottom: '21%'
    },
    image: {
      padding: 10,
      width: 300,
      height: '30%',
      borderRadius: 10
    },
    title: {
       fontSize:20,
       fontWeight: 'bold',
       color: 'black',
  
    },
    button: {
      height: 40,
      width: '40%',
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: '#A288E6',
      color: '#A288E6',
      backgroundColor: 'white',
      fontSize: 15,
      padding: 10,
      marginBottom: 20,
      alignItems: 'center'
    },
    backButton: {
      height: 40,
      width: '40%',
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      color: 'rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      fontSize: 15,
      padding: 10,
      alignItems: 'center'
  
    }
  
    
  });
  
  export default OrderInfo;
  