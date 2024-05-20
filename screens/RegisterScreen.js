import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import api from '../api'; // Import your API instance

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        api.post('/guest/register-by-email', {
            name: name,
            phone: phone,
            password: password,
            email: mail,
            device_name: 'iphone', 
        })
        .then(response => {
            console.log('Register successful:', response.data);
            Alert.alert('Амжилттай', 'Таны бүртгэл амжилттай хийгдлээ', [
                { text: 'Үргэлжлүүлэх', onPress: () => navigation.navigate('Login') }
            ]);
        })
        .catch(error => {
            console.error('Registration error:', error);
            Alert.alert('Амжилтгүй', 'Бүртгэл амжилтгүй');
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
