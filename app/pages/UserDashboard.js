import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
//import { useAuth } from '../contexts/AuthContext';
import Header from '../components/nav/Header';
import SideBar from '../components/nav/SideBar';
import DashboardStats from '../components/main/DashboardStats';
import CrimeMap from '../components/main/CrimeMap';
import ReportsTable from '../components/main/ReportsTable';
import Button from '../components/ui/Button';

export default function UserDashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <View style={styles.container}>
      <SideBar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem="Dashboard"
      />
      
      <View style={styles.mainContent}>
        <Header 
          title="Officer Dashboard"
          onMenuPress={() => setSidebarOpen(true)}
        />
        
        <ScrollView contentContainerStyle={styles.content}>
          <DashboardStats 
            stats={[
              { title: "My Cases", value: 12, trend: "up" },
              { title: "Active Alerts", value: 3, alert: true },
              { title: "Due Today", value: 2, urgent: true }
            ]}
          />

          <CrimeMap 
            markers={[
              { lat: -1.2921, lng: 36.8219, type: 'theft' },
              { lat: -1.2935, lng: 36.8201, type: 'assault' },
              { lat: -1.2918, lng: 36.8193, type: 'burglary' }
            ]}
            style={styles.map}
          />

          <ReportsTable 
            title="My Recent Cases"
            data={[
              { id: 'C-1001', type: 'Burglary', status: 'Under Investigation', date: '2023-05-15' },
              { id: 'C-1002', type: 'Assault', status: 'Court Processing', date: '2023-05-10' },
              { id: 'C-1003', type: 'Theft', status: 'Evidence Review', date: '2023-05-08' }
            ]}
            onPressItem={(id) => console.log('View case:', id)}
          />

          <View style={styles.actions}>
            <Button 
              icon="add"
              style={styles.actionButton}
              onPress={() => console.log('New report')}
            >
              New Report
            </Button>
            <Button 
              icon="warning"
              style={[styles.actionButton, styles.dangerButton]}
              variant="danger"
            >
              Emergency Alert
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
  },
  mainContent: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  map: {
    height: 300,
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0', // Light background for map to contrast with content
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1D4ED8', // Primary blue color for regular actions
    marginRight: 8, 
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  dangerButton: {
    backgroundColor: '#EF4444', // Red color for emergency alerts
  },
});
