import api from '@/shared/api/axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderName: string;
  receiverName: string;
  unreadCount: number;
  lastMessage: {
    content: string;
    createdAt: string;
  };
};

export const ChatRequestList: React.FC = () => {
  const [requests, setRequests] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/chatrooms/sender');
        console.log(res);
        const allRequests = Object.values(res.data.data).flat() as ChatRoom[];
        setRequests(allRequests);
      } catch (err) {
        console.error('채팅 요청 목록 조회 실패:', err);
      }
    };
    fetchRequests();
  }, []);

  const renderItem = ({ item }: { item: ChatRoom }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.postTitle}</Text>
      <Text>{item.lastMessage?.content}</Text>
      <Text style={styles.meta}>
        {item.senderName} → {item.receiverName}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={requests}
      renderItem={renderItem}
      keyExtractor={(item) => item.chatRoomId.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  item: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 12,
    color: '#666',
  },
});
