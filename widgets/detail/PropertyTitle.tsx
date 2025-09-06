import { COLORS, FONT_SIZE, FONTS } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  location: string;
};

const PropertyTitle: React.FC<Props> = ({ title, deposit, monthlyRent, maintenanceFee, location }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>
        {deposit}/{monthlyRent}/{maintenanceFee}
      </Text>
      <Text style={styles.location}>{location}</Text>
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
