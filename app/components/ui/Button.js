import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Button({ 
  children, 
  onPress, 
  icon, 
  variant = 'primary', 
  style, 
  loading 
}) {
  const variants = {
    primary: {
      backgroundColor: '#2563EB',
      textColor: 'white',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#2563EB',
      textColor: '#2563EB',
    },
    danger: {
      backgroundColor: '#DC2626',
      textColor: 'white',
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variants[variant],
        style,
        loading && styles.loading
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {icon && <Icon name={icon} size={20} color={variants[variant].textColor} style={styles.icon} />}
      {loading ? (
        <ActivityIndicator color={variants[variant].textColor} />
      ) : (
        <Text style={[styles.text, { color: variants[variant].textColor }]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    marginRight: 8,
  },
  loading: {
    opacity: 0.7,
  },
});