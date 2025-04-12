import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

const crimeIcons = {
  theft: '💰',
  assault: '👊',
  burglary: '🏠',
  default: '📍'
};

export default function CrimeMap({ markers = [], style }) {
  return (
    <View style={[styles.container, style]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -1.2921,
          longitude: 36.8219,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lng
            }}
            title={marker.type}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>
                {crimeIcons[marker.type] || crimeIcons.default}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  markerText: {
    fontSize: 20,
  },
});