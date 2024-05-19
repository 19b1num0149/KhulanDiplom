import React,{ useState } from "react";
import { View, Image, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Entypo ,MaterialIcons,Ionicons} from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";


export default function UserScreen({navigation}){
    const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('95955099');
    const [phoneNumberButtonText, setPhoneNumberButtonText] = useState('Солих');

    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [email, setEmail] = useState('khulanTsogdelger@gmail.com');
    const [emailButtonText, setEmailButtonText] = useState('Солих');

    const [isCarNumberEditable, setIsCarNumberEditable] = useState(false);
    const [carNumber, setCarNumber] = useState('AB1234');
    const [carNumberButtonText, setCarNumberButtonText] = useState('Солих');

    const handlePhoneNumberEditPress = () => {
        setIsPhoneNumberEditable(!isPhoneNumberEditable);
        setPhoneNumberButtonText(isPhoneNumberEditable ? "Солих" : "Хадгалах");
    };

    const handleEmailEditPress = () => {
        setIsEmailEditable(!isEmailEditable);
        setEmailButtonText(isEmailEditable ? "Солих" : "Хадгалах");
    };

    const handleCarNumberEditPress = () => {
        setIsCarNumberEditable(!isCarNumberEditable);
        setCarNumberButtonText(isCarNumberEditable ? "Солих" : "Хадгалах");
    };

    
    return (
        <View style={styles.body}>
            <View style={styles.nameContainer}>
            <View style={[styles.row]}>
                <Text style={styles.nameDefaultText}>Овог</Text>
                <Text style={styles.nameText}>Цогдэлгэр</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.nameDefaultText}>Нэр</Text>
                <Text style={styles.nameText}>Хулан</Text>
            </View>
            </View>

            <View style={styles.container}>
                <Text>Утасны дугаар</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='95955099'
                        value={phoneNumber}
                        editable={isPhoneNumberEditable}
                        onChangeText={setPhoneNumber}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlePhoneNumberEditPress}
                    >
                        <Text style={styles.buttonText}>{phoneNumberButtonText}</Text>

                    </TouchableOpacity>
                    
                </View>
            </View>

            <View style={styles.container}>
                <Text>И-мэйл хаяг</Text>
                <View style={styles.row}>
                <TouchableOpacity onPress={handleEmailEditPress}>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.textInput, { width: '100%' }]}
                            placeholder='khulanTsogdelger@gmail.com'
                            value={email}
                            editable={isEmailEditable}
                            onChangeText={setEmail}
                        />
                    </View>
                </TouchableOpacity>
                    
                </View>
            </View>

            <View style={styles.container}>
                <Text>Машины дугаар</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='AB1234'
                        value={carNumber}
                        editable={isCarNumberEditable}
                        onChangeText={setCarNumber}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleCarNumberEditPress}
                    >
                        <Text style={styles.buttonText}>{carNumberButtonText}</Text>

                    </TouchableOpacity>
                </View>
            </View>
             <TouchableOpacity
              style={styles.mainButton}
              >
                <Text style={styles.buttonText}>Баталгаажуулах</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        paddingTop: '20%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%'

    },
    nameContainer: {
        width: '100%',
        height: '15%',
        padding: '5%',
        paddingHorizontal: '10%',
        backgroundColor: '#E9E1FF',
        borderRadius: 50,
        marginBottom: 30,
    },
    nameDefaultText: {
        fontSize: 20,
        color: '#6F58A9',
    
    },
    nameText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E413B'

    },
    container:{
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20
    },
    textInput: {
        borderColor: '#D0D0D0',
        borderRadius: 15,
        height: 40, 
        marginTop: 10,   
        borderWidth: 1,
        width: '60%',
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    button: {
        backgroundColor: '#A890E8',
        paddingVertical: 10,
        height: 40,
        width: '30%',
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'

    },
    mainButton: {

        backgroundColor: '#A890E8',
        paddingVertical: 10,
        height: 40,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '50%',
    }

})