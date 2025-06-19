import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import * as Location from 'expo-location';
import colors from '../constants/colors';
import API from '../services/api';

const categories = ['Romantic', 'Serene', 'Creative'];

export default function AddSpotScreen() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const glow = useState(new Animated.Value(1))[0];

  // Animate glowing submit button
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [glow]);

  const handleSubmit = async () => {
    if (!name || !desc || !category) {
      return Alert.alert('Incomplete', 'Please fill all fields');
    }

    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return Alert.alert('Location Denied', 'Please allow location access');
      }

      const location = await Location.getCurrentPositionAsync({});
      const newSpot = {
        name,
        description: desc,
        category,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const res = await API.post('/spots', newSpot);

      if (res.status === 201 || res.status === 200) {
        Alert.alert('🎉 Spot Added!', 'Thanks for contributing!');
        setName('');
        setDesc('');
        setCategory('');
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add spot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📝 Add a Hidden Spot</Text>

      <TextInput
        placeholder="Name of the Spot"
        placeholderTextColor={colors.muted}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor={colors.muted}
        value={desc}
        onChangeText={setDesc}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Text style={styles.label}>Select a Category</Text>
      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              styles.catBtn,
              category === cat && styles.catBtnActive,
            ]}
          >
            <Text style={{ color: category === cat ? '#fff' : colors.text, fontFamily: 'Poppins' }}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View style={{ transform: [{ scale: glow }] }}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitText}>{loading ? 'Submitting...' : 'Submit Spot'}</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: colors.text,
    marginBottom: 14,
  },
  label: {
    fontFamily: 'Poppins-Bold',
    color: colors.text,
    marginBottom: 8,
    fontSize: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
    flexWrap: 'wrap',
  },
  catBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.background,
  },
  catBtnActive: {
    backgroundColor: colors.accent,
  },
  submitBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  submitText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
