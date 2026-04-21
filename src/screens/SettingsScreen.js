import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  // Estados para los switches (interruptores)
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#629766" />
      
      {/* Header Verde Sólido */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración General</Text>
      </View>

      <SafeAreaView style={styles.contentSafeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          
          <Text style={styles.sectionLabel}>Preferencias</Text>
          <View style={styles.card}>
            
            {/* Opción: Notificaciones */}
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications-outline" size={22} color="#629766" />
                <Text style={styles.settingText}>Notificaciones Push</Text>
              </View>
              <Switch
                trackColor={{ false: "#ddd", true: "#c8e6c9" }}
                thumbColor={notifications ? "#629766" : "#f4f3f4"}
                onValueChange={() => setNotifications(!notifications)}
                value={notifications}
              />
            </View>

            <View style={styles.divider} />


          </View>

          <Text style={styles.sectionLabel}>Privacidad</Text>
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="eye-outline" size={22} color="#629766" />
                <Text style={styles.settingText}>Guardar Historial</Text>
              </View>
              <Switch
                trackColor={{ false: "#ddd", true: "#c8e6c9" }}
                thumbColor={saveHistory ? "#629766" : "#f4f3f4"}
                onValueChange={() => setSaveHistory(!saveHistory)}
                value={saveHistory}
              />
            </View>
          </View>

          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>vamos fiera siuuu v1.0.0</Text>
            <Text style={styles.aboutSubtext}>Desarrollado con React Native & Expo y mucho amor </Text>
          </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: (StatusBar.currentHeight || 0) + 10,
    paddingHorizontal: 20,
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  contentSafeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { padding: 20 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: '#999', marginBottom: 10, marginLeft: 5, textTransform: 'uppercase' },
  card: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 20, marginBottom: 25, elevation: 3 },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15 },
  settingInfo: { flexDirection: 'row', alignItems: 'center' },
  settingText: { fontSize: 16, color: '#333', marginLeft: 15, fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#f0f0f0' },
  aboutContainer: { alignItems: 'center', marginTop: 20 },
  aboutText: { fontSize: 14, color: '#999', fontWeight: '600' },
  aboutSubtext: { fontSize: 12, color: '#ccc', marginTop: 4 },
});

export default SettingsScreen;