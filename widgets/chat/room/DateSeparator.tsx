import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DateSeparatorProps {
  date: string;
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  dateText: {
    color: '#5B5B5E',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
});
