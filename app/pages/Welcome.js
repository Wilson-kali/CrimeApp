import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome to the Crime Reporting App</Text>
      <Text style={styles.description}>This is a platform to report and track crime data in real-time. Let's get started!</Text>

      {/* Button to navigate to the SignUp screen */}
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('SignUp')}  // Navigate to SignUp screen
        color="#4C9A2A"  // Use the same green color for consistency
      />
    </View>
  );
};

// Styles for the welcome screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',  // Soft light blue background
    padding: 20,
  },
  logo: {
    width: 120,  // Adjust logo size
    height: 120,
    marginBottom: 30,  // Space between logo and text
  },
  title: {
    fontSize: 32,  // Larger font size for better readability
    fontWeight: 'bold',
    color: '#4C9A2A',  // Matching color for consistency
    marginBottom: 20,
    fontFamily: 'Roboto',  // Modern font style
  },
  description: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Roboto',  // Modern font style
  },
});

export default Welcome;
