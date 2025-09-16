import { COLORS, FONT_SIZE, FONTS } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FormLabelProps {
  text: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    position: 'relative',
  },
  text: {
    color: COLORS.black,
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.regular,
    lineHeight: 21,
  },
});
