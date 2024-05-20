import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderView = ({ ParkName, ParkClosingTime, ParkOpeningTime, ParkCost, PlatNumber, onPress, error }) => {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={styles.container}>
        <Image source={require("../assets/Park1.jpg")} style={styles.image} />

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.title}>{PlatNumber}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Зогсоол:</Text>
          <Text style={{ color: 'black' }}>{ParkName}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>ц хуваарь:</Text>
          <Text style={{ color: 'black' }}>{ParkOpeningTime} - {ParkClosingTime}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Зогсоолын төлбөр:</Text>
          <Text style={{ color: 'black' }}>{ParkCost}</Text>
        </View>

        <View style={{ justifyContent: 'space-between', marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Захиалгын төлбөр:</Text>
            <Text style={{ color: 'black' }}>1 минут -> 50₮</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Захиалгын цаг:</Text>
            <Text style={{ color: 'black' }}>{currentTime.toLocaleTimeString()}</Text>
          </View>
          {error && (  // Conditionally render error message
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Таны захиалга амжилтгүй боллоо. Хэрэглэгч эсвэл энэхүү машины дугаар идэвхтэй захиалгатай байна.</Text>
            </View>
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '30%' }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Буцах</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onPress}
            >
              <Text style={{ color: 'white' }}>Баталгаажуулах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '80%',
    width: '80%',
    padding: 20,
    borderRadius: 20,
    marginTop: 20
  },
  image: {
    padding: 10,
    width: 300,
    height: '30%',
    borderRadius: 10
  },
  title: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    height: 40,
    width: '45%',
    fontWeight: 'bold',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#A288E6',
    backgroundColor: '#A288E6',
    fontSize: 15,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    height: 40,
    width: '40%',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    fontSize: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
