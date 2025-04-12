import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ReportsTable() {
  const reports = [
    { id: 1, title: 'Robbery at Market', status: 'Pending' },
    { id: 2, title: 'Vandalism Report', status: 'Resolved' },
    { id: 3, title: 'Traffic Incident', status: 'In Progress' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <ScrollView horizontal contentContainerStyle={styles.table}>
        <View style={styles.row}>
          <Text style={styles.header}>Title</Text>
          <Text style={styles.header}>Status</Text>
        </View>
        {reports.map((report) => (
          <View key={report.id} style={styles.row}>
            <Text style={styles.cell}>{report.title}</Text>
            <Text style={styles.cell}>{report.status}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3182ce', // Blue-600
  },
  table: {
    marginTop: 8,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0', // Gray-200
  },
  header: {
    flex: 1,
    fontWeight: '600',
    paddingHorizontal: 8,
    textAlign: 'left',
    backgroundColor: '#edf2f7', // Gray-100
  },
  cell: {
    flex: 1,
    paddingHorizontal: 8,
    textAlign: 'left',
  },
});
