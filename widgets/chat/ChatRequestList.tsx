import React from 'react';
import { ScrollView, View } from 'react-native';
import ChatListItem from './ChatListItem';

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderName: string;
  receiverName: string;
  unreadCount: number;
  lastMessage: { content: string | null; createdAt: string } | null;
};

interface ChatRequestListProps {
  requests: ChatRoom[];
}

const ChatRequestList: React.FC<ChatRequestListProps> = ({ requests }) => {
  return (
    <ScrollView >
      {requests.map((request) => (
        <View key={request.chatRoomId}>
          <ChatListItem chat={request} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ChatRequestList;
