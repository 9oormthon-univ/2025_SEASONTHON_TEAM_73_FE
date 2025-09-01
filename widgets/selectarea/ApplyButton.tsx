import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ApplyButtonProps {
  onPress?: () => void;
}

export const ApplyButton: React.FC<ApplyButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>적용</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    gap: 8,
  },
  button: {
    height: 40,
    paddingHorizontal: 40,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#6287F2',
  },
  buttonText: {
    color: '#FCFCFC',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'SUIT Variable',
  },
});
