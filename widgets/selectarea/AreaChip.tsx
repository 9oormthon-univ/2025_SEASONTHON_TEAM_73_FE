import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CloseIcon } from './CloseIcon';

interface AreaChipProps {
  text: string;
  onRemove?: () => void;
}

export const AreaChip: React.FC<AreaChipProps> = ({ text, onRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onRemove}>
        <CloseIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#7394F3',
    borderRadius: 20,
    gap: 8,
  },
  text: {
    color: '#FCFCFC',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'SUIT Variable',
    lineHeight: 18,
  },
});
