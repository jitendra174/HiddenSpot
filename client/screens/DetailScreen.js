import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { spot } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: spot.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{spot.name}</Text>
        <Text style={styles.meta}>
          {spot.category} • {spot.distance}
        </Text>

        <Text style={styles.sectionTitle}>Story</Text>
        <Text style={styles.story}>
          This spot is known for its peaceful atmosphere and hidden charm. It s a perfect place for {spot.category.toLowerCase()} vibes.
        </Text>

        <Text style={styles.sectionTitle}>Vibe Ratings</Text>
        <Text>⭐ Vibe: 4.8</Text>
        <Text>🔒 Safety: 4.6</Text>
        <Text>👥 Crowd: Low</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 240 },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold' },
  meta: { color: '#777', marginVertical: 6 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  story: { marginTop: 8, fontSize: 15, lineHeight: 22, color: '#333' }
});
