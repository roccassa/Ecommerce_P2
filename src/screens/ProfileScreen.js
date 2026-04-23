import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const ProfileScreen = ({ navigation }) => {
const { user, orders, cart, logoutUser } = useCart();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: async () => {
          await logoutUser();
          navigation.replace('Login');
        }
      },
    ]);
  };

  // Función genérica para mostrar que la opción está en desarrollo
  const handleFeatureUnderDev = (feature) => {
    Alert.alert('Próximamente', `La opción de ${feature} estará disponible en la siguiente actualización.`);
  };

  const handleSave = async () => {
    try {
      await updateUser({ name: newName });
      Alert.alert("Éxito", "Perfil actualizado correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el nombre");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#629766" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>

      <SafeAreaView style={styles.contentSafeArea}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

          {/* TARJETA DE PERFIL */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={90} color="#629766" />
            </View>
            <Text style={styles.userName}>{user ? user.name : 'Invitado'}</Text>
            <Text style={styles.userEmail}>{user ? user.email : 'Inicia sesión para comprar'}</Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{orders.length}</Text>
                <Text style={styles.statLabel}>Pedidos</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{cart.length}</Text>
                <Text style={styles.statLabel}>Carrito</Text>
              </View>
            </View>
          </View>


          <Text style={styles.sectionLabel}>Ajustes de Cuenta</Text>
          <View style={styles.optionsContainer}>


            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('EditProfile')}>
              <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
                <Ionicons name="create-outline" size={22} color="#2e7d32" />
              </View>
              <Text style={styles.optionText}>Editar Perfil</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>


            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('ShippingAddress')}>
              <View style={[styles.iconBox, { backgroundColor: '#fff3e0' }]}>
                <Ionicons name="location-outline" size={22} color="#ef6c00" />
              </View>
              <Text style={styles.optionText}>Dirección de Envío</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => navigation.navigate('Settings')}
            >
              <View style={[styles.iconBox, { backgroundColor: '#e3f2fd' }]}>
                <Ionicons name="settings-outline" size={22} color="#1565c0" />
              </View>
              <Text style={styles.optionText}>Configuración General</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

          </View>


          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#629766' },
  header: {
    backgroundColor: '#629766',
    paddingVertical: 18,
    alignItems: 'center',
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  contentSafeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { padding: 20 },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  avatarContainer: { marginBottom: 10 },
  userName: { fontSize: 22, fontWeight: '700', color: '#333', textTransform: 'capitalize' },
  userEmail: { fontSize: 14, color: '#666', marginBottom: 20 },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    width: '100%',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: '700', color: '#629766' },
  statLabel: { fontSize: 12, color: '#999', marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: '#ddd' },

  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
    marginBottom: 10,
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 25,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: { flex: 1, fontSize: 16, color: '#333', fontWeight: '500' },
  logoutButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 15,
    gap: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ProfileScreen;