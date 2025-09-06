import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WeekDayChipProps {
  day: string;
  isActive?: boolean;
}

export const WeekDayChip: React.FC<WeekDayChipProps> = ({ day, isActive = false }) => {
  return (
    <View style={[styles.container, isActive ? styles.activeContainer : styles.inactiveContainer]}>
      <Text style={[styles.text, isActive ? styles.activeText : styles.inactiveText]}>
        {day}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  activeContainer: {
    backgroundColor: '#6287F2',
  },
  inactiveContainer: {
    backgroundColor: '#E5E5E6',
  },
  text: {
    textAlign: 'center',
    fontFamily: "'SUIT Variable',-apple-system,Roboto,Helvetica,sans-serif",
    fontSize: 16,
    lineHeight: 24,
  },
  activeText: {
    color: '#FCFCFC',
    fontWeight: '700',
  },
  inactiveText: {
    color: '#B3B3B4',
    fontWeight: '400',
  },
});
