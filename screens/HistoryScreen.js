import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView ,TouchableOpacity,Image,Text} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api from '../api';
import Footer from '../component/bottomNavBar';


export default function HistoryScreen({ navigation }) {
    const [parkListData, setParkListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await SecureStore.getItemAsync("userToken");
                const response = await api.get("/private/user/history", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                // Sort the parkListData array by descending order based on the ordered_at date
                const sortedData = response.data.sort((a, b) => new Date(a.ordered_at) - new Date(b.ordered_at));
                
                setParkListData(sortedData.reverse()); // Reverse the sorted array to make the latest date appear first
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <View style={styles.body}>
        <ScrollView>
            <View style={styles.body}>
                {parkListData.map((park, index) => (
                    <ParkList 
                        key={index}
                        ParkOrderTime ={park.ordered_at} 
                        ParkPaidTime ={park.paid_at} 
                        CarNumber={park.car_number} 
                         />
                ))} 
            </View>
        </ScrollView>
        <Footer/>
        </View>
    );
}

const ParkList=(props)=>{
    const { ParkPaidTime,ParkOrderTime,  CarNumber}=props;

    return(
        <View style={styles2.container}>
            <TouchableOpacity>
            <View style={styles2.row}>
            <Image source={require('../assets/Park1.jpg')} style={styles2.image}></Image>
                <View style={styles.textContainer}>
                   
                    <Text style={styles2.title}>Машины Зогсоол</Text>
                    <View style={styles2.row}>
                    <Text style={styles2.text}> Захиалсан он сар</Text>
                    <Text style={[styles2.text, {color:'green', fontWeight: 'bold'}]}> {ParkOrderTime}</Text>
                    </View>
                    <View style={styles2.row}>
                    <Text style={styles2.text}> Төлбөр төлсөн он сар </Text>
                    <Text style={[styles2.text, {color:'green', fontWeight: 'bold'}]}> {ParkPaidTime}</Text>
                    </View>

                    <View style={styles2.row}>
                    <Text style={styles2.text}> Машины дугаар:  </Text>
                    <Text style={[styles2.text, {color:'green', fontWeight: 'bold'}]}> {CarNumber}</Text>
                    </View>
                    </View>
                    
                </View>
                </TouchableOpacity>
                
            </View>

    )
}

const styles2 = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: 100,
        width: '100%',
        padding: 15,
        borderColor: '#D0D0D0',
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 15,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold'


    },
    textContainer: {
        marginRight: 20,
        height: '100%',
        borderRightWidth: 1,
        borderColor: 'Grey',
        paddingRight: 5,
        width: '60%'

    },
    row: {
        flexDirection: 'row',
        marginBottom: 0,
        width: 300

    },
    image: {
        height: 70,
        width: '35%',
        objectFit: 'cover',
        borderRadius: 5,
        marginRight:15
    },
    text: {
        fontSize: 10
    }

})




const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
});
