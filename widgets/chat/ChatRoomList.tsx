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

export const ChatRoomList: React.FC = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/chatrooms/receiver');
        console.log(res.data);
        // res.data.data.additionalProp1 같은 구조니까 전개 처리 필요
        const allRooms = Object.values(res.data.data).flat() as ChatRoom[];
        setRooms(allRooms);
      } catch (err) {
        console.error('채팅방 목록 조회 실패:', err);
      }
    };
    fetchRooms();
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
      data={rooms}
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
