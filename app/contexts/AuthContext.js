// Importing React and related hooks
import React, { createContext, useEffect, useState } from 'react';
// AsyncStorage is used to persist data locally (like shared preferences in Android)
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context that we can use throughout the app
export const AuthContext = createContext();

// This component wraps the whole app and provides the context values
export const AuthProvider = ({ children }) => {
  // `user` will store user_id and role, e.g., { user_id: "abc123", role: "admin" }
  const [user, setUser] = useState(null);

  // Used to show loading state (e.g., splash screen) while checking login status
  const [isLoading, setIsLoading] = useState(true);

  // This function runs once when the app loads
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Try to get stored credentials from AsyncStorage
        const user_id = await AsyncStorage.getItem('user_id');
        const role = await AsyncStorage.getItem('role');

        // If we found both values, update user state
        if (user_id && role) {
          setUser({ user_id, role });
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      } finally {
        // No matter what happens, stop loading state
        setIsLoading(false);
      }
    };

    checkLoginStatus(); // Run the login status checker
  }, []);

  // Call this function after successful login to save and update user state
  const login = async (user_id, role) => {
    try {
      // Save login details locally
      await AsyncStorage.setItem('user_id', user_id);
      await AsyncStorage.setItem('role', role);

      // Update user state
      setUser({ user_id, role });
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  // Clears the user's data and logs them out
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('role');

      // Reset user state to null
      setUser(null);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  // Makes the user data and login/logout methods available to the whole app
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
