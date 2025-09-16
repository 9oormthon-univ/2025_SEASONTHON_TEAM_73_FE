import { COLORS, FONT_SIZE } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  multiline?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ label, value, onChangeText, multiline = false }) => {
  return (
    <View style={[styles.container, multiline && styles.multilineContainer]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        placeholder={multiline ? '자기소개를 입력하세요' : ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row', // 왼쪽 label, 오른쪽 입력창
    alignItems: 'center',
  },
  multilineContainer: {
    height: 120,
    alignItems: 'flex-start', // 멀티라인일 때 상단 정렬
  },
  label: {
    fontSize: FONT_SIZE.b2,
    fontWeight: '700',
    color: COLORS.black,
    marginRight: 12, // label과 입력창 사이 간격
    width: 80, // label 고정 너비
  },
  input: {
    flex: 1, // 남은 공간 모두 차지
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: COLORS.white,
    fontSize: FONT_SIZE.b2,
    color: COLORS.black,
  },
  multilineInput: {
    height: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: 'top',
  },
});
