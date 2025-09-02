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
    color: '#17171B',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
  },
  price: {
    color: '#17171B',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    marginTop: 10,
  },
  location: {
    color: '#878789',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    marginTop: 10,
  },
});

export default PropertyTitle;
