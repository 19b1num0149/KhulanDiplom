import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParkList from './parkList';
import * as SecureStore from 'expo-secure-store';

import { useNavigation } from '@react-navigation/native';
import api from '../api';

const List = () => {
    const [searchText, setSearchText] = useState('');
    const [parkListData, setParkingData] = useState([]);
    const [filteredParkList, setFilteredParkList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await SecureStore.getItemAsync("userToken");
                const response = await api.get("/private/parking", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setParkingData(response.data); // Assuming response is an array of parking data
                setFilteredParkList(response.data); // Initialize filtered list with all parks
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredList = parkListData.filter(park =>
            park.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredParkList(filteredList);
    }, [searchText, parkListData]);

    const handleSearch = () => {
        
    };

    return (
        <ScrollView style={styles.body}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 10, height: 40, width: '70%', padding: 10, marginBottom: 10 }}>
                    <Ionicons name="search" size={20} color="gray" style={{ color: '#7CA5E5', marginRight: 5 }} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        onChangeText={setSearchText}
                        value={searchText}
                        onSubmitEditing={handleSearch}
                    />
                </View>
                
            </View>

            {filteredParkList.map((park, index) => (
                <ParkList
                    key={park.id}
                    ParkName={park.name}
                    ParkClosingTime={park.opening_time}
                    ParkOpeningTime={park.closing_time}
                    ParkCost={park.payment_per_hour}
                    CurrentCapacity={park.free_space}
                    onPress={() => navigation.navigate('MyModal', { parkId: park.id })}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        padding: 20,
    },
    input: {
        flex: 1,
        marginLeft: 5,
        fontSize: 16,
    },
});

export default List;
