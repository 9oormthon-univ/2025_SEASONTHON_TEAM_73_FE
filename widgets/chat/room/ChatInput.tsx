import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  onPhotoPress?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onPhotoPress }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const text = message.trim();
    console.log("보낼 메시지:", JSON.stringify(text));
    if (text.length > 0 && onSendMessage) {
      onSendMessage(text.normalize());
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      {/* 입력창 */}
      <View style={styles.inputField}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="채팅을 시작해보세요!"
          placeholderTextColor="#9D9D9F"
          multiline={false}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
      </View>

      {/* 버튼 */}
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 입력창과 버튼을 나란히 배치
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  inputField: {
    flex: 1, // 입력창이 남는 공간 차지
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9D9D9F',
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8, // 버튼과 간격
  },
  textInput: {
    fontSize: 14,
    color: '#17171B',
    padding: 0,
    height: 24,
  },
  sendButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
