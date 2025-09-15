import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface WelcomeHeaderProps {}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = () => {
  const handleBackPress = () => {
    router.back();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handleBackPress}>
        {/* 뒤로가기 아이콘 */}
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable> 
      <Text style={styles.welcomeText}>
        안녕하세요:){'\n'}로그인 후 이용해 주세요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: 'rgba(17, 17, 17, 1)',
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '500',
    fontFamily: 'Noto Sans KR, -apple-system, Roboto, Helvetica, sans-serif',
    letterSpacing: -0.1,
    marginTop: 50,
    marginBottom: 56
  },
});
