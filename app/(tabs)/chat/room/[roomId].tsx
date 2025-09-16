import api from "@/shared/api/axios";
import { useAuthStore } from "@/shared/store";
import { COLORS } from "@/shared/styles";
import { ChatInput } from "@/widgets/chat/room/ChatInput";
import { ChatMessage } from "@/widgets/chat/room/ChatMessage";
import { DateSeparator } from "@/widgets/chat/room/DateSeparator";
import MessageRequestDialog from "@/widgets/chat/room/MessageRequestDialog";
import Constants, { NativeConstants } from "expo-constants";
import * as DocumentPicker from "expo-document-picker";
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
  date: string;
  senderName?: string;
  senderId?: string;
}

interface DateGroup {
  date: string;
  messages: Message[];
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>(null);

  const isPending = chatRoomStatus === "PENDING";

  // 채팅 신청 수락/거절
  const handleAccept = async () => {
    try {
      await api.post(`/chatrooms/accept/${roomId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      Alert.alert("✅ 채팅 신청 수락 완료");
      router.replace(`/chat/room/${roomId}?senderName=${senderName}`);
    } catch {
      Alert.alert("❌ 채팅 신청 수락 실패");
    }
  };

  const handleReject = async () => {
    try {
      await api.delete(`/chatrooms/reject/${roomId}`, { headers: { Authorization: `Bearer ${token}` } });
      Alert.alert("채팅 신청 거절 완료");
      router.push(`/`);
    } catch {
      Alert.alert("❌ 채팅 신청 거절 실패");
    }
  };

  // 메시지 불러오기
  const fetchMessages = async () => {
    if (!roomId) return;
    try {
      const res = await api.get(`/chatrooms/${roomId}/messages`, {
        params: { page: 0, size: 2000000000 },
        headers: { Authorization: `Bearer ${token}` },
      });
      const messages: Message[] = res.data.data.map((msg: any) => mapMessage(msg, userId));
      setChatData(prev => mergeMessages(prev, messages));
    } catch (err) {
      console.error("메시지 가져오기 실패", err);
    }
  };

  useEffect(() => { fetchMessages(); }, [roomId]);

  // WebSocket 이벤트 기반 처리
  useEffect(() => {
    if (!roomId || isPending) return;

    const ws = new WebSocket(`${WS_BASE_URL}/ws-chat?token=${encodeURIComponent(token)}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      ws.send(JSON.stringify({ websocket: "JOIN", chatRoomId: Number(roomId) }));
    };

    ws.onmessage = (event) => {
      let msg: any;
      try { msg = JSON.parse(event.data); } catch { return; }

      switch (msg.event) {
        case "connect":
          console.log("✅ WebSocket 연결 완료");
          break;
        case "joined":
          console.log(`✅ 방 참여 완료: ${msg.roomId}`);
          break;
        case "send": // 본인 메시지
        case "receive": // 다른 사람 메시지
          if (msg.messageId && msg.content) {
            const message = mapMessage({
              messageId: msg.messageId,
              content: msg.content,
              senderId: msg.sender ?? msg.senderId,
              senderName: msg.senderName,
              createdAt: msg.createdAt ?? new Date().toISOString(),
            }, userId);
            setChatData(prev => mergeMessages(prev, [message]));
          }
          break;
        case "read":
          console.log(`👀 메시지 읽음 처리: readerId=${msg.readerId}`);
          // 읽음 상태 UI 업데이트 가능
          break;
        case "error":
          console.error("❌ 서버 에러:", msg.message);
          Alert.alert("에러", msg.message);
          break;
        default:
          console.warn("⚠️ 알 수 없는 이벤트:", msg);
      }
    };

    ws.onerror = (error) => console.error("WebSocket 오류 발생:", error);
    ws.onclose = (event) => console.log(`❌ WebSocket closed (code=${event.code})`);

    return () => ws.close();
  }, [roomId, token, userId, isPending]);

  const handleSendMessage = (text: string) => {
    if (socketRef.current && text.trim()) {
      socketRef.current.send(JSON.stringify({
        type: "TEXT",
        websocket: "SEND",
        content: text,
        chatRoomId: Number(roomId),
      }));

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

  const handlePhotoPress = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: ["application/pdf", "image/*"], copyToCacheDirectory: true });
      if (!result.canceled && result.assets && result.assets.length > 0) setUploadedFile(result.assets[0]);
    } catch { Alert.alert("오류", "파일 업로드 중 오류가 발생했습니다."); }
    finally { setIsUploading(false); }
  };

  // 자동 스크롤
  useEffect(() => {
    if (chatData.length > 0 && !isPending) setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  }, [chatData, isPending]);

  useEffect(() => {
    const listener = Keyboard.addListener("keyboardDidShow", () => setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100));
    return () => listener.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={80}>
        <ScrollView ref={scrollViewRef} style={styles.messagesContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.messagesContent}>
            {chatData.map((dateGroup, dateIndex) => (
              <View key={dateIndex} style={styles.dateGroup}>
                <DateSeparator date={dateGroup.date} />
                <View style={styles.messagesGroup}>
                  {dateGroup.messages.map(message => (
                    <ChatMessage key={message.id} text={message.text} isOwn={message.isOwn} time={message.time} senderId={message.senderId} />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {isPending && <View style={styles.containerPendig}><MessageRequestDialog userName={senderName as string} onAccept={handleAccept} onReject={handleReject} /></View>}
        {!isPending && <ChatInput onSendMessage={handleSendMessage} onPhotoPress={handlePhotoPress} />}
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
