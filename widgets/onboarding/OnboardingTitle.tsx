import { COLORS, FONT_SIZE, FONTS } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const OnboardingTitle: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.normalText}>다양한 조건을 바탕으로{'\n'}</Text>
        <Text style={styles.highlightedText}>룸메이트</Text>
        <Text style={styles.normalText}>를 찾아요</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    marginTop: 116,
  },
  text: {
    color: 'rgba(17, 17, 17, 1)',
    letterSpacing: -0.6,
    textAlign: 'center', // ✅ 텍스트 가운데 정렬
    fontSize: FONT_SIZE.h2,
    fontFamily: FONTS.bold,
  },
  normalText: {
    color: 'rgba(17, 17, 17, 1)',
  },
  highlightedText: {
    color: COLORS.primary[100],
  },
});

