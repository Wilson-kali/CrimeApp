import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BarChart({ data, colors }) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.barContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={styles.barBackground}>
            <View 
              style={[
                styles.barFill,
                { 
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: colors[index % colors.length]
                }
              ]}
            />
          </View>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    width: 80,
    fontSize: 12,
    color: '#64748B',
  },
  barBackground: {
    flex: 1,
    height: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 8,
  },
  value: {
    width: 30,
    textAlign: 'right',
    fontSize: 12,
    color: '#1E293B',
  },
});