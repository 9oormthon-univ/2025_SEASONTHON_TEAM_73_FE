import { COLORS } from "@/shared/styles";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  onPhotoPress?: () => void;
  selectedImage?: any;
  setSelectedImage?: (file: any) => void;
  handleUploadFile?: (file: any) => Promise<string | null>;
  isUploading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onPhotoPress,
  selectedImage,
  setSelectedImage,
  handleUploadFile,
  isUploading,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (isUploading) return;

    // 이미지 업로드
    if (selectedImage && handleUploadFile) {
      const fileUrl = await handleUploadFile(selectedImage);
      if (fileUrl && onSendMessage) onSendMessage(fileUrl);
      setSelectedImage && setSelectedImage(null);
    }

    // 텍스트 전송
    const text = message.trim();
    if (text.length > 0 && onSendMessage) {
      onSendMessage(text);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.preview}>
          <Image source={{ uri: selectedImage.uri }} style={{ width: 120, height: 120, borderRadius: 8 }} />
          <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectedImage && setSelectedImage(null)}
            >
              <Text style={styles.cancelText}>✕</Text>
            </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputRow}>
        <TouchableOpacity onPress={onPhotoPress}>
          <Svg width="41" height="41" viewBox="0 0 41 41" fill="none"> 
            <Rect x="0.5" y="0.5" width="40" height="40" rx="7.5" fill="#FCFCFC" /> 
            <Rect x="0.5" y="0.5" width="40" height="40" rx="7.5" stroke="#9D9D9F" /> 
            <Path d="M29.5 27.5V13.5C29.5 12.4 28.6 11.5 27.5 11.5H13.5C12.4 11.5 11.5 12.4 11.5 13.5V27.5C11.5 28.6 12.4 29.5 13.5 29.5H27.5C28.6 29.5 29.5 28.6 29.5 27.5ZM17 22L19.5 25.01L23 20.5L27.5 26.5H13.5L17 22Z" fill="#5B5B5E" /> 
          </Svg> 
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#9D9D9F"
          multiline={false}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />

        <TouchableOpacity onPress={handleSend} disabled={isUploading}>
          <Svg width="41" height="41" viewBox="0 0 41 41" fill="none">
            <Rect width="41" height="41" rx="8" fill="#6287F2" />
            <Path
              d="M18.6605 22.3398L29.6605 11.3398M18.6605 22.3398L22.1605 29.3398C22.2043 29.4356 22.2748 29.5167 22.3634 29.5736C22.4521 29.6305 22.5552 29.6607 22.6605 29.6607C22.7658 29.6607 22.8689 29.6305 22.9575 29.5736C23.0462 29.5167 23.1166 29.4356 23.1605 29.3398L29.6605 11.3398M18.6605 22.3398L11.6605 18.8398C11.5647 18.796 11.4836 18.7255 11.4267 18.6369C11.3698 18.5483 11.3396 18.4452 11.3396 18.3398C11.3396 18.2345 11.3698 18.1314 11.4267 18.0428C11.4836 17.9542 11.5647 17.8837 11.6605 17.8398L29.6605 11.3398"
              stroke="#FCFCFC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: "column", // 세로로 쌓기
    padding: 10, 
    gap: 10, 
    backgroundColor: COLORS.white,
  },
  preview: { 
    alignSelf: "center", // 가운데 정렬
  },
  inputRow: { // 입력창 + 버튼 가로 배치
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cancelButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: COLORS.gray[50],
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  textInput: { 
    flex: 1, 
    backgroundColor: "#F1F1F1", 
    borderRadius: 20, 
    paddingHorizontal: 15, 
    height: 40 
  },

});


