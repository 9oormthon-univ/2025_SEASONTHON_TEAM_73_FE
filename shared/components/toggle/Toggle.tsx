import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ToggleProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: isOn ? '#85A2F5' : '#E5E5E6' }]}
      onPress={() => onToggle(!isOn)}
      activeOpacity={0.8}
    >
      <View style={[
        styles.thumb,
        {
          backgroundColor: '#FFFFFF',
          transform: [{ translateX: isOn ? 24 : 0 }]
        }
      ]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 28,
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 20,
  },
});
