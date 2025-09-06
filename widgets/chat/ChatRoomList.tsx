import { COLORS, FONTS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChatListItem from "./ChatListItem";

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderName: string;
  receiverName: string;
  unreadCount: number;
  lastMessage: { content: string | null; createdAt: string } | null;
  chatRoomStatus: "PENDING" | "ACCEPTED";
};

interface ChatRoomListProps {
  rooms: ChatRoom[];
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ rooms }) => {
  // 빈 상태 렌더링
  if (rooms.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="chatbubble-outline"
          size={48}
          color={COLORS.gray[30]}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>채팅이 없어요!</Text>
        <Text style={styles.emptySubText}>아직 시작된 대화가 없습니다</Text>
      </View>
    );
  }

  return (
    <ScrollView>
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

const styles = StyleSheet.create({
  emptyContainer: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.gray[70],
    textAlign: "center",
    marginBottom: SPACING.xs,
    fontFamily: FONTS.medium,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.gray[50],
    textAlign: "center",
    fontFamily: FONTS.regular,
  },
});

export default ChatRoomList;
