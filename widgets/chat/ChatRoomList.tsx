import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import ChatListItem from './ChatListItem';

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderName: string;
  receiverName: string;
  unreadCount: number;
  lastMessage: { content: string | null; createdAt: string } | null;
  chatRoomStatus: 'PENDING' | 'ACCEPTED';
};

interface ChatRoomListProps {
  rooms: ChatRoom[];
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ rooms }) => {
  return (
    <ScrollView >
      {rooms.map((room) => (
        <TouchableOpacity
            key={room.chatRoomId}
            onPress={() =>
            router.push({
                pathname: `/room/${room.chatRoomId}` as any,
                params: { senderName: room.senderName }, // key 주의!
            })
            }
        >
          <ChatListItem chat={room} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ChatRoomList;
