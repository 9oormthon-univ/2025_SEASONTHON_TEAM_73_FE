import { COLORS, FONTS } from "@/shared/styles";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ButtonGroup } from "./ButtonGroup";
import { MessageText } from "./MessageText";

interface MessageRequestDialogProps {
  userName?: string;
  onReject?: () => void;
  onAccept?: () => void;
}

export const MessageRequestDialog: React.FC<MessageRequestDialogProps> = ({
  userName = "현용",
  onReject,
  onAccept,
}) => {
  const message = `${userName} 님의 메시지 요청을 수락하시겠어요?`;

  return (
    <View style={styles.container}>
      <MessageText message={message} />
      <ButtonGroup onReject={onReject} onAccept={onAccept} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: FONTS.regular,
    backgroundColor: COLORS.white,
    paddingTop: 12,
    paddingRight: 18,
    paddingBottom: 12,
    paddingLeft: 18,
  },
});

export default MessageRequestDialog;
