import React, { useEffect, useState,useCallback } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import Map from '../component/Map';
import List from '../component/List';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import api from '../api';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Footer from '../component/bottomNavBar';

export default function HomeScreen({ navigation }) {

    const route = useRoute();
  const timestamp1 = new Date('2024-04-28T12:00:00Z');
  const timestamp2 = new Date('2024-04-28T13:30:00Z');

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = timestamp2 - timestamp1;
  const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
  const totalCost = Math.floor(((hours * 60) + 50) * 50)

  const [parkingOrder, setParkingOrder] = useState(null);

  const [render, setRender] = useState("map")
  const toggleRender = () => {
    if (render === "map") {
      setRender("list")
    }
    else setRender("map")
  }

  const fetchData = async () => {
    try {
        const token = await SecureStore.getItemAsync("userToken");
        const response = await api.get(`/private/parking/order/detail/get`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setParkingOrder(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

useFocusEffect(
    useCallback(() => {
        fetchData();
    }, [navigation, route])
);
  


  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.tabButton, styles.leftButton, render === "map" ? styles.activeButtonRight : null]}
          labelStyle={styles.buttonText} // Apply font size here
          onPress={toggleRender}
        >
          Газрын зургаар үзэх
        </Button>
        <Button
          style={[styles.tabButton, styles.rightButton, render === "list" ? styles.activeButtonLeft : null]}
          labelStyle={styles.buttonText} // Apply font size here
          onPress={toggleRender}
        >
          Жагсаалтаар үзэх
        </Button>
      </View>


      {
        render === 'map' ? <Map /> : <List />
      }

{
  parkingOrder ? (
    <View style={{ padding: 10 }}>
      <View style={{
        height: 100,
        width: '100%',
        backgroundColor: '#EFEFEF',
        position: 'absolute',
        marginHorizontal: 10,
        bottom: 100,
        zIndex: 0,
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#7CA5E5',
        borderWidth: 2,
        padding: 20
      }}>
        <Text style={{fontWeight: 'bold'}}>Таны Захиалга</Text>
        <View style={{ flexDirection: 'row' ,justifyContent: 'space-between'}}>
        <View style={{ flexDirection: 'row',marginTop:20}}>
          <MaterialCommunityIcons name="clock-time-eight-outline" size={24} color="#8062CF" />
          
          <Text style={{fontWeight: 'bold',marginBottom:5}}>{parkingOrder.order_duration} минут</Text>
          <Text>  {parkingOrder.order_cost} төгрөг </Text>
          </View>
          <TouchableOpacity  onPress={() => navigation.navigate('Payment', { orderId: parkingOrder.id })}>
            <Text style={parkingOrder.order_cost ? { color: 'red' } : { color: 'green' }}>
              {parkingOrder.order_cost ? 'Cancel' : 'Pay'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  ) : null
}

 <Footer/>
    </View>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  tabButton: {
    width: "50%",

    backgroundColor: "#E6E4E0",
    borderRadius: 0,
    height: 30,

  },
  buttonContainer: {
    gap: 20,
    flexDirection: "row",
    height: 33

  },
  leftButton: {
    borderTopRightRadius: 30
  },
  rightButton: {
    borderTopLeftRadius: 30
  },
  activeButtonRight: {
    backgroundColor: "transparent",
    borderColor: "#A288E6",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  activeButtonLeft: {
    backgroundColor: "transparent",
    borderColor: "#A288E6",
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 1,
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'light',
    marginBottom: 1
    // Set your desired font size here
  }
});
