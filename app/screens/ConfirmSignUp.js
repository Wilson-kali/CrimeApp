import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';

const ConfirmSignUp = ({ route, navigation }) => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(route.params?.email || '');

  const handleConfirm = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      Alert.alert('Success', 'Account confirmed! You can now log in.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Confirmation Failed', error.message);
    }
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUp(email);
      Alert.alert('Code Resent', 'Please check your email.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Confirmation Code"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={handleResendCode}>
        <Text style={styles.linkText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2E3A59',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#2E3A59',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
