import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Chip } from './Chip';

export const GenderSelector: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>성별</Text>
      </View>
      <View style={styles.chipContainer}>
        <Chip
          label="남성"
          selected={selectedGender === 'male'}
          onPress={() => setSelectedGender('male')}
        />
        <Chip
          label="여성"
          selected={selectedGender === 'female'}
          onPress={() => setSelectedGender('female')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 41,
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 20,
  },
  labelContainer: {
    width: 50,
  },
  label: {
    color: '#17171B',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'SUIT',
    fontWeight: '700',
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
