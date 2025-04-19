import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './app/screens/Welcome.js';
import SignUp from './app/screens/SignUp.js';
import Login from './app/screens/Login.js';
import ConfirmSignUp from './app/screens/ConfirmSignUp.js';
import { AuthProvider } from './app/contexts/AuthContext';
import { Animated, View, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

// Import your new dashboard screens
import UserDashboard from './app/screens/UserDashboard.js';
import AdminDashboard from './app/screens/AdminDashboard.js';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        if (role) {
          setRole(role);
          setInitialRoute(role === 'admin' ? 'AdminDashboard' : 'UserDashboard');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setInitialRoute('Login');
      }
    };

    checkLoginStatus();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E3A59" />
        <View style={{ marginTop: 10 }}>
          <Animated.Text style={{ fontSize: 18 }}>Checking session...</Animated.Text>
        </View>
      </View>
    );
  }

  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Animated.View style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
            <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
              <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
              <Stack.Screen name="UserDashboard" component={UserDashboard} />
            </Stack.Navigator>
          </Animated.View>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
