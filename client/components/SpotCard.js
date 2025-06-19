import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

export default function SpotCard({ spot, onPress }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri: spot.image?.startsWith('http') ? spot.image : fallbackImage
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.name}>{spot.name}</Text>
        <Text style={styles.meta}>
          {spot.category} • {spot.distance || 'Nearby'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.card,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
  },
  meta: {
    color: colors.muted,
    marginTop: 4,
    fontFamily: 'Poppins',
    fontSize: 13,
  },
});
