import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{ headerStyle: { backgroundColor: '#358a3c',},
        headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold',},}}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio', headerShown: false, }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params?.product?.title || 'Detalle del producto', headerShown: true, })} />
    
    </Stack.Navigator>
  );
};

export default AppNavigator;