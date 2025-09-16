import { useAuthStore } from "@/shared/store";
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

interface ChatRequestListProps {
  requests: ChatRoom[];
}

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
  chatRoomStatus: "PENDING" | "ACCEPTED";
};

const ChatRequestList: React.FC<ChatRequestListProps> = ({ requests }) => {

const myUserId = useAuthStore.getState().userId;

  if (requests.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="mail-outline"
          size={48}
          color={COLORS.gray[30]}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>신청이 없어요!</Text>
        <Text style={styles.emptySubText}>아직 받은 채팅 신청이 없습니다</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {requests.map((request) => {
        // 상대방 이름 계산
        const otherName =
          request.senderId === Number(myUserId)
            ? request.receiverName
            : request.senderName;

        return (
          <TouchableOpacity
            key={request.chatRoomId}
            onPress={() =>
              router.push({
                pathname: `/chat/room/${request.chatRoomId}` as any,
                params: {
                  senderName: otherName,
                  chatRoomStatus: request.chatRoomStatus, // 상태 전달
                },
              })
            }
          >
            <ChatListItem chat={request} />
          </TouchableOpacity>
        );
      })}
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

export default ChatRequestList;
