import { COLORS, FONT_SIZE, FONTS } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PropertyTitle: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>강남 한복판 룸메이트 구합니다.</Text>
      <Text style={styles.price}>1000/90/12</Text>
      <Text style={styles.location}>강남구 논현1동</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderBottomColor: '#F2F2F2',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  title: {
    color: COLORS.black,
    fontSize: FONT_SIZE.h2,
    fontFamily: FONTS.bold,
  },
  price: {
    color: COLORS.black,
    fontSize: FONT_SIZE.b1,
    fontFamily: FONTS.regular,
    marginTop: 10,
  },
  location: {
    color: COLORS.gray[50],
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
    marginTop: 10,
  },
});

export default PropertyTitle;
