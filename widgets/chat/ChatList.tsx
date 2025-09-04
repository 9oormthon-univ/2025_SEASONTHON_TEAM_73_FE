import { ChatRoomList } from '@/widgets/chat/ChatRoomList';
import { TabBar } from '@/widgets/chat/TabBar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ChatRequestList } from './ChatRequest';

export const ChatList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'chatRequest'>('chat');

  const handleTabPress = (tabId: 'chat' | 'chatRequest') => {
    setActiveTab(tabId);
  };

  return (
    <View style={styles.container}>
      <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
      <View style={styles.content}>
        {activeTab === 'chat' ? <ChatRoomList /> : <ChatRequestList />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default ChatList;
