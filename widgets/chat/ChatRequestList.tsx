import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import ChatListItem from './ChatListItem';

interface ChatRequestListProps {
  requests: ChatRoom[];
}

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderName: string;
  receiverName: string;
  unreadCount: number;
  lastMessage: { content: string | null; createdAt: string } | null;
  chatRoomStatus: 'PENDING' | 'ACCEPTED';
};

const ChatRequestList: React.FC<ChatRequestListProps> = ({ requests }) => {
  return (
    <ScrollView>
      {requests.map((request) => (
        <TouchableOpacity
          key={request.chatRoomId}
          onPress={() =>
            router.push({
              pathname: `/room/${request.chatRoomId}` as any,
              params: { 
                senderName: request.senderName,
                chatRoomStatus: request.chatRoomStatus, // 상태 전달
              },
            })
          }
        >
          <ChatListItem chat={request} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ChatRequestList;
