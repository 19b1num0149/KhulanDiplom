import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import api from '../api';

export default function PaymentScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    const [activeImage, setActiveImage] = useState(null);
    const [orderDetails, setOrderDetails] = useState({});
    const [parkName, setParkName] = useState('');
    const [error, setError] = useState(null);

    const handleImagePress = (imageName) => {
        setActiveImage(activeImage === imageName ? null : imageName);
    };

    const id = route.params.orderId;

    const submit = async () => {
        try {
            const token = await SecureStore.getItemAsync("userToken");
            const response = await api.post(`/private/pay/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            navigation.navigate('Home');  // Navigate to HomeScreen upon success
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    useEffect(() => {
        const fetchOrderDetails = async (orderId) => {
            try {
                const token = await SecureStore.getItemAsync("userToken");
                const response = await api.get(`/private/parking/order/detail/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const orderData = response.data;
                setOrderDetails(orderData);
                console.log("Order details fetched successfully:", orderData);

                
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch order details. Please try again later.");
            }
        };

        fetchOrderDetails(route.params.orderId);
    }, [route.params.orderId]);

    return (
        <View style={styles.container}>
            <Header />
            <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={styles.title}>Таны зогсоолын төлбөр</Text>
                <Text style={styles.title}>{orderDetails.car_number}</Text>
                <Text style={{ fontSize: 15 }}>{}</Text>

                <View style={styles.row}>
                    <Text>Захиалга өгсөн цаг:</Text>
                    <Text>09:30</Text>
                </View>

                <View style={styles.row}>
                    <Text>Нийт захиалсан хугацаа:</Text>
                    <Text>{orderDetails.order_duration}</Text>
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
                    <Text>Нийт  төлбөр:</Text>
                    <Text>{orderDetails.order_cost}</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.titleIcon}>Төлбөрийн хэрэгслээ сонгоно уу</Text>

                    <View style={styles.row}>
                        {['image1', 'image2', 'image3', 'image4', 'image5'].map((imageName, index) => (
                            <TouchableOpacity
                                key={index}
                                style={activeImage === imageName ? styles.activeImage : null}
                                onPress={() => handleImagePress(imageName)}
                            >
                                <Image
                                    style={styles.image}
                                    resizeMode="contain"
                                    source={{ uri: `../assets/paymentType/image${103 - index}.png` }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <Text style={{ fontSize: 15, color: 'white' }}>Төлөх</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const Header = () => (
    <View style={styles.header}>
        <View style={styles.row}>
            <Entypo name='chevron-thin-left' size={15} />
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
        fontSize: 25,
        padding: 10,
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
    title: {
        fontSize: 20,
        padding: 10,
    },
    button: {
        width: 300,
        padding: 15,
        backgroundColor: '#A288E6',
        borderRadius: 15,
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
        justifyContent: 'center',
    },
    activeImage: {
        borderRadius: 15,
        width: 60,
        borderColor: '#A288E6',
        borderWidth: 3,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'stretch',
    },
    titleIcon: {
        fontSize: 20,
        color: '#2E413B',
        marginBottom: 20,
        marginTop: 10,
    },
    image: {
        width: 55,
        height: 55,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
