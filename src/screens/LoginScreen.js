import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image,  StyleSheet, SafeAreaView, Alert, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoEmpresa from '../../assets/logo-r.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCart } from '../context/CartContext'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { loginUser } = useCart(); 

  const handleLogin = async () => { 
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tus credenciales');
      return;
    }

    try {
      // 1. Obtener la lista de usuarios guardados
      const usersJson = await AsyncStorage.getItem('@RegisteredUsers');
      const users = usersJson ? JSON.parse(usersJson) : [];

      // 2. Buscar si las credenciales coinciden
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        // 3. Si existe, guardar la sesión en el contexto y entrar
        loginUser({ 
          name: foundUser.name, 
          email: foundUser.email 
        });

        Alert.alert('Bienvenido', `Hola de nuevo, ${foundUser.name}`);
        navigation.replace('MainTabs'); 
      } else {
        // 4. Si no coincide, lanzar error real
        Alert.alert('Error', 'Correo o contraseña incorrectos');
      }
    } catch (e) {
      Alert.alert('Error', 'Ocurrió un problema al validar los datos');
    }
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
              <Image 
                  source={LogoEmpresa} 
                  style={styles.logoImage} 
                  resizeMode="contain"  
              />
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
    marginBottom: 20,
  //  marginTop: 10,
  },
  logoImage: {
    width: 350,  // Ajusta el ancho según prefieras
    height: 350, // Ajusta el alto según prefieras
    marginBottom: 5, // Espacio entre la imagen y el texto "Inicia sesión..."
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
    marginBottom: 30,
  },
});

export default LoginScreen;