import { Button } from '@/shared/components/Button/Button';
import { OnboardingTitle } from '@/widgets/onboarding/OnboardingTitle';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const onboardingScreen: React.FC = () => {
  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    //router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.headerSection}>
          {/* <ProgressIndicator /> */}
          <OnboardingTitle />
        </View>
      </View>

      <Image
        source={{
          uri: "https://api.builder.io/api/v1/image/assets/TEMP/541f05f67f00ac4b02854c230b04eae7eb3b12c3?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c",
        }}
        style={styles.illustration}
        resizeMode="contain"
      />

      <Button
        text="로그인"
        onPress={handleLogin}
        style={styles.loginButton}
        size='lg'
      />

      <Button
        text="회원가입"
        onPress={handleSignUp}
        size='lg'
        style={styles.signUpButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 68,
    paddingRight: 18,
    paddingBottom: 68,
    paddingLeft: 18,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  contentWrapper: {
    display: 'flex',
    width: 300,
    maxWidth: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerSection: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    aspectRatio: 0.73,
    width: 222,
    marginTop: 36,
    maxWidth: '100%',
  },
  loginButton: {
    marginTop: 103,
  },
  signUpButton: {
    marginTop: 19,
    zIndex: 10,
  },
});


export default onboardingScreen;
