import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface DayChipProps {
  day: string;
  isSelected: boolean;
  onPress: () => void;
}

export const DayChip: React.FC<DayChipProps> = ({ day, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected ? styles.selected : styles.unselected
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.text,
        isSelected ? styles.selectedText : styles.unselectedText
      ]}>
        {day}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#6287F2',
  },
  unselected: {
    backgroundColor: '#E5E5E6',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
  },
  selectedText: {
    color: '#FCFCFC',
  },
  unselectedText: {
    color: '#B3B3B4',
  },
});
