import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/LogInScreen';
import HomeTabs from './component/tabview';
import Header from './component/Navbar';
import ModalScreen from './component/Modal1';
import Footer from './component/bottomNavBar';
import UserScreen from './screens/userScreen';
import PaymentScreen from './screens/paymentScreen';
import RegisterScreen from './screens/RegisterScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false  }} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}} />
      

    </Stack.Navigator>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator presentation="modal" headerShown="false" screenOptions={{ cardStyle: { backgroundColor: 'transparent' }}}>
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen name="MyModal" component={ModalScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;