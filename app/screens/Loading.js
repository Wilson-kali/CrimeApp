import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Loading({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.navigate('AppNavigator'), 1500);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
