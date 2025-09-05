import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MessageBubble } from './MessageBubble';

interface ChatMessageProps {
  text: string;
  isOwn: boolean;
  time: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ text, isOwn, time }) => {
  return (
    <View style={styles.container}>
      <MessageBubble text={text} isOwn={isOwn} time={time} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },
});
