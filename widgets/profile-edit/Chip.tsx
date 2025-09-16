import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, selected = false, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.chip, selected ? styles.selectedChip : styles.unselectedChip]}>
        <Text style={[styles.chipText, selected ? styles.selectedText : styles.unselectedText]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: '#6287F2',
  },
  unselectedChip: {
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#CBCBCB',
  },
  chipText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'SUIT',
    fontWeight: '400',
  },
  selectedText: {
    color: '#FCFCFC',
  },
  unselectedText: {
    color: '#CBCBCB',
  },
});
