import { COLORS, FONT_SIZE } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, isSelected, onPress }) => {
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
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: COLORS.primary[90],
  },
  unselected: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[20],
  },
  text: {
    fontSize: FONT_SIZE.b2,
    fontWeight: '400',
  },
  selectedText: {
    color: COLORS.white,
  },
  unselectedText: {
    color: COLORS.gray[20],
  },
});
