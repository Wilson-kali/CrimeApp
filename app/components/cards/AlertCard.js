import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertCard = ({ alertMessage }) => (
  <View style={styles.card}>
    <Text style={styles.message}>{alertMessage}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffcccc',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#900',
  },
});

export default AlertCard;
