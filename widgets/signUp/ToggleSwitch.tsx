import { FormLabel } from '@/shared/components/InputField/FormLabel';
import { COLORS } from '@/shared/styles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <FormLabel text="방 유무" />
      <TouchableOpacity
        style={[styles.toggle, value ? styles.toggleOn : styles.toggleOff]}
        onPress={() => onValueChange(!value)}
      >
        <View style={[styles.toggleButton, value ? styles.toggleButtonOn : styles.toggleButtonOff]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    marginVertical: 8,
  },
  toggle: {
    width: 52,
    height: 28,
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: COLORS.primary[90], // ON일 때 파란색
  },
  toggleOff: {
    backgroundColor: COLORS.gray[20], // OFF일 때 회색
  },
  toggleButton: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
  toggleButtonOn: {
    left: 26,
  },
  toggleButtonOff: {
    left: 2,
  },
});
