import { useAuthStore } from '@/shared/store';
import { COLORS, FONT_SIZE } from '@/shared/styles';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderId: number;
  senderName: string;
  senderProfile: any;
  receiverId: number;
  receiverName: string;
  receiverProfile: any;
  unreadCount: number;
  lastMessage: { content: string | null; createdAt: string } | null;
};


interface ChatListItemProps {
  chat: ChatRoom;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
  const myUserId = useAuthStore.getState().userId;

  // 상대방 이름 계산
  const otherName = chat.senderId === Number(myUserId) ? chat.receiverName : chat.senderName;
  const otherProfile = chat.senderId === Number(myUserId) ? chat.receiverProfile : chat.senderProfile;

  return (
    <View style={styles.item}>
      <Image
        source={otherProfile ? { uri: otherProfile } : require('./images/friendIcon.png')}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{otherName}</Text>
        <Text
          style={styles.message}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {chat.lastMessage?.content ?? ''}
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  item: {
    width: "100%",
    height: 81,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 18,
    top: 10,
    borderBottomColor: COLORS.gray[10],
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: { fontWeight: 'bold', fontSize: FONT_SIZE.b1 },
  message: { fontSize: FONT_SIZE.b2, color: COLORS.gray[70], marginTop: 6 },
});

export default ChatListItem;
