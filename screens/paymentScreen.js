import React,{useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView,Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import api from '../api';
import { useNavigation } from '@react-navigation/native';


export default function PaymentScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    const [activeImage, setActiveImage] = useState(null);
    const handleImagePress = (imageName) => {
        if (activeImage === imageName) {
          setActiveImage(null);
        } else {
          setActiveImage(imageName);
        }
      };

      const id = route.params.orderId;
      console.log(id);
      const submit = async () => {
        try {
          const token = await SecureStore.getItemAsync("userToken");
          const response = await api.post(`/private/pay/${id}`, null, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
      
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      

      useEffect(() => {
        const fetchData = async (id) => {
          try {
            const token = await SecureStore.getItemAsync("userToken");
            const response = await api.get(`/private/parking/order/detail/get`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            console.log(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        const id = route.params.orderId;
        fetchData(id);
      }, []);
      
  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styles.title}>УНА 2003</Text>
        <Text style={{fontSize: 15}}>Төв талбайн зогсоол</Text>

                <View style={styles.row}>
                    <Text>Захиалга өгсөн цаг:</Text>
                    <Text>09:30</Text>
                </View>

                <View style={styles.row}>
                    <Text>Нийт захиалсан хугацаа:</Text>
                    <Text>09:30 минут</Text>
                </View>

                <View style={styles.row}>
                    <Text>Зогсоолд тависан цаг:</Text>
                    <Text>11:30-12.30</Text>
                </View>

                <View style={styles.row}>
                    <Text>Зогсоолд тависан хугацаа:</Text>
                    <Text>60:00 минут</Text>
                </View>

                <View style={styles.row}>
                <Text>Захиалгын төлбөр:</Text>
                    <Text>1 минут 50₮</Text>
                </View>

                <View style={styles.row}>
                    <Text>Зогсоолын төлбөр:</Text>
                    <Text>2000₮</Text>
                </View>

                <View style={styles.row}>
                    <Text>Захиалгын төлбөр:</Text>
                    <Text>450₮</Text>
                </View>

                <View style={styles.row}>
                    <Text>Нийт  төлбөр:</Text>
                    <Text>2450₮</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.titleIcon}> Төлбөрийн хэрэгслээ сонгоно уу</Text>

                    <View style={styles.row}>
                        <TouchableOpacity 
                        style={ activeImage === 'image1' && styles.activeImage} 
                        onPress={() => handleImagePress('image1')}>
                            <Image style={styles.image} resizeMode="contain" source={require("../assets/paymentType/image 103.png")}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={ activeImage === 'image2' && styles.activeImage} 
                        onPress={() => handleImagePress('image2')}
                        >
                            <Image style={styles.image} source={require("../assets/paymentType/image 99.png")}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={ activeImage === 'image3' && styles.activeImage} 
                        onPress={() => handleImagePress('image3')}
                        >
                            <Image style={styles.image} source={require("../assets/paymentType/image 100.png")}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={ activeImage === 'image4' && styles.activeImage} 
                        onPress={() => handleImagePress('image4')}
                        >
                            <Image style={styles.image} source={require("../assets/paymentType/image 101.png")}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={ activeImage === 'image5' && styles.activeImage} 
                        onPress={() => handleImagePress('image')}
                        >
                            <Image style={styles.image} source={require("../assets/paymentType/image 102.png")}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={submit}>
                      <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                   <Text style={{fontSize: 15, color: 'white'}}>Төлөх</Text>
                   </TouchableOpacity>
        </TouchableOpacity>
                </View>

        
        
      </KeyboardAvoidingView>

      
    </View>
  );
}

const Header = ({navigation}) => (
  
  <View style={styles.header}>
    <View style={styles.row}>
      <Entypo name='chevron-thin-left' size={15}  />
      <Text style={styles.title}>Төлбөр</Text>
      <Text> </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 30,
  },
  body: {
    flex: 1,
    padding: '5%',
    borderWidth: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderColor: '#D0D0D0',
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: -15,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  
  },
  iconRow:{
    flexDirection:'row',


  },

  title: {
    fontSize: 20,
  },
  button: {
    width: 300,
    padding: 15,
    backgroundColor: '#A288E6',
    borderRadius: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  activeImage: {
    borderRadius: 15,
    width: 60,
    borderColor: '#A288E6',
    borderWidth: 3,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'strectch'
},
titleIcon: {
    fontSize: 20,
    color: '#2E413B',
    marginBottom:20,
    marginTop: 10
},
image: {
    width: 55,
    height: 55,
    
    
  },
});
