import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, ActivityIndicator } from 'react-native';

// Custom Modal for Success
const SuccessModal = ({ visible, onClose }) => (
  <Modal transparent={true} visible={visible} animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Sign-up successful!</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const SignUp = ({ navigation }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // For showing modal
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    console.log('🚀 handleSignUp called');
    console.log('📝 Form Data:', {
      fname,
      lname,
      email,
      contact,
      password,
      confirmPassword,
    });

    // Trim inputs to remove any unnecessary spaces
    const trimmedFname = fname.trim();
    const trimmedLname = lname.trim();
    const trimmedEmail = email.trim();
    const trimmedContact = contact.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    // Validate password strength
    if (trimmedPassword.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return;
    }

    // Password matching check
    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert('Password mismatch', 'The passwords do not match.');
      return;
    }

    setLoading(true);
    console.log('🔄 Signing up...');

    try {
      const response = await fetch('https://cwzl7wr9l5.execute-api.us-east-1.amazonaws.com/dev/items', {  // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: trimmedFname,
          lastName: trimmedLname,
          email: trimmedEmail,
          phone: trimmedContact,
          password: trimmedPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ SignUp success: ', data);

        // Navigate to Login after successful sign-up
        setModalVisible(true);
      } else {
        console.error('❌ SignUp Error:', data.message);
        setErrorMessage(data.message || 'Unknown error occurred.');
      }
    } catch (error) {
      console.error('❌ SignUp Error:', error);
      setErrorMessage(error.message || 'Unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        setModalVisible(false); // Close the modal after 3 seconds
        navigation.navigate('Login'); // Automatically navigate to Login page
      }, 3000); // 3000ms = 3 seconds
    }
  }, [modalVisible]);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2E3A59" />
      <Text style={{ fontSize: 20 }}>Signing you up, please wait...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fname}
        onChangeText={(val) => {
          setFname(val);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lname}
        onChangeText={(val) => {
          setLname(val);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={(val) => {
          setEmail(val);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone (Optional)"
        value={contact}
        keyboardType="phone-pad"
        onChangeText={(val) => {
          setContact(val);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(val) => {
          setPassword(val);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={(val) => {
          setConfirmPassword(val);
        }}
      />

      <TouchableOpacity
        style={[styles.button, { opacity: loading || !fname || !lname || !email || !password || !confirmPassword ? 0.5 : 1 }]}
        onPress={handleSignUp}
        disabled={loading || !fname || !lname || !email || !password || !confirmPassword}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>

      {/* Custom Success Modal */}
      <SuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 20,
  },
  input: {
    width: '98%',
    padding: 11,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 5,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E3A59',
    padding: 10,
    borderRadius: 8,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginText: {
    color: '#2E3A59',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#2E3A59',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignUp;
