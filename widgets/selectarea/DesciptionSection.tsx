import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DescriptionSectionProps {
  title: string;
  subtitle: string;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 8,
  },
  title: {
    color: '#17171B',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'SUIT Variable',
    lineHeight: 24,
  },
  subtitle: {
    color: '#717173',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'SUIT Variable',
    lineHeight: 18,
  },
});
