import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Card({ title, value, trend, alert, style }) {
  const [activeTab, setActiveTab] = useState('Value'); // State to track which tab is selected

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>

      {/* Tab Bar for switching between sections */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Value' && styles.activeTab]}
          onPress={() => handleTabChange('Value')}
        >
          <Text style={[styles.tabText, activeTab === 'Value' && styles.activeTabText]}>
            Value
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Trend' && styles.activeTab]}
          onPress={() => handleTabChange('Trend')}
        >
          <Text style={[styles.tabText, activeTab === 'Trend' && styles.activeTabText]}>
            Trend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Alert' && styles.activeTab]}
          onPress={() => handleTabChange('Alert')}
        >
          <Text style={[styles.tabText, activeTab === 'Alert' && styles.activeTabText]}>
            Alert
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render content based on selected tab */}
      <View style={styles.content}>
        {activeTab === 'Value' && <Text style={styles.value}>{value}</Text>}
        {activeTab === 'Trend' && (
          <Text style={[styles.trend, trend === 'up' ? styles.trendUp : styles.trendDown]}>
            {trend === 'up' ? '↑' : '↓'}
          </Text>
        )}
        {activeTab === 'Alert' && alert && <View style={styles.alertDot} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2c3e50', // Dark card background
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    color: '#BFD7ED',
    marginBottom: 10,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#BFD7ED',
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    color: '#BFD7ED', // Light text for tabs
  },
  activeTab: {
    borderBottomColor: '#10B981', // Green color when tab is active
  },
  activeTabText: {
    color: '#10B981', // Green color for active tab text
  },
  content: {
    alignItems: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  trend: {
    marginTop: 10,
    fontSize: 18,
  },
  trendUp: {
    color: '#10B981',
  },
  trendDown: {
    color: '#EF4444',
  },
  alertDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
});
