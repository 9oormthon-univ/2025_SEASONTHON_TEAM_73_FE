import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MessageTextProps {
  message: string;
}

export const MessageText: React.FC<MessageTextProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: '#434347',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
});
