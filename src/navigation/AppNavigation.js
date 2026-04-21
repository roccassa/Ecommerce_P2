import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';


import TabNavigator from './TabNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { useCart } from '../context/CartContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useCart(); 


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#629766' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <Stack.Navigator 
    
      initialRouteName={user ? "MainTabs" : "Login"} 
      screenOptions={{
        headerStyle: { backgroundColor: '#629766' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: false
      }}
    >
 
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

   
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ headerShown: true, title: 'Detalle del Producto' }}
      />
      
 
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddressScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;