import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// 1. CAMBIO: Importamos el hook para usar el contexto
import { useCart } from '../context/CartContext'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. CAMBIO: Extraemos loginUser del contexto
  const { loginUser } = useCart(); 

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tus credenciales');
      return;
    }

    // --- Lógica de Simulación ---
    // En una app real, aquí harías el fetch a tu API de C#
    // Por ahora, vamos a registrar un nombre genérico basado en el email
    const nameFromEmail = email.split('@')[0]; // Saca "francisco" de "francisco@correo.com"
    
    // 3. CAMBIO: Guardamos al usuario en el contexto antes de entrar
    loginUser({ 
      name: nameFromEmail, 
      email: email 
    });

    console.log('Iniciando sesión con:', email);
    
    Alert.alert('Bienvenido', `Hola de nuevo, ${nameFromEmail}`);
    navigation.replace('MainTabs'); 
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#629766" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenido</Text>
      </View>

      <SafeAreaView style={styles.contentSafeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            
            <View style={styles.iconContainer}>
              <Ionicons name="log-in-outline" size={100} color="#629766" />
              <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textContentType="emailAddress"
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
                  textContentType="password"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.registerLink} 
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.registerLinkText}>
                  ¿No tienes cuenta? <Text style={{ fontWeight: 'bold', color: '#629766' }}>Regístrate aquí</Text>
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
    paddingVertical: 30,
    alignItems: 'center',
    paddingTop: (StatusBar.currentHeight || 0) + 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentSafeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  container: {
    padding: 30,
    alignItems: 'center',
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
    height: 60,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#629766',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 30,
    alignItems: 'center',
  },
  registerLinkText: {
    fontSize: 15,
    color: '#666',
  },
});

export default LoginScreen;