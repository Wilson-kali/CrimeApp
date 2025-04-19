import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/nav/Header';
import Card from '../components/main/Cards';

const Dashboard = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem('userData');
        if (stored) setUser(JSON.parse(stored));
        else navigation.replace('Login');
      } catch (err) {
        console.error('Error loading user:', err);
        navigation.replace('Login');
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userData');
          navigation.replace('Login');
        },
      },
    ]);
  };

  const renderAdminDashboard = () => {
    return (
      <>
        <Card title="Reported Crimes" value="100+ cases reported" />
        <Card title="Resolved Cases" value="45 cases resolved" />
        <Card title="Emergency Reports" value="5 emergency reports pending" />
      </>
    );
  };

  const renderUserDashboard = () => {
    return (
      <>
        <Card title="My Reports" value="3 reports submitted" />
        <Card title="Resolved Cases" value="2 reports resolved" />
        <Card title="Pending Issues" value="1 report pending" />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="🚔 CrimeApp" user={user} />

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionTitle}>Dashboard Overview</Text>

        {user?.role === 'admin' ? renderAdminDashboard() : renderUserDashboard()}

      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  body: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2E3A59',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#FF5C5C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});
