import api from "@/shared/api/axios";
import { useAuthStore } from "@/shared/store";
import { COLORS } from "@/shared/styles";
import { ChatInput } from "@/widgets/chat/room/ChatInput";
import { ChatMessage } from "@/widgets/chat/room/ChatMessage";
import { DateSeparator } from "@/widgets/chat/room/DateSeparator";
import MessageRequestDialog from "@/widgets/chat/room/MessageRequestDialog";
import Constants, { NativeConstants } from "expo-constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface Message {
  id: string;
  text: string;
  isOwn: boolean;
  time: string;
  date: string;
  senderName?: string;
}

interface DateGroup {
  date: string;
  messages: Message[];
}

const ChatScreen: React.FC = () => {
  const { roomId, chatRoomStatus, senderName } = useLocalSearchParams();
  const [chatData, setChatData] = useState<DateGroup[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const token = useAuthStore.getState().accessToken;
  const userId = useAuthStore.getState().userId;
  const config = Constants as NativeConstants;
  const { WS_BASE_URL } = config.expoConfig!.extra!;

  const isPending = chatRoomStatus === "PENDING";

  // 채팅 신청 수락
  const handleAccept = async () => {
    try {
      await api.post(
        `/chatrooms/accept/${roomId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("✅ 채팅 신청 수락 완료");
      router.replace({
            pathname: `/room/${roomId}` as any,
            params: { senderName: senderName },
          });
    } catch (err) {
      console.error("채팅 신청 수락 실패", err);
      Alert.alert("❌ 채팅 신청 수락 실패");
    }
  };

  // 채팅 신청 거절
  const handleReject = async () => {
    try {
      await api.delete(
        `/chatrooms/reject/${roomId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("채팅 신청 거절 완료");
      router.push(`/`); // 홈 화면으로 돌아가기
    } catch (err) {
      console.error("채팅 신청 거절 실패", err);
      Alert.alert("❌ 채팅 신청 거절 실패");
    }
  };

  // 기존 메시지 가져오기 (ACTIVE 상태일 때만)
  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(
          `/chatrooms/${roomId}/messages`,
          {
            params: { page: 0, size: 50 },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("📨 기존 메시지 API 응답:", res.data);
        console.log("📨 받은 메시지 개수:", res.data.data?.length || 0);

        const messages: Message[] = res.data.data.map((msg: any) => {
          const date = new Date(msg.createdAt);
          return {
            id: msg.messageId.toString(),
            text: msg.content,
            isOwn: msg.senderId.toString() === userId,
            time: date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            date: date.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            senderName: msg.senderName,
          };
        });

        const grouped: DateGroup[] = [];
        messages.forEach((message) => {
          const existingGroup = grouped.find((g) => g.date === message.date);
          if (existingGroup) {
            existingGroup.messages.push(message);
          } else {
            grouped.push({ date: message.date, messages: [message] });
          }
        });

        console.log("📨 처리된 메시지 데이터:", messages);
        console.log("📨 날짜별 그룹화된 데이터:", grouped);

        setChatData(grouped);
      } catch (err) {
        console.error("메시지 가져오기 실패", err);
      }
    };

    fetchMessages();
  }, [roomId, token, userId]);

  // WebSocket 연결 (ACTIVE 상태일 때만)
  useEffect(() => {
    if (!roomId || isPending) return;

    const ws = new WebSocket(
      `${WS_BASE_URL}?token=${encodeURIComponent(token)}`
    );
    socketRef.current = ws;

    ws.onopen = () => console.log("✅ WebSocket connected");

    ws.onmessage = (event) => {
      const raw = event.data;
      let msg: any;
      try {
        msg = JSON.parse(raw);
      } catch {
        return;
      }
      if (!msg.messageId || !msg.content) return;

      const date = new Date(msg.createdAt);
      const message: Message = {
        id: msg.messageId.toString(),
        text: msg.content,
        isOwn: msg.senderId?.toString() === userId,
        time: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: date.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        senderName: msg.senderName,
      };

      setChatData((prev) => {
        const existingGroup = prev.find((group) => group.date === message.date);
        if (existingGroup) {
          return prev.map((group) =>
            group.date === message.date
              ? { ...group, messages: [...group.messages, message] }
              : group
          );
        } else {
          return [...prev, { date: message.date, messages: [message] }];
        }
      });
    };

    ws.onclose = () => console.log("❌ WebSocket closed");
    return () => ws.close();
  }, [roomId, token, userId, isPending]);

  const handleSendMessage = (text: string) => {
    if (socketRef.current && text.trim()) {
      const msg = {
        type: "TEXT",
        websocket: "SEND",
        content: text,
        chatRoomId: Number(roomId),
      };
      socketRef.current.send(JSON.stringify(msg));

      const now = new Date();
      const myMessage: Message = {
        id: Date.now().toString(),
        text,
        isOwn: true,
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: now.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      setChatData((prev) => {
        const existingGroup = prev.find(
          (group) => group.date === myMessage.date
        );
        if (existingGroup) {
          return prev.map((group) =>
            group.date === myMessage.date
              ? { ...group, messages: [...group.messages, myMessage] }
              : group
          );
        } else {
          return [...prev, { date: myMessage.date, messages: [myMessage] }];
        }
      });
    }
  };

  const handlePhotoPress = () => console.log("📷 Photo pressed");

  // 새 메시지 오면 자동 스크롤
  useEffect(() => {
    if (!isPending) scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatData, isPending]);

  // 키보드 이벤트 처리
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.messagesContent}>
          {chatData.map((dateGroup, dateIndex) => (
            <View key={dateIndex} style={styles.dateGroup}>
              <DateSeparator date={dateGroup.date} />
              <View style={styles.messagesGroup}>
                {dateGroup.messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    text={message.text}
                    isOwn={message.isOwn}
                    time={message.time}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {isPending && (
        <View style={styles.containerPendig}>
          <MessageRequestDialog
            userName={senderName as string}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </View>
      )}

      {!isPending && (
        <ChatInput
          onSendMessage={handleSendMessage}
          onPhotoPress={handlePhotoPress}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  messagesContainer: { flex: 1 },
  messagesContent: { paddingVertical: 20, gap: 20, alignSelf: "stretch" },
  dateGroup: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    flex: 1,
    alignSelf: "stretch",
  },
  messagesGroup: { flexDirection: "column", gap: 10, alignSelf: "stretch" },
  containerPendig: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default ChatScreen;
