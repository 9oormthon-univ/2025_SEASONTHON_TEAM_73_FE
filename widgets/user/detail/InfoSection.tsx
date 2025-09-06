import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InfoSectionProps {
  title: string;
  value: string;
  showBorder?: boolean;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ title, value, showBorder = true }) => {
  return (
    <View style={[styles.container, showBorder && styles.withBorder]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingTop: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    alignSelf: 'stretch',
    flex: 1,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  title: {
    alignSelf: 'stretch',
    color: '#17171B',
    fontFamily: "'SUIT Variable',-apple-system,Roboto,Helvetica,sans-serif",
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  value: {
    alignSelf: 'stretch',
    color: '#17171B',
    fontFamily: "'SUIT Variable',-apple-system,Roboto,Helvetica,sans-serif",
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
});
