import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Crime Reporting App</Text>
      <Button title="Report a Crime" onPress={() => navigation.navigate('Report')} />
    </View>
  );
};

export default HomeScreen;
