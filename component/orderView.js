import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const options = [12, 13, 14, 'uok'];

const OrderView = (props) => {
  const {ParkName, ParkClosingTime,ParkOpeningTime, ParkCost,TotalCapacity, CurrentCapacity, PlatNumber,onPress}=props;
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputNumber, setInputNumber] = useState('');
  const [isValuesVisible, setIsValuesVisible] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsValuesVisible(false);
  };

  const handleInputChange = (text) => {
    setInputNumber(text);
    setIsValuesVisible(false);
  };

  const toggleValuesVisibility = () => {
    setIsValuesVisible(!isValuesVisible);
  };
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

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Зогсоол:</Text>
                <Text style={{color: 'blcak'}}>{ParkName}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>ц хуваарь:</Text>
                <Text style={{color: 'black'}}>{ParkOpeningTime} - {ParkClosingTime}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Зогсоолын төлбөр:</Text>
                <Text style={{color: 'black'}}>{ParkCost}</Text>
        </View>


        

        

        <View style={{  justifyContent: 'space-between', marginTop: 20 }}>
             <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Захиалгын төлбөр:</Text>
                <Text style={{color: 'black'}}>1 минут -> 50₮</Text>
            </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Захиалгын цаг:</Text>
                <Text style={{color: 'black'}}>{currentTime.toLocaleTimeString()}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:'30%'}}>
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
  )
}

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
  input: {
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    width: '50%'
  },
  dropdownContainer: {
    maxHeight: 100,
    marginLeft: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  dropdownItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  }
});

