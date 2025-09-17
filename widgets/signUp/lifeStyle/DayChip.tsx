import { COLORS, FONT_SIZE } from '@/shared/styles';
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
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: COLORS.primary[90],
  },
  unselected: {
    backgroundColor: COLORS.gray[10],
  },
  text: {
    fontSize: FONT_SIZE.b2,
    fontWeight: '400',
    textAlign: 'center',
  },
  selectedText: {
    color: COLORS.white,
  },
  unselectedText: {
    color: COLORS.gray[30],
  },
});
