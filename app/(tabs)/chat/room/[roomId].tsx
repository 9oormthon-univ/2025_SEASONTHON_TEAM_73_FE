// ChatScreen.tsx
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
  View
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
  senderProfile?: string;
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
    senderProfile: msg.senderProfile,
  };
};

const mergeMessages = (prev: DateGroup[], newMessages: Message[]): DateGroup[] => {
  const all = [...prev.flatMap(g => g.messages)];

  newMessages.forEach(m => {
    const exists = all.some(x => x.senderId === m.senderId && x.text === m.text && x.time === m.time);
    if (!exists) all.push(m);
  });

  const grouped: DateGroup[] = [];
  all.forEach(message => {
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
  const [selectedImage, setSelectedImage] = useState<any>(null); // 미리보기 이미지
  const [roomInfo, setRoomInfo] = useState<{
    receiverId: number;
    receiverName: string;
    receiverProfile: string;
    senderId: number;
    senderName: string;
    senderProfile: string;
  } | null>(null);

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

      if (res.data.roomInfo) {
        setRoomInfo({
          receiverId: res.data.roomInfo.receiverId,
          receiverName: res.data.roomInfo.receiverName,
          receiverProfile: res.data.roomInfo.receiverProfile,
          senderId: res.data.roomInfo.senderId,
          senderName: res.data.roomInfo.senderName,
          senderProfile: res.data.roomInfo.senderProfile,
        });
      }

      const messages: Message[] = res.data.data.map((msg: any) =>
        mapMessage(msg, userId)
      );
      setChatData(prev => mergeMessages(prev, messages));
    } catch (err) {
      console.error("메시지 가져오기 실패", err);
    }
  };

  useEffect(() => { fetchMessages(); }, [roomId]);

  // WebSocket
  useEffect(() => {
    if (!roomId || isPending) return;

    const ws = new WebSocket(`${WS_BASE_URL}/ws-chat?token=${encodeURIComponent(token)}`);
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ websocket: "JOIN", chatRoomId: Number(roomId) }));
    };

    ws.onmessage = (event) => {
      let msg: any;
      try { msg = JSON.parse(event.data); } catch { return; }

      if ((msg.event === "send" || msg.event === "receive") && msg.messageId && msg.content) {
        if (msg.senderId?.toString() === userId) return;
        const message = mapMessage({
          messageId: msg.messageId,
          content: msg.content,
          senderId: msg.sender ?? msg.senderId,
          senderName: msg.senderName,
          senderProfile: msg.senderProfile,
          createdAt: msg.createdAt ?? new Date().toISOString(),
        }, userId);
        setChatData(prev => mergeMessages(prev, [message]));
      }
    };

    ws.onerror = console.error;
    ws.onclose = (event) => console.log(`WebSocket closed (code=${event.code})`);
    return () => ws.close();
  }, [roomId, token, userId, isPending]);

  // 메시지 보내기
  const handleSendMessage = async (textOrUrl: string) => {
    if (!socketRef.current || !textOrUrl) return;

    const isImage = selectedImage && textOrUrl === selectedImage.uri;

    if (isImage) {
      const fileUrl = await handleUploadFile(selectedImage);
      if (!fileUrl) return;
      textOrUrl = fileUrl;
      setSelectedImage(null);
    }

    socketRef.current.send(JSON.stringify({
      type: "TEXT",
      websocket: "SEND",
      content: textOrUrl,
      chatRoomId: Number(roomId),
    }));

    const now = new Date();
    const myMessage: Message = {
      id: Date.now().toString(),
      text: textOrUrl,
      isOwn: true,
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: formatDate(now),
      senderId: userId,
    };
    setChatData(prev => mergeMessages(prev, [myMessage]));
  };

  // 파일 업로드
  const handleUploadFile = async (file: any) => {
    if (!file) return null;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", { uri: file.uri, name: file.name, type: file.mimeType || "image/jpeg" } as any);

      const res = await api.post(`/s3/upload/chat?chatRoomId=${roomId}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      return res.data?.data?.fileUrl || null;
    } catch (err) {
      console.error(err);
      Alert.alert("오류", "파일 업로드에 실패했습니다.");
      return null;
    } finally { setIsUploading(false); }
  };

  // 이미지 선택
  const handlePhotoPress = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: ["image/*"], copyToCacheDirectory: true });
      if (!result.canceled && result.assets && result.assets.length > 0) setSelectedImage(result.assets[0]);
    } catch (err) { console.error(err); }
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
                    <ChatMessage
                      key={message.id}
                      text={message.text}
                      time={message.time}
                      isOwn={message.isOwn}
                      senderId={Number(message.senderId)}
                      senderName={message.senderName ?? ""}
                      senderProfile={message.senderProfile ?? ""}
                      receiverId={roomInfo?.receiverId ?? 0}
                      receiverName={roomInfo?.receiverName ?? ""}
                      receiverProfile={roomInfo?.receiverProfile ?? ""}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {isPending && (
          <View style={styles.containerPendig}>
            <MessageRequestDialog userName={senderName as string} onAccept={handleAccept} onReject={handleReject} />
          </View>
        )}

        {!isPending && (
          <ChatInput
            onSendMessage={handleSendMessage}
            onPhotoPress={handlePhotoPress}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleUploadFile={handleUploadFile}
            isUploading={isUploading}
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
