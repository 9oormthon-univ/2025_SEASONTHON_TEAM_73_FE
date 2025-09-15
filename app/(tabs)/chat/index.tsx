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
        // 병렬 처리
        const [receiverRes, senderRes] = await Promise.all([
          api.get("/chatrooms/receiver", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          api.get("/chatrooms/sender", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        // receiver, sender 각각 데이터 안전하게 접근 + 기본값
        const pending = receiverRes.data?.data?.PENDING ?? [];
        const acceptedReceiver = receiverRes.data?.data?.ACCEPTED ?? [];
        const acceptedSender = senderRes.data?.data?.ACCEPTED ?? [];

        // 수신/발신 ACCEPTED 합치기
        const accepted = [...acceptedReceiver, ...acceptedSender];

        setPendingRequests(pending);
        setAcceptedRooms(accepted);
      } catch (err) {
        console.error("채팅 목록 조회 실패:", err);
      }
    };

    fetchChats();
  }, [activeTab]);

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
