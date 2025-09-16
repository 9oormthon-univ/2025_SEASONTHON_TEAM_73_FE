import { Button } from '@/shared/components/Button/Button';
import { OnboardingTitle } from '@/widgets/onboarding/OnboardingTitle';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

export const OnboardingScreen: React.FC = () => {
  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/signUp' as any);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flexGrow: 1, // ✅ ScrollView 내부 전체 공간 사용
    justifyContent: 'center', // 세로 가운데 정렬
    alignItems: 'center', // 가로 가운데 정렬
    paddingVertical: 68,
    paddingHorizontal: 18,
  },
  contentWrapper: {
    width: 300,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    aspectRatio: 0.73,
    width: 268,
    marginTop: 36,
  },
  loginButton: {
    marginTop: 103,
  },
  signUpButton: {
    marginTop: 19,
    zIndex: 10,
  },
});

export default OnboardingScreen;
