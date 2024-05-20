import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBack}>
                <Entypo name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
            <Text>Улаанбаатар</Text>
            <Text>       </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: 'white'
    }
});
