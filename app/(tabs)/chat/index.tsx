import api from "@/shared/api/axios";
import { useAuthStore } from "@/shared/store";
import { SPACING } from "@/shared/styles";
import ChatRequestList from "@/widgets/chat/ChatRequestList";
import ChatRoomList from "@/widgets/chat/ChatRoomList";
import { TabBar } from "@/widgets/chat/TabBar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type ChatRoom = {
  chatRoomId: number;
  postTitle: string;
  senderName: string;
  senderId: number;
  senderProfile: any;
  receiverId: number;
  receiverProfile: any;
  receiverName: string;
  unreadCount: number;
  lastMessage: {
    content: string | null;
    createdAt: string;
  } | null;
  chatRoomStatus: "PENDING" | "ACCEPTED";
};

export default function ChatList() {
  const [activeTab, setActiveTab] = useState<"chat" | "chatRequest">("chat");
  const [pendingRequests, setPendingRequests] = useState<ChatRoom[]>([]);
  const [acceptedRooms, setAcceptedRooms] = useState<ChatRoom[]>([]);
  const accessToken = useAuthStore.getState().accessToken;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get("/chatrooms/lists", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // 상태별로 분리
        const pending = res.data?.data?.PENDING ?? [];
        const accepted = res.data?.data?.ACCEPTED ?? [];

        setPendingRequests(pending);
        setAcceptedRooms(accepted);
      } catch (err) {
        console.error("채팅 목록 조회 실패:", err);
      }
    };

    fetchChats();
  }, [activeTab, accessToken]);

  return (
    <View style={styles.container}>
      <TabBar activeTab={activeTab} onTabPress={(tab) => setActiveTab(tab)} />

      <View style={styles.contentContainer}>
        {activeTab === "chat" ? (
          <ChatRoomList rooms={acceptedRooms} />
        ) : (
          <ChatRequestList requests={pendingRequests} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: SPACING.md,
  },
});
