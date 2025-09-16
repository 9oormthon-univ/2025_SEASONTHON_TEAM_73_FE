import { useAuthStore } from "@/shared/store";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MessageBubble } from "./MessageBubble";

interface ChatMessageProps {
  text: string;
  time: string;
  isOwn: boolean;
  senderId: number;
  senderName: string;
  senderProfile: string;
  receiverId: number;
  receiverName: string;
  receiverProfile: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  time,
  isOwn,
  senderId,
  senderName,
  senderProfile,
  receiverId,
  receiverName,
  receiverProfile,
}) => {
  const myUserId = Number(useAuthStore().userId);

  // ✅ 항상 "상대방" 프로필만 보여주기
  const otherProfile = myUserId === senderId ? receiverProfile : senderProfile;
  const otherId = myUserId === senderId ? receiverId : senderId;

  const handleProfilePress = () => {
    if (!otherId) return;
    router.push(`/chat/room/user-detail?userId=${otherId}`);
  };

  return (
    <View
      style={[
        styles.container,
        isOwn ? styles.ownContainer : styles.otherContainer,
      ]}
    >
      {/* 내가 보낸 메시지일 때는 아바타 안 보이고, 
          상대방 메시지일 때는 상대방 프로필만 보이게 */}
      {!isOwn && (
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={
              otherProfile
                ? { uri: otherProfile }
                : require("@/assets/icons/friendIcon.png")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
      )}
      <MessageBubble text={text} isOwn={isOwn} time={time} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  ownContainer: {
    justifyContent: "flex-end",
  },
  otherContainer: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
});
