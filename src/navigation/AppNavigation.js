import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MainTabs" screenOptions={{
        headerStyle: {
          backgroundColor: '#007bff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
  
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={({ route }) => ({
          title: route.params?.product?.title || 'Detalle',headerShown: true,})}/>

    </Stack.Navigator>
  );
};

export default AppNavigator;