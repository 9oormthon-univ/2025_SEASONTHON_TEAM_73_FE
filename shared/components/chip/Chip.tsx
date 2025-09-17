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
    backgroundColor: '#6287F2',
  },
  unselected: {
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#CBCBCB',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  selectedText: {
    color: '#FCFCFC',
  },
  unselectedText: {
    color: '#CBCBCB',
  },
});
