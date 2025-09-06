import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TabItem } from './TabItem';

interface TabNavigationProps {
  activeTab?: number;
  onTabPress?: (index: number) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab = 0, onTabPress }) => {
  const tabs = ['생활 리듬', '식사 성향', '청소 습관', '소리 민감도', '기타 생활 습관', '질병'];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            title={tab}
            isActive={index === activeTab}
            onPress={() => onTabPress?.(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#CBCBCB',
    backgroundColor: '#FCFCFC',
  },
  container: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
