import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CartTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'OrdersTab') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#36c441',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 8,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{ title: 'Carrito' }}
      />

      <Tab.Screen
        name="OrdersTab"
        component={HomeScreen} // Temporal
        options={{ title: 'Pedidos' }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={HomeScreen} // Temporal
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;