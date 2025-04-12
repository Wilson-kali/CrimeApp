import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function AdminControls({ actions = [] }) {  // Default empty array
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Administrative Tools</Text>
      <View style={styles.controlsContainer}>
        {actions.length > 0 ? (
          actions.map((action, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.controlButton, { backgroundColor: action.color }]}
              onPress={action.onPress}
              activeOpacity={0.8}
            >
              <Text style={styles.controlIcon}>{action.icon}</Text>
              <Text style={styles.controlLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noActionsText}>No actions available</Text>  // Fallback message when no actions are available
        )}
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = (width - 48) / 2; // Accounting for padding and gap

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  controlsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  controlButton: {
    width: BUTTON_WIDTH,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 16,
  },
  controlIcon: {
    fontSize: 30,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  noActionsText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    padding: 16,
  },
});
