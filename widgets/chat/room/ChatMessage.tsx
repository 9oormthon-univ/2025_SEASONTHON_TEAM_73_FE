import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MessageBubble } from "./MessageBubble";

interface ChatMessageProps {
  text: string;
  isOwn: boolean;
  time: string;
  senderId?: string;
  senderName?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  isOwn,
  time,
  senderId,
  senderName,
}) => {
  const handleProfilePress = () => {
    if (!senderId) return;
        router.push(`/(tabs)/(home)/userDetail/${senderId}`);

  };

  return (
    <View
      style={[
        styles.container,
        isOwn ? styles.ownContainer : styles.otherContainer,
      ]}
    >
      {!isOwn && (
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={require("@/assets/icons/friendIcon.png")}
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
    justifyContent: "flex-end", // 오른쪽 정렬
  },
  otherContainer: {
    justifyContent: "flex-start", // 왼쪽 정렬
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
});
