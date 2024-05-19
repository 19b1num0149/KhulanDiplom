import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import MapMarker from './mapMarker';

export default function Map() {
  const navigation = useNavigation();
  const [slideAnimation] = useState(new Animated.Value(0));
  const [isSlidedUp, setIsSlidedUp] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const zoomPercentage = 0.01;

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setMarkerPosition({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        locationSubscription = Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Balanced, timeInterval: 10000, distanceInterval: 20 },
          (newLocation) => {
            setMarkerPosition({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
          }
        );
      } catch (error) {
        console.error('Error fetching location:', error);
        setErrorMsg('Error fetching location');
      }
    };

    fetchLocation();

    return () => {
      // Clean up location subscription if needed
    };
  }, []);

  const windowHeight = Dimensions.get('window').height;
  const innerViewHeight = windowHeight * 0.50;

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: zoomPercentage,
            longitudeDelta: zoomPercentage,
          }}
        >
          {markerPosition && (
            <Marker coordinate={markerPosition} title="Таны байршил">
              <TouchableOpacity onPress={() => navigation.navigate('MyModal')}>
                <Image source={require('../assets/red_marker.png')} style={{ width: 35, height: 50 }} />
              </TouchableOpacity>
            </Marker>
          )}
          {markerPosition && <MapMarker/>}
        </MapView>
      ) : (
        <View style={{ alignItems: 'center', paddingTop: 100 }}>
          <AntDesign name="loading1" size={40} color="black" />
          <View style={{ height: 30 }}></View>
          <Text>Таны байршилыг татаж байна түр хүлээнэ үү</Text>
        </View>
      )}

      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateY: slideAnimation.interpolate({ inputRange: [0, 1], outputRange: [330, -50] }) }],
          },
        ]}
      >
        {/* Your other components */}
      </Animated.View>
    </View>
  );
} 
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      height: '95%',
    },
    box: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#F4F4F4',
    },
    buttonContainer: {
        flexDirection:"row",
        backgroundColor: '#5754FF',
        paddingTop: 0,
        borderRadius: 30,
        marginBottom: 20
        
        
    },
    activeText:{
       color: 'white',
    },
    tabButton:{
        width: "50%",
        backgroundColor: '#5754FF',
        borderRadius: 0,
        textAlign: 'center',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
    
      },
      leftButton:{
        borderTopRightRadius: 30,

      },
    
      rightButton: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      },
    
      activeButtonRight:{
        backgroundColor: "#F4F4F4",
        borderColor: "#A288E6",
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius:0
       
      },
      activeButtonLeft:{
        backgroundColor: "#F4F4F4",
        borderColor: "#A288E6",
        width: '47%',
 
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginVertical: 3,
        marginHorizontal: 6
        
      },
      listcontainer: {
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
        paddingRight: 5

    },
    row: {
        flexDirection: 'row',
        marginBottom: 0,

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
   
  });
  