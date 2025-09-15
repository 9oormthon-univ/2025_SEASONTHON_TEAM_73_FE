import { COLORS } from '@/shared/styles';
import { SplashImages } from '@/widgets/loading/SplashImages';
import { WelcomeText } from '@/widgets/loading/WelcomeText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SplashScreenProps {}

export const LoadingScreen: React.FC<SplashScreenProps> = () => {
  return (
    <View style={styles.container}>
      <SplashImages />
      <WelcomeText />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});

export default LoadingScreen;
