
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert,StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const ProfileScreen = ({ navigation }) => {
  const { orders, cart, clearCart } = useCart();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Sesión cerrada',
              'Has cerrado sesión correctamente.',
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const handleClearCart = () => {
    if (cart.length === 0) {
      Alert.alert('Carrito vacío', 'No hay nada que limpiar.');
      return;
    }

    Alert.alert(
      'Vaciar carrito',
      '¿Estás seguro de que quieres vaciar todo el carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Vaciar',
          style: 'destructive',
          onPress: () => {
            clearCart();
            Alert.alert('Carrito vaciado', 'El carrito ha sido vaciado correctamente.');
          },
        },
      ]
    );
  };

 return (

    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#629766" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>
      <SafeAreaView style={styles.contentSafeArea}>
        <View style={styles.container}>
          
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={90} color="#629766" />
            </View>
            
            <Text style={styles.userName}>Francisco</Text>
            <Text style={styles.userEmail}>usuario@ejemplo.com</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{orders.length}</Text>
                <Text style={styles.statLabel}>Pedidos</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{cart.length}</Text>
                <Text style={styles.statLabel}>En carrito</Text>
              </View>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionItem}>
              <Ionicons name="person-outline" size={24} color="#555" />
              <Text style={styles.optionText}>Editar perfil</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={handleClearCart}>
              <Ionicons name="trash-outline" size={24} color="#dc3545" />
              <Text style={styles.optionTextRed}>Vaciar carrito</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#629766',
  },
  header: {
    backgroundColor: '#629766', 
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  
    paddingTop: StatusBar.currentHeight + 10, 
  },
  contentSafeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa', 
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
 
  },
  container: {
    flex: 1,
    padding: 20,
    
    paddingTop: 20, 
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 25,
   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#629766', 
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  optionTextRed: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: '#dc3545',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    marginBottom: 20, 
  },
  logoutText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default ProfileScreen;