import { COLORS, FONT_SIZE } from '@/shared/styles';
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
    color: COLORS.gray[80],
    textAlign: 'center',
    fontSize: FONT_SIZE.c1,
    fontWeight: '700',
  },
});
