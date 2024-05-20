import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import api from '../api';
import ParkList from './parkList';
import { ScrollView } from 'react-native-gesture-handler';

export default function Map() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const zoomPercentage = 0.01;
  const [parkListData, setParkingData] = useState([]);
  const [slideAnimation] = useState(new Animated.Value(0));
  const [isSlidedUp, setIsSlidedUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        const response = await api.get("/private/parking", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const parksDataWithDistance = response.data.map(park => ({
          ...park,
          distance: calculateDistance(
            location.coords.latitude,
            location.coords.longitude,
            park.lan,
            park.lon
          )
        }));


        parksDataWithDistance.sort((a, b) => a.distance - b.distance);

        setParkingData(parksDataWithDistance);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location]);

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
      } catch (error) {
        console.error('Error fetching location:', error);
        setErrorMsg('Error fetching location');
      }
    };

    fetchLocation();
  }, []);

  const slideUp = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
    setIsSlidedUp(true);
  };

  const slideDown = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
    setIsSlidedUp(false);
  };

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
                <Image source={require('../assets/3754313.png')} style={{ width: 35, height: 50 }} />
              </TouchableOpacity>
            </Marker>
          )}
          {}
          {parkListData.map((park, index) => (
            <CustomMarker
              key={index}
              title={park.name}
              lat={park.lan}
              lon={park.lon}
              CurrentCapacity={park.free_space}
              onPress={() => navigation.navigate('MyModal', { parkId: park.id })}
            />
          ))}
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
        <View style={{ backgroundColor: 'transparent', height: innerViewHeight, paddingHorizontal: 20, }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={slideUp} style={[styles.tabButton, styles.leftButton, isSlidedUp ? styles.activeButtonRight : null]}>
              <Text style={[styles.buttonText, !isSlidedUp ? styles.activeText : null]}>Ойрхон зогсоол</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={slideDown} style={[styles.tabButton, styles.rightButton, !isSlidedUp ? styles.activeButtonLeft : null]}>
              <Text style={[styles.buttonText, isSlidedUp ? styles.activeText : null]}>Газрын зураг</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {parkListData.map((park, index) => (
              <ParkList
                key={index}
                ParkName={park.name}
                ParkClosingTime={park.opening_time}
                ParkOpeningTime={park.closing_time}
                ParkCost={park.payment_per_hour}
                CurrentCapacity={park.free_space}
                onPress={() => navigation.navigate('MyModal', { parkId: park.id })}
              />
            ))}
          </ScrollView>

        </View>
      </Animated.View>
    </View>
  );
}

const CustomMarker = (props) => {
  const { lon, lat, title, CurrentCapacity, onPress } = props;

  let markerImage = require('../assets/green_marker.png'); // Default marker image

  // Determine marker image based on current capacity
  if (CurrentCapacity > 10) {
    markerImage = require('../assets/green_marker.png');
  } else if (CurrentCapacity > 0 && CurrentCapacity <= 10) {
    markerImage = require('../assets/yellow_marker.png');
  } else {
    markerImage = require('../assets/red_marker.png');
  }

  console.log("Rendering CustomMarker:", title); // Add this line

  return (
    <Marker
      coordinate={{ latitude: lat, longitude: lon }}
      title={title}
      onPress={onPress}
    >
      <TouchableOpacity onPress={onPress}>
        <Image source={markerImage} style={{ width: 35, height: 50 }} />
      </TouchableOpacity>
    </Marker>
  );
};

// Function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

// Function to convert degrees to radians
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

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
    flexDirection: "row",
    backgroundColor: '#5754FF',
    paddingTop: 0,
    borderRadius: 30,
    marginBottom: 20
  },
  activeText: {
    color: 'white',
  },
  tabButton: {
    width: "50%",
    backgroundColor: '#5754FF',
    borderRadius: 0,
    textAlign: 'center',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  leftButton: {
    borderTopRightRadius: 30,
  },
  rightButton: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  activeButtonRight: {
    backgroundColor: "#F4F4F4",
    borderColor: "#A288E6",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  activeButtonLeft: {
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
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
});