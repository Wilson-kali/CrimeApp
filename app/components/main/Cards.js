import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Cards() {
  const cardsData = [
    { title: 'Total Crimes', value: 128, color: '#FED7D7' }, // Red-100
    { title: 'Pending Reports', value: 42, color: '#FAF089' }, // Yellow-100
    { title: 'Resolved Cases', value: 85, color: '#C6F6D5' }, // Green-100
  ];

  return (
    <View style={styles.container}>
      {cardsData.map((card, index) => (
        <View
          key={index}
          style={[styles.card, { backgroundColor: card.color }]}
        >
          <Text style={styles.title}>{card.title}</Text>
          <Text style={styles.value}>{card.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '30%', // Adjust width for different screen sizes
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
  },
});
