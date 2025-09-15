import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface SplashImagesProps {}

export const SplashImages: React.FC<SplashImagesProps> = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://api.builder.io/api/v1/image/assets/TEMP/a0babe0874430a8b21572738892cb26e0d1d16f4?width=308'
        }}
        style={styles.topImage}
        resizeMode="contain"
      />
      <Image
        source={{
          uri: 'https://api.builder.io/api/v1/image/assets/TEMP/47159307d5dd8101fea395aac28af92b5483010b?width=452'
        }}
        style={styles.bottomImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  topImage: {
    width: 154,
    height: 117,
    marginBottom: 7,
  },
  bottomImage: {
    width: 226,
    height: 81,
    marginBottom: 7,
  },
});
