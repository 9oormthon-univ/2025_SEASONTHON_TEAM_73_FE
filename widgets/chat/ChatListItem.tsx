import { COLORS, FONT_SIZE } from '@/shared/styles';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderName: string;
  receiverName: string;
  unreadCount: number;
  lastMessage: { content: string | null; createdAt: string } | null;
};

interface ChatListItemProps {
  chat: ChatRoom;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
  return (
    <View style={styles.item}>
      <Image
        source={require('./images/friendIcon.png')}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{chat.senderName}</Text>
        <Text   style={styles.message}
                numberOfLines={1}       // 한 줄만 보여주고
                ellipsizeMode="tail"    // 끝에 ... 표시
        >{chat.lastMessage?.content ?? ''}</Text>
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
