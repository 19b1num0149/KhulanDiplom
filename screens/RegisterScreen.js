import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Axios from 'axios'; // Import Axios
import * as SecureStore from 'expo-secure-store';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Make a POST request to register the user
        Axios.post('/guest/register-by-email', {
            name: name,
            email: mail,
            phone: phone,
            password: password,
            device_name: 'iphone', // Provide the device name
        })
        .then(response => {
            // Handle successful registration
            console.log('Registration successful:', response.data);
            // Activate the account
            activateAccount(mail); // Call the activateAccount function with email
            // Save the token to secure store
            SecureStore.setItemAsync('userToken', response.data.token)
                .then(() => {
                    // Token saved successfully
                    console.log('Token saved successfully');
                    // Navigate to HomeScreen or perform other actions as needed
                    navigation.navigate('Home');
                })
                .catch(error => {
                    // Unable to save token
                    console.error('Error saving token:', error);
                });
        })
        .catch(error => {
            // Handle registration error
            console.error('Registration error:', error);
            Alert.alert('Registration Error', 'Registration failed. Please try again.');
        });
    };

    const activateAccount = (email) => {
        // Make a POST request to activate the account
        Axios.post('/guest/activate_account', { email: email })
        .then(response => {
            // Handle successful account activation
            console.log('Account activation successful:', response.data.msg);
        })
        .catch(error => {
            // Handle activation error
            console.error('Account activation error:', error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Бүртгүүлэх</Text>
            <Text>Шинэ хэрэглэгчийн бүртгэл</Text>
            <TextInput
                label='Овог Нэр'
                value={name}
                onChangeText={setName}
                style={styles.TextInput}
                keyboardType="default"
            />
            <TextInput
                label='И-Мейл хаяг'
                value={mail}
                onChangeText={setMail}
                style={styles.TextInput}
                keyboardType="email-address"
            />
            <TextInput
                label='Гар утас'
                value={phone}
                onChangeText={setPhone}
                style={styles.TextInput}
                keyboardType="phone-pad"
            />
            <TextInput
                label='Нууц үг'
                value={password}
                onChangeText={setPassword}
                style={styles.TextInput}
                keyboardType="default"
                secureTextEntry 
            />
            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Үргэлжлүүлэх
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    TextInput: {
        marginBottom: 10,
        width: '100%',
    },
    button: {
        width: '100%',
        marginTop: 10,
    },
});
