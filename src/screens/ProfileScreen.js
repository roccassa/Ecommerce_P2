import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// 1. IMPORTANTE: Importamos el hook para leer los datos globales
import { useCart } from '../context/CartContext';

const ProfileScreen = ({ navigation }) => {
  // 2. EXTRAEMOS: Sacamos 'user' y 'logoutUser' del contexto
  const { orders, cart, user, logoutUser } = useCart();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Cerrar sesión', 
        style: 'destructive', 
        onPress: async () => {
          await logoutUser(); // Limpia los datos del teléfono
          navigation.replace('Login'); // Te manda al Login
        } 
      },
    ]);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#629766" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>

      <SafeAreaView style={styles.contentSafeArea}>
        <View style={styles.container}>
          
          {/* TARJETA DE PERFIL */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={90} color="#629766" />
            </View>
            
            {/* 3. CAMBIO DINÁMICO: Si hay usuario muestra su nombre, si no, dice Invitado */}
            <Text style={styles.userName}>
              {user ? user.name : 'Invitado'}
            </Text>
            
            <Text style={styles.userEmail}>
              {user ? user.email : 'Inicia sesión para comprar'}
            </Text>

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

          {/* OPCIONES */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionItem}>
              <Ionicons name="settings-outline" size={24} color="#666" />
              <Text style={styles.optionText}>Configuración</Text>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>

          {/* BOTÓN CERRAR SESIÓN */}
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
    paddingTop: (StatusBar.currentHeight || 0) + 10, 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  contentSafeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa', 
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  userName: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#333',
    textTransform: 'capitalize' // Pone la primera letra en mayúscula
  },
  userEmail: { 
    fontSize: 15, 
    color: '#666', 
    marginBottom: 20 
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    width: '100%',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: '700', color: '#629766' },
  statLabel: { fontSize: 13, color: '#666' },
  statDivider: { width: 1, height: 40, backgroundColor: '#ddd' },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 25,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: { flex: 1, fontSize: 16, marginLeft: 16, color: '#333' },
  logoutButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  logoutText: { color: '#fff', fontSize: 17, fontWeight: '600' },
});

export default ProfileScreen;