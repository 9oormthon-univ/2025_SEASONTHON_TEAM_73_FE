import { useAuthStore } from "@/shared/store";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
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
  const otherProfile = myUserId === senderId ? receiverProfile : senderProfile;
  const otherId = myUserId === senderId ? receiverId : senderId;

  const [modalVisible, setModalVisible] = useState(false);

  const handleProfilePress = () => {
    if (!otherId) return;
    router.push(`/chat/room/user-detail?userId=${otherId}`);
  };

  // 이미지인지 판별
  const isImage = text.startsWith("https://") && text.match(/\.(jpeg|jpg|png|gif)$/);

  const handleImagePress = () => {
    if (isImage) setModalVisible(true);
  };

  return (
    <View style={[styles.container, isOwn ? styles.ownContainer : styles.otherContainer]}>
      {/* 상대방 아바타 */}
      {!isOwn && (
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={otherProfile ? { uri: otherProfile } : require("@/assets/icons/friendIcon.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
      )}

      {/* 메시지 또는 이미지 */}
      {isImage ? (
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: text }} style={styles.chatImage} resizeMode="cover" />
        </TouchableOpacity>
      ) : (
        <MessageBubble text={text} isOwn={isOwn} time={time} />
      )}

      {/* 이미지 확대 모달 */}
      {isImage && (
        <Modal visible={modalVisible} transparent animationType="fade">
          <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
            <Image source={{ uri: text }} style={styles.modalImage} resizeMode="contain" />
          </TouchableOpacity>
        </Modal>
      )}
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
  chatImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginVertical: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "70%",
  },
});
