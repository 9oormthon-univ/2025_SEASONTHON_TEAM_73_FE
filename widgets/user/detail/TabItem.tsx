import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TabItemProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const TabItem: React.FC<TabItemProps> = ({ title, isActive = false, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, isActive && styles.activeContainer]}>
      <Text style={[styles.title, isActive && styles.activeTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  activeContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#6287F2',
  },
  title: {
    color: '#CBCBCB',
    fontFamily: "'SUIT Variable',-apple-system,Roboto,Helvetica,sans-serif",
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  activeTitle: {
    color: '#6287F2',
    fontWeight: '700',
  },
});
