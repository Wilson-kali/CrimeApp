import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';

export default function SideBar({ isOpen, onClose, activeItem, user }) {
  const slideAnim = React.useRef(new Animated.Value(-300)).current;
  const { logout } = useContext(AuthContext);  // Access the logout function from context
  const navigation = useNavigation();  // Hook to navigate between screens

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Reports', icon: 'assessment' },
    { name: 'Cases', icon: 'folder' },
    { name: 'Analytics', icon: 'analytics' },
    { name: 'Officers', icon: 'people' },
    { name: 'Settings', icon: 'settings' },
  ];

  return (
    <>
      {isOpen && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={onClose}
          activeOpacity={0.7}
        />
      )}

      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          <Image 
            source={{ uri: user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg' }} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Demo User'}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>
                {user?.role === 'admin' ? 'Administrator' : 'Officer'}
              </Text>
              <Text style={styles.badgeText}>{user?.badgeNumber || 'CD-000'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.menuButton,
                activeItem === item.name && styles.activeMenuButton
              ]}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate(item.name);  // Navigate to the screen
                onClose();  // Optionally close the sidebar after navigation
              }}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                color={activeItem === item.name ? '#3B82F6' : '#64748B'} 
                style={styles.menuIcon}
              />
              <Text style={styles.menuLabel}>{item.name}</Text>
              {activeItem === item.name && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          activeOpacity={0.7}
          onPress={logout}  // Trigger the logout function
        >
          <Icon name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 99,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#FFFFFF',
    zIndex: 100,
    elevation: 10,
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
    paddingTop: 50,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#EFF6FF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: 13,
    color: '#64748B',
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  menu: {
    paddingVertical: 8,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    position: 'relative',
  },
  activeMenuButton: {
    backgroundColor: '#EFF6FF',
  },
  menuIcon: {
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#3B82F6',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  logoutText: {
    fontSize: 15,
    color: '#EF4444',
    fontWeight: '500',
    marginLeft: 16,
  },
});
