import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/LogInScreen';
import Header from './component/Navbar';
import ModalScreen from './component/Modal1';
import UserScreen from './screens/userScreen';
import PaymentScreen from './screens/paymentScreen';
import RegisterScreen from './screens/RegisterScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => <Header /> }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ header: () => <Header /> }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen name="MyModal" component={ModalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
