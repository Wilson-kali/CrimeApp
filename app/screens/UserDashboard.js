// app/pages/UserDashboard.js
import React from 'react';
import { View, ScrollView, StyleSheet, Text, Appearance } from 'react-native';
import Card from '../components/ui/Card'; // Custom button component
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


const UserDashboard = () => {
  const navigation = useNavigation();

  // Get the current system theme (light or dark)
  const colorScheme = Appearance.getColorScheme();

  // Define styles dynamically based on the theme
  const styles = getStyles(colorScheme);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🚨 Welcome to the Crime App Dashboard</Text>

      <View style={styles.cardContainer}>
        <Card
          title="Report a Crime"
          icon={<MaterialCommunityIcons name="police-badge" size={32} color="blue" />}
          onPress={() => navigation.navigate('ReportCrimeScreen')}
          backgroundColor="#e74c3c"
        />

        <Card
          title="Crime Map"
          icon={<Entypo name="map" size={32} color="#fff" />}
          onPress={() => navigation.navigate('CrimeMapScreen')}
          backgroundColor="#3498db"
        />

        <Card
          title="Crime Alerts"
          icon={<Ionicons name="notifications" size={32} color="#fff" />}
          onPress={() => navigation.navigate('AlertsScreen')}
          backgroundColor="#f39c12"
        />

        <Card
          title="Crime Statistics"
          icon={<MaterialCommunityIcons name="chart-bar" size={32} color="#fff" />}
          onPress={() => navigation.navigate('StatisticsScreen')}
          backgroundColor="#27ae60"
        />

        <Card
          title="Track Reports"
          icon={<MaterialCommunityIcons name="clipboard-check-outline" size={32} color="#fff" />}
          onPress={() => navigation.navigate('ReportStatusScreen')}
          backgroundColor="#8e44ad"
        />

        <Card
          title="Profile"
          icon={<Ionicons name="person-circle" size={32} color="#fff" />}
          onPress={() => navigation.navigate('ProfileScreen')}
          backgroundColor="#2c3e50"
        />
      </View>
    </ScrollView>
  );
};

// Function to return styles based on the current theme
const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? '#2c3e50' : 'black', // Dark background for dark mode, light for light mode
      paddingHorizontal: 15,
      paddingTop: 40,
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colorScheme === 'dark' ? '#ecf0f1' : '#2c3e50', // Light text for dark mode, dark text for light mode
      textAlign: 'center',
    },
    cardContainer: {
      gap: 20,
    },
  });
};

export default UserDashboard;