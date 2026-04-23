import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const EditProfileScreen = ({ navigation }) => {
  //const { user, loginUser } = useCart();
  //const [newName, setNewName] = useState(user?.name || '');

  const { user, updateUser } = useCart(); 
  const [newName, setNewName] = useState(user?.name || '');

  const handleSave = async () => {
    if (!newName.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    await updateUser({ name: newName });

    // Actualizamos el usuario en el contexto
    //await loginUser({ ...user, name: newName });
    Alert.alert('Éxito', 'Perfil actualizado correctamente');
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#629766" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </View>

      <SafeAreaView style={styles.contentSafeArea}>
        <View style={styles.container}>
          <View style={styles.inputCard}>
            <Text style={styles.label}>Nombre Completo</Text>
            <View style={styles.inputGroup}>
              <Ionicons name="person-outline" size={20} color="#629766" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
                placeholder="Tu nombre"
              />
            </View>
            
            <Text style={[styles.label, { marginTop: 20 }]}>Correo Electrónico (No editable)</Text>
            <View style={[styles.inputGroup, { backgroundColor: '#f1f3f5' }]}>
              <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
              <Text style={[styles.input, { color: '#999', paddingTop: 15 }]}>{user?.email}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#629766' },
  header: {
    backgroundColor: '#629766',
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: (StatusBar.currentHeight || 0) + 10,
    paddingHorizontal: 20,
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  contentSafeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { padding: 20 },
  inputCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 3 },
  label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  saveButton: {
    backgroundColor: '#629766',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});

export default EditProfileScreen;