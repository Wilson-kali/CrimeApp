import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CrimeStatisticsCard = ({ statsTitle, statsValue }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{statsTitle}</Text>
    <Text style={styles.value}>{statsValue}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 22,
  },
});

export default CrimeStatisticsCard;
