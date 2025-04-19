import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const TopNav = () => (
  <View style={styles.topNav}>
    <Text style={styles.logo}>CrimeApp</Text>
    <TextInput style={styles.searchInput} placeholder="Search crimes..." />
    <View style={styles.icons}>
      <Ionicons name="notifications" size={30} color="black" style={styles.icon} />
      <Ionicons name="person-circle" size={30} color="black" style={styles.icon} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1877f2',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    flex: 1,
    marginLeft: 10,
    paddingLeft: 15,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
});

export default TopNav;
