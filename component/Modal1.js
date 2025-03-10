import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import OrderView from './orderView';
import OrderInfo from './orderInfo';
import OrderPlatNumber from './orderPlatNumber';
import * as SecureStore from 'expo-secure-store';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../api';

function ModalScreen() {
  const [parkListData, setParkingData] = useState(null);
  const [render, setRender] = useState('order_info');
  const [platNumber, setPlatNumber] = useState('');
  const [error, setError] = useState(null);  // New state for error message
  const route = useRoute();
  const navigation = useNavigation();

  const submitData = async (parkId, car_number) => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const response = await api.post(`/private/parking/order/${parkId}`, {
        car_number: car_number,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigation.navigate('Home');
      return response;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);  // Set error message
      } else {
        setError("Error submitting data");
      }
    }
  };

  useEffect(() => {
    const fetchData = async (parkId) => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        const response = await api.get(`/private/parking/${parkId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setParkingData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (route.params && route.params.parkId) {
      const parkId = route.params.parkId;
      fetchData(parkId);
    }
  }, [route.params]);

  const goPlatNumber = () => {
    setRender('platNumber');
  };

  const goOrder = () => {
    setRender('order_view');
  };

  const conditionalRender = () => {
    if (!parkListData) {
      return null; 
    }
    if (render === 'order_info') {
      return <OrderInfo 
        ParkName={parkListData.name}
        ParkClosingTime={parkListData.closing_time}
        ParkOpeningTime={parkListData.opening_time}
        ParkCost={parkListData.payment_per_hour}
        TotalCapacity={parkListData.capacity}
        CurrentCapacity={parkListData.free_space}
        onPress={goPlatNumber}
      />;
    } else if (render === 'order_view') {
      return <OrderView
        PlatNumber={platNumber} 
        ParkName={parkListData.name}
        ParkClosingTime={parkListData.closing_time}
        ParkOpeningTime={parkListData.opening_time}
        ParkCost={parkListData.payment_per_hour}
        onPress={() => submitData(parkListData.id, platNumber)}
        error={error}  // Pass error message as prop
      />;
    } else {
      return <OrderPlatNumber onPress={goOrder} setPlatNumber={setPlatNumber} />;
    }
  };

  return (
    <View style={styles.body}>
      {conditionalRender()}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
});

export default ModalScreen;
