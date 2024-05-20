import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import Axios from 'axios'; // Import Axios
import HomeScreen from './homeScreen';
import { Navigation } from 'react-native-navigation';
import HomeTabs from '../component/tabview';
import api from '../api';
import * as SecureStore from 'expo-secure-store';


function LoginScreen({ navigation }) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      
        api.post('/guest/auth', {
            phone: phone,
            password: password,
            device_name: 'iphone', 
        })
        .then(response => {
            console.log('Login successful:', response.data);
            console.log(response.data.token);
            SecureStore.setItemAsync('userToken', response.data.token)
                .then(() => {
                    console.log('Token saved successfully');
                    navigation.navigate('Home');
                })
                .catch(error => {
                    console.error('Error saving token:', error);
                });
        })
        .catch(error => {
            console.error('Login error:', error);
            Alert.alert('Login Error', 'Invalid phone number or password. Please try again.');
        });
    };
    

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} 
        >
            <View style={styles.container}>
                <Image source={require("../assets/logo.png")} />
                <Text style={styles.Text}>UB PARKING</Text>
                <View style={styles.row}>
                    
                    <View style={styles.country}><Text>+976</Text></View>
                    <TextInput
                        placeholder='Утасны дугаар'
                        onChangeText={newPhone => setPhone(newPhone)}
                        value={phone}
                        style={styles.TextInput}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.row}> 
                <View style={{marginRight:10,width:50}}></View>  
                <TextInput
                placeholder='Нууц үгээ оруулна уу'
                onChangeText={newPassword => setPassword(newPassword)}
                value={password}
                style={styles.TextInput}
            keyboardType='default' // Change 'text' to 'default'
                secureTextEntry 
/>

                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Үргэлжллүүлэх</Text>
                </TouchableOpacity>

                <View style={[styles.row, { justifyContent: 'space-between',width: '100%',paddingHorizontal: '10%', marginTop: 10}]}>
                    <TouchableOpacity>
                        <Text>Нууц үг сэргээх</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text>Бүртгүүлэх</Text>
                    </TouchableOpacity>
                </View>

                
</View>

    </KeyboardAvoidingView>
);
}
const styles = StyleSheet.create({
    container: {

        backgroundColor: 'white',
        flex: 1,
        marginBottom: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextInput: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius:25,
        backgroundColor: 'white',
        height: 20,
        width: 250,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        
    },
    Text:{
        fontSize:20,
        color: '#7CA5E5',
        padding: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    country: {
        borderColor: 'black',
        padding: 10,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 10,
    },
    button: {
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: '30%',
        borderRadius: 15,
        backgroundColor: '#A288E6',
        alignItems: 'center',
        justifyContent: 'center'
       
        
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    }
});

export default LoginScreen;