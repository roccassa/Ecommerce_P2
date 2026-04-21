import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShippingAddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSave = () => {
    Alert.alert('Éxito', 'Dirección guardada correctamente');
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#629766" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dirección de Envío</Text>
      </View>

      <SafeAreaView style={styles.contentSafeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Text style={styles.label}>Calle y Número</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Ej: Av. Principal 123" />
            
            <Text style={styles.label}>Ciudad</Text>
            <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="Ej: León" />
            
            <Text style={styles.label}>Código Postal</Text>
            <TextInput style={styles.input} value={zipCode} onChangeText={setZipCode} keyboardType="numeric" placeholder="Ej: 37000" />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Actualizar Dirección</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#629766' },
  header: { backgroundColor: '#629766', paddingVertical: 18, flexDirection: 'row', alignItems: 'center', paddingTop: (StatusBar.currentHeight || 0) + 10, paddingHorizontal: 20 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  backButton: { marginRight: 15 },
  contentSafeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 3 },
  label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8, marginTop: 15 },
  input: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 8, fontSize: 16, color: '#333' },
  saveButton: { backgroundColor: '#629766', paddingVertical: 16, borderRadius: 15, alignItems: 'center', marginTop: 30 },
  saveButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});

export default ShippingAddressScreen;