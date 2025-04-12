import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../ui/Button';

export default function AdminControls({ actions = [] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Controls</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <Button
            key={index}
            icon={action.icon}
            onPress={action.onPress}
            style={styles.actionButton}
            variant="outline"
          >
            {action.label}
          </Button>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
  },
});