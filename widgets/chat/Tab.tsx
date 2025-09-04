import { FONT_SIZE } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TabProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

export const Tab: React.FC<TabProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.tabContainer,
        isActive && styles.activeTabContainer
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={[
          styles.titleText,
          isActive ? styles.activeTitleText : styles.inactiveTitleText
        ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Tab.tsx
const styles = StyleSheet.create({
  tabContainer: {
    flex: 1, // 두 탭이 균등하게 차지하도록
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  activeTabContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#6287F2',
  },
  titleText: {
    fontSize: FONT_SIZE.b1,
  },
  activeTitleText: {
    color: '#6287F2',
    fontWeight: '700',
  },
  inactiveTitleText: {
    color: '#CBCBCB',
    fontWeight: '400',
  },
});

