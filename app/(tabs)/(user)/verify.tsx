import { DocumentTitle } from '@/widgets/user/verify/DocumentTitle';
import { FileSelector } from '@/widgets/user/verify/FileSelector';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const DocumentUpload: React.FC = () => {
    
  const handleFileSelect = () => {
    console.log("click");
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
