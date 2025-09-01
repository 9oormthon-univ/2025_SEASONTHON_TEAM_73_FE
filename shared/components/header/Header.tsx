import { FONT_SIZE, FONTS } from '@/shared/styles';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackIcon } from '../icon/BackIcon';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <BackIcon />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: '#FCFCFC',
    minHeight: 56,
    gap: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#9D9D9F',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: '#17171B',
    fontSize: FONT_SIZE.b1,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    lineHeight: 24,
  },
});
