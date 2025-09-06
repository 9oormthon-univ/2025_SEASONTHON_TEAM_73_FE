import { Button } from "@/shared/components";
import { SPACING } from "@/shared/styles";
import { DocumentTitle } from "@/widgets/user/verify/DocumentTitle";
import { FileSelector } from "@/widgets/user/verify/FileSelector";
import submitUser from "@/widgets/user/verify/submitUser";
// @ts-ignore
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export const DocumentUpload: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<any>(null);

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFileName(file.name);
        setUploadedFile(file);

        Alert.alert(
          "파일 선택 완료",
          "파일이 선택되었습니다. 제출 버튼을 눌러 요청을 보내세요."
        );
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      Alert.alert("오류", "파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      Alert.alert("오류", "먼저 파일을 선택해주세요.");
      return;
    }

    try {
      setIsUploading(true);
      console.log("제출 버튼 클릭됨");

      // FormData 생성
      const formData = new FormData();
      formData.append("file", {
        uri: uploadedFile.uri,
        name: uploadedFile.name,
        type: uploadedFile.mimeType || "application/octet-stream",
      } as any);

      console.log("FormData 생성 완료");

      // API 호출
      await submitUser(formData);

      Alert.alert("성공", "서류가 성공적으로 제출되었습니다.");

      // 상태 초기화
      setSelectedFileName(null);
      setUploadedFile(null);
    } catch (error) {
      console.error("제출 오류:", error);
      Alert.alert("실패", "서류 제출 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
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
            placeholder={
              isUploading
                ? "처리 중..."
                : selectedFileName
                ? selectedFileName
                : "파일을 선택하세요."
            }
            onPress={isUploading ? undefined : handleFileSelect}
          />

          {uploadedFile && (
            <View style={styles.buttonContainer}>
              <Button
                size="lg"
                text={isUploading ? "제출 중..." : "서류 제출"}
                onPress={handleSubmit}
                disabled={isUploading}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 614,
    flex: 1,
    overflow: "hidden",
    fontFamily: "SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif",
    fontWeight: "400",
    backgroundColor: "#FCFCFC",
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
  buttonContainer: {
    marginTop: SPACING.lg,
  },
});

export default DocumentUpload;
