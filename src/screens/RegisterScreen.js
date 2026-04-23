import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const handleRegister = async () => { // Agregamos async
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      // 1. Obtener la lista actual de usuarios
      const existingUsers = await AsyncStorage.getItem('@RegisteredUsers');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // 2. Verificar si el correo ya existe
      if (users.find(u => u.email === email)) {
        Alert.alert('Error', 'Este correo ya está registrado');
        return;
      }

      // 3. Agregar el nuevo usuario y guardar
      const newUser = { name, email, password };
      users.push(newUser);
      await AsyncStorage.setItem('@RegisteredUsers', JSON.stringify(users));

      Alert.alert('Éxito', 'Cuenta creada correctamente', [
        { text: 'Ir al Login', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar la información');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#629766" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crear Cuenta</Text>
      </View>

      <SafeAreaView style={styles.contentSafeArea}>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            
            <View style={styles.iconContainer}>
              <Ionicons name="person-add-outline" size={80} color="#629766" />
              <Text style={styles.subtitle}>Regístrate para comenzar a comprar</Text>
            </View>

            <View style={styles.form}>
       
              <View style={styles.inputGroup}>
                <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nombre completo"
                  value={name}
                  onChangeText={setName}
                />
              </View>

            
              <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

             
              <View style={styles.inputGroup}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

             
              <View style={styles.inputGroup}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar contraseña"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Registrarse</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.loginLink} 
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginLinkText}>
                  ¿Ya tienes cuenta? <Text style={{ fontWeight: 'bold', color: '#629766' }}>Inicia Sesión</Text>
                </Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentSafeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
  },
  container: {
    padding: 30,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#629766',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 15,
    color: '#666',
  },
});

export default RegisterScreen;