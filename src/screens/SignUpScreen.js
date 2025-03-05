import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Card, RadioButton } from 'react-native-paper';
import { Auth } from 'aws-amplify';

const SignUpScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    gender: 'Male',
  });
  const [confirmCode, setConfirmCode] = useState('');
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      await Auth.signUp({
        username: form.email,
        password: form.password,
        attributes: {
          given_name: form.firstName,
          family_name: form.lastName,
          email: form.email,
          phone_number: form.contact,
          gender: form.gender.toLowerCase(),
        },
      });
      setStage(2);
    } catch (err) {
      setError(err.message || 'Error signing up');
    }
    setLoading(false);
  };

  const confirmSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      await Auth.confirmSignUp(form.email, confirmCode);
      navigation.navigate('Login');
    } catch (err) {
      setError(err.message || 'Error confirming sign up');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={stage === 1 ? 'Sign Up' : 'Confirm Account'} />
        <Card.Content>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {stage === 1 ? (
            <>
              <TextInput label="First Name" mode="outlined" onChangeText={(value) => handleChange('firstName', value)} />
              <TextInput label="Last Name" mode="outlined" onChangeText={(value) => handleChange('lastName', value)} />
              <TextInput label="Email" mode="outlined" onChangeText={(value) => handleChange('email', value)} />
              <TextInput label="Contact" mode="outlined" keyboardType="phone-pad" onChangeText={(value) => handleChange('contact', value)} />
              <Text>Password must be at least 8 characters</Text>
              <TextInput label="Password" mode="outlined" secureTextEntry onChangeText={(value) => handleChange('password', value)} />
              <Text style={styles.label}>Gender</Text>
              <RadioButton.Group onValueChange={(value) => handleChange('gender', value)} value={form.gender}>
                <View style={styles.radioContainer}>
                  <RadioButton.Item label="Male" value="Male" />
                  <RadioButton.Item label="Female" value="Female" />
                </View>
              </RadioButton.Group>
              <Button mode="contained" onPress={handleSignUp} loading={loading} style={styles.button}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <TextInput label="Enter Confirmation Code" mode="outlined" onChangeText={setConfirmCode} />
              <Button mode="contained" onPress={confirmSignUp} loading={loading} style={styles.button}>
                Confirm
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { padding: 20 },
  button: { marginTop: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  label: { marginTop: 10, fontWeight: 'bold' },
  radioContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});

export default SignUpScreen;
