import api from '@/shared/api/axios';
import { useAuthStore } from '@/shared/store';
import ChatRequestList from '@/widgets/chat/ChatRequestList';
import ChatRoomList from '@/widgets/chat/ChatRoomList';
import { TabBar } from '@/widgets/chat/TabBar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderName: string;
  receiverName: string;
  unreadCount: number;
  lastMessage: {
    content: string | null;
    createdAt: string;
  } | null;
};

export default function ChatList() {
  const [activeTab, setActiveTab] = useState<'chat' | 'chatRequest'>('chat');
  const [pendingRequests, setPendingRequests] = useState<ChatRoom[]>([]);
  const [acceptedRooms, setAcceptedRooms] = useState<ChatRoom[]>([]);
  const accessToken = useAuthStore.getState().accessToken;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get('/chatrooms/receiver', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        // 안전하게 접근 + 기본값
        const pending = res.data?.data?.PENDING ?? [];
        const accepted = res.data?.data?.ACCEPTED ?? [];

        setPendingRequests(pending);
        setAcceptedRooms(accepted);
      } catch (err) {
        console.error('채팅 목록 조회 실패:', err);
      }
    };

    fetchChats();
  }, []);

  return (
    <View style={styles.container}>
      <TabBar
        activeTab={activeTab}
        onTabPress={(tab) => setActiveTab(tab)}
      />

      {activeTab === 'chat' ? (
        <ChatRoomList rooms={acceptedRooms} />
      ) : (
        <ChatRequestList requests={pendingRequests} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
