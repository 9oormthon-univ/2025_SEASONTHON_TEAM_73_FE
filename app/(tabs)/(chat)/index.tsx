import { TabBar } from '@/widgets/chat/TabBar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const ChatScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'chatRequest'>('chat');

  const handleTabPress = (tabId: 'chat' | 'chatRequest') => {
    setActiveTab(tabId);
  };

  return (
    <View style={styles.container}>
      <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
