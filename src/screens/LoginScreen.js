import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { Auth } from 'aws-amplify';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await Auth.signIn(email, password);
      navigation.navigate('Home');
    } catch (err) {
      setError(err.message || 'Error signing in');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Login" />
        <Card.Content>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput label="Email" mode="outlined" onChangeText={setEmail} value={email} />
          <TextInput label="Password" mode="outlined" secureTextEntry onChangeText={setPassword} value={password} />
          <Button mode="contained" onPress={handleLogin} loading={loading} style={styles.button}>
            Login
          </Button>
          <Button onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign Up</Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, },
  card: { padding: 20, backgroundColor: 'pink' },
  button: { marginTop: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

export default LoginScreen;
