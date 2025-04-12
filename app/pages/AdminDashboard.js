import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/nav/Header';
import SideBar from '../components/nav/SideBar';
import DashboardStats from '../components/main/DashboardStats';
import ChartSection from '../components/main/ChartSection';
import AdminControls from '../components/main/AdminControls';
import ReportsTable from '../components/main/ReportsTable';

export default function AdminDashboard() {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        const userName = await AsyncStorage.getItem('user_name');

        if (!userId) {
          navigation.replace('Login');
          return;
        }

        setUser({ name: userName, id: userId });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Log out function
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('user_name');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading Dashboard... 🔄</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>❌ Failed to load user details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <SideBar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem="Dashboard"
        user={user}
      />

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Header
          title="Admin Dashboard"
          onMenuPress={() => setSidebarOpen(true)}
          user={user}
        />

        <ScrollView contentContainerStyle={styles.content}>
          {/* Dashboard Stats */}
          <DashboardStats
            stats={[
              { title: "Total Cases", value: 245, },
              { title: "Solved Cases", value: 178, },
              { title: "Pending Cases", value: 67,},
              { title: "Users", value: 1 },
              { title: "Officers Active", value: 32 },
            ]}
          />

          {/* Charts Section */}
          <ChartSection
            charts={[
              {
                type: 'bar',
                title: '📊 Crimes by Type (Last 30 Days)',
                data: [
                  { label: 'Theft', value: 45 },
                  { label: 'Assault', value: 32 },
                  { label: 'Burglary', value: 28 },
                  { label: 'Fraud', value: 18 },
                ],
              },
              {
                type: 'pie',
                title: '🥧 Case Status Distribution',
                data: [
                  { label: 'Solved', value: 178 },
                  { label: 'Pending', value: 67 },
                ],
              },
            ]}
          />

          {/* Admin Controls */}
          <AdminControls
            actions={[
              { icon: '👮', label: 'Add Officer', onPress: () => {} },
              { icon: '💾', label: 'Backup Data', onPress: () => {} },
              { icon: '⚙️', label: 'System Config', onPress: () => {} },
              { icon: '📄', label: 'Generate Report', onPress: () => {} },
            ]}
            disabled={false}
          />

          {/* Recent Activity */}
          <ReportsTable
            title="🕒 Recent Activity"
            data={[
              { id: 'A-1001', action: 'Case Updated', user: 'Officer Mwangi', time: '2 mins ago' },
              { id: 'A-1002', action: 'New Report', user: 'Officer Atieno', time: '15 mins ago' },
              { id: 'A-1003', action: 'Case Closed', user: 'Officer Kamau', time: '1 hour ago' },
            ]}
            columns={['Action', 'Officer', 'Time']}
          />
        </ScrollView>
      </View>

      {/* Floating Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
        <Text style={styles.logoutText}>🚪 Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
  },
  mainContent: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4B5563',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: '600',
  },
});