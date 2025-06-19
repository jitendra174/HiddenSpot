import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import API from '../services/api';

export default function MapScreen() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await API.get('/spots');
        setSpots(res.data);
      } catch (err) {
        console.error('Error fetching spots for map:', err);
      }
    };

    fetchSpots();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore the Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 26.2183,
          longitude: 78.1548,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06
        }}
      >
        {spots.map((spot) => (
          <Marker
            key={spot._id}
            coordinate={{
              latitude: spot.latitude || 26.2183,     // fallback if missing
              longitude: spot.longitude || 78.1548
            }}
            title={spot.name}
            description={spot.category}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 40,
    paddingBottom: 10,
    textAlign: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
