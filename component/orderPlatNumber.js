import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const OrderPlatNumber = (props) => {
    const { onPress, setPlatNumber } = props;
  const navigation = useNavigation();
  const [inputNumber1, setInputNumber1] = useState('');
  const [inputNumber2, setInputNumber2] = useState('');

  const handleInputChange1 = (text) => {
    setInputNumber1(text);
    setPlatNumber(text + inputNumber2); // Concatenate both input values
  };

  const handleInputChange2 = (text) => {
    setInputNumber2(text);
    setPlatNumber(inputNumber1 + text); // Concatenate both input values
  };
  

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={styles.container}>
        <Image source={require("../assets/Park1.jpg")} style={styles.image} />

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.title}>Та Өөрийн автомашины дугаарыг оруулна уу</Text>
        </View>

        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center',justifyContent: 'start' }}>
          <View style={{width: 20}}></View>
          <TextInput
            style={[styles.input,{width:'30%',height:50,marginRight: 30}]}
            placeholder="УНА"
            value={inputNumber2}
            onChangeText={handleInputChange2}
            maxLength={3}
          />
          <TextInput
            style={[styles.input,{width: '50%',height:50,alignItems: 'center'}]}
            placeholder="0000"
            value={inputNumber1}
            onChangeText={handleInputChange1}
            keyboardType="numeric"
            maxLength={4}
          />
        
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '25%' }}>
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
            <Text style={{ color: 'white' }}>Цааш</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

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
    textAlign: 'center'
  },
  button: {
    height: 40,
    width: '40%',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#A288E6',
    backgroundColor: '#A288E6',
    fontSize: 15,
    padding: 10,
    marginBottom: '25%',
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

export default OrderPlatNumber;
