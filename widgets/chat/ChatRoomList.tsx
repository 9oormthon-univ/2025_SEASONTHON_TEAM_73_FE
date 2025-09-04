import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ChatListItem from './ChatListItem';

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderName: string;
  receiverName: string;
  unreadCount: number;
  lastMessage: { content: string | null; createdAt: string } | null;
};

interface ChatRoomListProps {
  rooms: ChatRoom[];
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ rooms }) => {
  return (
    <ScrollView >
      {rooms.map((room) => (
        <View key={room.chatRoomId} style={styles.itemWrapper}>
          <ChatListItem chat={room} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    marginBottom: 12,
  },
});

export default ChatRoomList;
