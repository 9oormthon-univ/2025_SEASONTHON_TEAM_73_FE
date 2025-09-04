import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tab } from './Tab';

interface TabBarProps {
  activeTab: 'chat' | 'chatRequest';
  onTabPress: (tabId: 'chat' | 'chatRequest') => void;
}


export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  const tabs: { id: 'chat' | 'chatRequest'; title: string }[] = [
    { id: 'chat', title: '채팅' },
    { id: 'chatRequest', title: '채팅 신청' }
  ];

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          title={tab.title}
          isActive={activeTab === tab.id}
          onPress={() => onTabPress(tab.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CBCBCB',
    width: '100%',
    height: 50,
    top: 30
  },
});
