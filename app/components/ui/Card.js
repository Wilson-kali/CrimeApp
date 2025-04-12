import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Card({ title, value, trend, alert, style }) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {trend === 'up' && (
          <Text style={[styles.trend, styles.trendUp]}>↑</Text>
        )}
        {trend === 'down' && (
          <Text style={[styles.trend, styles.trendDown]}>↓</Text>
        )}
        {alert && <View style={styles.alertDot} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'yellow', // Dark card background for a professional look
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8, // Deep shadow for emphasis
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 10, // Add spacing between cards
  },
  title: {
    fontSize: 16,
    color: '#BFD7ED', // Light blue for the title to contrast against dark background
    marginBottom: 10,
    fontWeight: '700',
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF', // White text for clear readability on dark background
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trend: {
    marginLeft: 8,
    fontSize: 18,
  },
  trendUp: {
    color: '#10B981', // Green for positive trends
  },
  trendDown: {
    color: '#EF4444', // Red for negative trends
  },
  alertDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444', // Red dot for alerts
    marginLeft: 8,
  },
});
