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
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  isOwn: boolean;
  time: string;
  date: string; // YYYY-MM-DD
  senderName?: string;
  senderId?: string;
}

interface DateGroup {
  date: string;
  messages: Message[];
}

// 날짜 포맷 고정
const formatDate = (date: Date) => date.toISOString().split("T")[0];

// 메시지 변환
const mapMessage = (msg: any, userId: string): Message => {
  const date = new Date(msg.createdAt);
  return {
    id: msg.messageId.toString(),
    text: msg.content,
    isOwn: msg.senderId?.toString() === userId,
    time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    date: formatDate(date),
    senderName: msg.senderName,
    senderId: msg.senderId?.toString(),
  };
};

// 메시지 합치기 + 중복 제거 + 날짜 그룹
const mergeMessages = (prev: DateGroup[], newMessages: Message[]): DateGroup[] => {
  const all = [...prev.flatMap(g => g.messages), ...newMessages];

  const unique = Array.from(new Map(all.map(m => [m.id, m])).values());

  const grouped: DateGroup[] = [];
  unique.forEach(message => {
    const g = grouped.find(x => x.date === message.date);
    if (g) g.messages.push(message);
    else grouped.push({ date: message.date, messages: [message] });
  });

  grouped.sort((a, b) => (a.date > b.date ? 1 : -1));
  grouped.forEach(g =>
    g.messages.sort((a, b) => {
      const aTime = new Date(`${a.date}T${a.time}`);
      const bTime = new Date(`${b.date}T${b.time}`);
      return aTime.getTime() - bTime.getTime();
    })
  );

  return grouped;
};

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
      router.replace(`/chat/room/${roomId}?senderName=${senderName}`);
    } catch (err) {
      console.error("채팅 신청 수락 실패", err);
      Alert.alert("❌ 채팅 신청 수락 실패");
    }
  };

  // 채팅 신청 거절
  const handleReject = async () => {
    try {
      await api.delete(`/chatrooms/reject/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("채팅 신청 거절 완료");
      router.push(`/`);
    } catch (err) {
      console.error("채팅 신청 거절 실패", err);
      Alert.alert("❌ 채팅 신청 거절 실패");
    }
  };

  // 서버에서 메시지 가져오기 (채팅방 입장 시)
  const fetchMessages = async () => {
    if (!roomId) return;
    try {
      const res = await api.get(`/chatrooms/${roomId}/messages`, {
        params: { page: 0, size: 2000000000 },
        headers: { Authorization: `Bearer ${token}` },
      });

      const messages: Message[] = res.data.data.map((msg: any) =>
        mapMessage(msg, userId)
      );

      // 기존 상태와 merge
      setChatData(prev => mergeMessages(prev, messages));
    } catch (err) {
      console.error("메시지 가져오기 실패", err);
    }
  };

  // 컴포넌트 마운트 시 + roomId 변경 시 메시지 fetch
  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  // WebSocket 연결
  useEffect(() => {
    if (!roomId || isPending) return;

    const ws = new WebSocket(
      `wss://livingmate.store/ws-chat?token=${encodeURIComponent(token)}`
    );
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      ws.send(JSON.stringify({
        websocket: "JOIN",
        chatRoomId: Number(roomId)
      }));
    };

    ws.onmessage = (event) => {
      let msg: any;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }

      // 모든 메시지 처리
      if (msg.messageId && msg.content) {
        const message = mapMessage({
          messageId: msg.messageId,
          content: msg.content,
          senderId: msg.sender ?? msg.senderId,
          createdAt: msg.createdAt ?? new Date().toISOString()
        }, userId);

        setChatData(prev => mergeMessages(prev, [message]));
      }
    };

    ws.onclose = () => console.log("❌ WebSocket closed");

    return () => ws.close();
  }, [roomId, token, userId, isPending]);

  // 메시지 전송
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
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: formatDate(now),
        senderId: userId,
      };

      setChatData(prev => mergeMessages(prev, [myMessage]));
    }
  };

  const handlePhotoPress = () => console.log("📷 Photo pressed");

  // 자동 스크롤
  useEffect(() => {
    if (chatData.length > 0 && !isPending) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chatData, isPending]);

  useEffect(() => {
    const listener = Keyboard.addListener("keyboardDidShow", () => {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    });
    return () => listener.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
                      senderId={message.senderId}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  messagesContainer: { flex: 1 },
  messagesContent: { paddingVertical: 20, gap: 20, alignSelf: "stretch" },
  dateGroup: { flexDirection: "column", alignItems: "center", gap: 10, flex: 1, alignSelf: "stretch" },
  messagesGroup: { flexDirection: "column", gap: 10, alignSelf: "stretch" },
  containerPendig: { position: "absolute", bottom: 0, left: 0, right: 0, alignItems: "center" },
});

export default ChatScreen;
