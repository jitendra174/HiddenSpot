import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import SpotCard from '../components/SpotCard';
import colors from '../constants/colors';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const featuredSpots = [
    {
      _id: '1',
      name: 'Riverside Walkway',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1170&q=80',
      category: 'Serene',
      distance: '2.1 km',
    },
    {
      _id: '2',
      name: 'Sunset Peak View',
      image: 'https://media.sciencephoto.com/c0/41/46/20/c0414620-800px-wm.jpg',
      category: 'Romantic',
      distance: '3.5 km',
    },
    {
      _id: '3',
      name: 'Graffiti Tunnel',
      image: 'https://www.koreabybike.com/wp-content/uploads/2023/06/Hangang-Bike-Path-Seoul-Jamwon-Hangang-Park-Apgujeong-Rabbit-Cave-Bike-Murals.jpeg',
      category: 'Creative',
      distance: '4.7 km',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#333', '#121212']} style={styles.header}>
        <Text style={styles.title}>
          Discover <Text style={styles.accent}>Hidden</Text> Gems
        </Text>
      </LinearGradient>

      <Text style={styles.subtitle}>
        Secret cafés, sunset spots & creative corners by locals.
      </Text>

      <TextInput
        placeholder="Search places..."
        placeholderTextColor={colors.muted}
        style={styles.search}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.exploreText}>🗺 Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={() => navigation.navigate('AddSpot')}
        >
          <Text style={styles.shareText}>➕ Add Spot</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>✨ Featured Spots</Text>

      <Animated.View style={[styles.verticalList, { opacity: fadeAnim }]}>
        {featuredSpots
          .filter((spot) =>
            spot.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((spot) => (
            <SpotCard
              key={spot._id}
              spot={spot}
              onPress={() => navigation.navigate('Detail', { spot })}
            />
          ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.background },
  header: { paddingVertical: 20, borderRadius: 10 },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: '#fff',
  },
  accent: { color: colors.accent },
  subtitle: {
    fontFamily: 'Poppins',
    color: colors.muted,
    textAlign: 'center',
    marginVertical: 12,
  },
  search: {
    backgroundColor: '#1E1E1E',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  actions: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  exploreBtn: {
    flex: 1,
    backgroundColor: colors.accent,
    padding: 14,
    borderRadius: 12,
  },
  exploreText: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  shareBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: 14,
    borderRadius: 12,
  },
  shareText: {
    color: colors.accent,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginTop: 20,
    marginBottom: 10,
  },
  verticalList: {
    flexDirection: 'column',
    gap: 16,
  },
});
