import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BarChart from '../ui/BarChart';

export default function ChartSection({ charts = [] }) {
  return (
    <View style={styles.container}>
      {charts.map((chart, index) => (
        <View key={index} style={styles.chartContainer}>
          <Text style={styles.title}>{chart.title}</Text>
          {chart.type === 'bar' && (
            <BarChart 
              data={chart.data} 
              colors={['#2563EB', '#10B981', '#F59E0B', '#EF4444']}
            />
          )}
          {chart.type === 'pie' && (
            <View style={styles.pieLegend}>
              {chart.data.map((item, i) => (
                <View key={i} style={styles.legendItem}>
                  <View style={[
                    styles.colorBox,
                    { backgroundColor: `hsl(${i * 60}, 70%, 50%)` }
                  ]} />
                  <Text style={styles.legendText}>
                    {item.label}: {item.value}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  pieLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#64748B',
  },
});