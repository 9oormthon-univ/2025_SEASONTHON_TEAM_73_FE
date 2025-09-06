import api from '@/shared/api/axios'; // axios instance
import { useAuthStore } from '@/shared/store';
import { DocumentTitle } from '@/widgets/user/verify/DocumentTitle';
import { FileSelector } from '@/widgets/user/verify/FileSelector';
import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export const DocumentUpload: React.FC = () => {
  const accessToken = useAuthStore.getState().accessToken;
  const handleFileSelect = async () => {
    try {
      // 1) 파일 선택
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // 모든 파일 허용 (필요 시 pdf, image 등으로 제한 가능)
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        console.log('파일 선택 취소됨');
        return;
      }

      const file = result.assets[0];
      console.log('선택된 파일:', file);

      // 2) FormData 생성
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name ?? 'upload.pdf',
        type: file.mimeType ?? 'application/octet-stream',
      } as any);

      // 3) 서버 업로드
      const res = await api.post('/certificate/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        Alert.alert('성공', '파일 업로드가 완료되었습니다.');
      } else {
        Alert.alert('실패', '업로드에 실패했습니다.');
      }
    } catch (err) {
      console.error('파일 업로드 에러:', err);
      Alert.alert('에러', '파일 업로드 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.fieldContainer}>
          <DocumentTitle
            title="재학증명서, 재직증명서"
            subtitle="인증이 완료되면 프로필에 인증마크가 추가돼요."
          />
          <FileSelector
            placeholder="파일을 선택하세요."
            onPress={handleFileSelect}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 614,
    flex: 1,
    overflow: 'hidden',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    fontWeight: '400',
    backgroundColor: '#FCFCFC',
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingRight: 18,
    paddingBottom: 16,
    paddingLeft: 18,
  },
  fieldContainer: {
    flex: 1,
  },
});

export default DocumentUpload;
