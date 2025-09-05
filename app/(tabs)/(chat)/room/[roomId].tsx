import { useAuthStore } from '@/shared/store';
import { ChatInput } from '@/widgets/chat/room/ChatInput';
import { ChatMessage } from '@/widgets/chat/room/ChatMessage';
import { DateSeparator } from '@/widgets/chat/room/DateSeparator';
import MessageRequestDialog from '@/widgets/chat/room/MessageRequestDialog';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

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
  const [refreshKey, setRefreshKey] = useState(0);

  const isPending = chatRoomStatus === 'PENDING';

  // 채팅 신청 수락
  const handleAccept = async () => {
    try {
      await axios.post(
        `https://livingmate.store/chatrooms/accept/${roomId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('✅ 채팅 신청 수락 완료');
      // 상태를 ACTIVE로 변경 후 새로고침
      router.replace(`/room/${roomId}?chatRoomStatus=ACTIVE&senderName=${senderName}`);
    } catch (err) {
      console.error('채팅 신청 수락 실패', err);
      Alert.alert('❌ 채팅 신청 수락 실패');
    }
  };

  // 채팅 신청 거절
  const handleReject = async () => {
    try {
      await axios.delete(
        `https://livingmate.store/chatrooms/reject/${roomId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('채팅 신청 거절 완료');
      router.back(); // 리스트 화면으로 돌아가기
    } catch (err) {
      console.error('채팅 신청 거절 실패', err);
      Alert.alert('❌ 채팅 신청 거절 실패');
    }
  };

  // 기존 메시지 가져오기 (ACTIVE 상태일 때만)
  useEffect(() => {
    if (!roomId || isPending) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `https://livingmate.store/chatrooms/${roomId}/messages`,
          {
            params: { page: 0, size: 50 },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const messages: Message[] = res.data.data.map((msg: any) => {
          const date = new Date(msg.createdAt);
          return {
            id: msg.messageId.toString(),
            text: msg.content,
            isOwn: msg.senderId.toString() === userId,
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
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

        setChatData(grouped);
      } catch (err) {
        console.error('메시지 가져오기 실패', err);
      }
    };

    fetchMessages();
  }, [roomId, token, userId, isPending]);

  // WebSocket 연결 (ACTIVE 상태일 때만)
  useEffect(() => {
    if (!roomId || isPending) return;

    const ws = new WebSocket(`wss://livingmate.store/ws-chat?token=${encodeURIComponent(token)}`);
    socketRef.current = ws;

    ws.onopen = () => console.log('✅ WebSocket connected');

    ws.onmessage = (event) => {
      const raw = event.data;
      let msg: any;
      try { msg = JSON.parse(raw); } catch { return; }
      if (!msg.messageId || !msg.content) return;

      const date = new Date(msg.createdAt);
      const message: Message = {
        id: msg.messageId.toString(),
        text: msg.content,
        isOwn: msg.senderId?.toString() === userId,
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
        senderName: msg.senderName,
      };

      setChatData((prev) => {
        const existingGroup = prev.find((group) => group.date === message.date);
        if (existingGroup) {
          return prev.map((group) =>
            group.date === message.date ? { ...group, messages: [...group.messages, message] } : group
          );
        } else {
          return [...prev, { date: message.date, messages: [message] }];
        }
      });
    };

    ws.onclose = () => console.log('❌ WebSocket closed');
    return () => ws.close();
  }, [roomId, token, userId, isPending]);

  const handleSendMessage = (text: string) => {
    if (socketRef.current && text.trim()) {
      const msg = { type: 'TEXT', websocket: 'SEND', content: text, chatRoomId: Number(roomId) };
      socketRef.current.send(JSON.stringify(msg));

      const now = new Date();
      const myMessage: Message = {
        id: Date.now().toString(),
        text,
        isOwn: true,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
      };

      setChatData((prev) => {
        const existingGroup = prev.find((group) => group.date === myMessage.date);
        if (existingGroup) {
          return prev.map((group) =>
            group.date === myMessage.date ? { ...group, messages: [...group.messages, myMessage] } : group
          );
        } else {
          return [...prev, { date: myMessage.date, messages: [myMessage] }];
        }
      });
    }
  };

  const handlePhotoPress = () => console.log('📷 Photo pressed');

  // 새 메시지 오면 자동 스크롤
  useEffect(() => {
    if (!isPending) scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatData, isPending]);

  if (isPending) {
    return (
      <View style={styles.containerPendig}>
        <MessageRequestDialog
          userName={senderName as string}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.messagesContent}>
          {chatData.map((dateGroup, dateIndex) => (
            <View key={dateIndex} style={styles.dateGroup}>
              <DateSeparator date={dateGroup.date} />
              <View style={styles.messagesGroup}>
                {dateGroup.messages.map((message) => (
                  <ChatMessage key={message.id} text={message.text} isOwn={message.isOwn} time={message.time} />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ChatInput onSendMessage={handleSendMessage} onPhotoPress={handlePhotoPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC' },
  messagesContainer: { flex: 1, marginTop: 36 },
  messagesContent: { paddingVertical: 20, gap: 20, alignSelf: 'stretch' },
  dateGroup: { flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1, alignSelf: 'stretch' },
  messagesGroup: { flexDirection: 'column', gap: 10, alignSelf: 'stretch' },
  containerPendig: { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', }
});

export default ChatScreen;
