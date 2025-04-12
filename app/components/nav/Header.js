import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../contexts/AuthContext';

const Header = ({ title = "CrimeApp" }) => {
  const { user } = useContext(AuthContext);
  
  console.log('User from context:', user); // Debugging line to see user

  const getInitials = (name) => {
    if (!name) return '👤';
    const parts = name.trim().split(' ');
    return parts.map(p => p[0]).join('').toUpperCase();
  };

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Icon name="shield-checkmark-outline" size={28} color="#2563EB" />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.userContainer}>
        <Text style={styles.welcomeText}>Hi, {user?.name || 'Guest'}</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(user?.name)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 8,
  },
  avatar: {
    backgroundColor: '#2563EB',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Header;
