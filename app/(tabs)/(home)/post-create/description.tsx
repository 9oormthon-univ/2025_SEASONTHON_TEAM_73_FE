import { Button } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { DESCRIPTION_DEFAULT_VALUES } from "@/widgets/post-create/constants";
import { usePostCreate } from "@/widgets/post-create/contexts";
import type { DescriptionFormData } from "@/widgets/post-create/types/post";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useSubmitPost } from "../../../../widgets/post-create/api";

export default function DescriptionScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { roomInfo, cost, setDescription, getCombinedData, clearAll } =
    usePostCreate();

  const { handleSubmit, setValue, watch } = useForm<DescriptionFormData>({
    defaultValues: DESCRIPTION_DEFAULT_VALUES,
  });

  const { content } = watch();

  const { mutate: submitPost } = useSubmitPost();

  const onSubmit = async (data: DescriptionFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // 모든 데이터가 있는지 확인
    if (!roomInfo || !cost) {
      Alert.alert("오류", "필수 정보가 누락되었습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    // Context에 description 데이터 저장
    setDescription(data);

    // Context에서 결합된 데이터 가져오기 (현재 폼 데이터 전달)
    const combinedData = getCombinedData(data);
    if (!combinedData) {
      Alert.alert("오류", "데이터 처리 중 오류가 발생했습니다.");
      setIsSubmitting(false);
      return;
    }

    const { images, ...dataWithoutImages } = combinedData;

    // 이미지 정보 로깅
    console.log("images:", images);
    console.log("images length:", images?.length || 0);

    // undefined, NaN, null 값 정리
    const cleanedData = Object.fromEntries(
      Object.entries(dataWithoutImages).map(([key, value]) => {
        if (value === undefined || value === null || Number.isNaN(value)) {
          return [
            key,
            value === null ? null : typeof value === "number" ? 0 : "",
          ];
        }
        return [key, value];
      })
    );

    // JSON 직렬화 전 데이터 확인
    console.log("dataWithoutImages:", dataWithoutImages);
    console.log("cleanedData:", cleanedData);

    let jsonString: string;
    try {
      jsonString = JSON.stringify(cleanedData);
      console.log("JSON string:", jsonString);
      console.log("JSON string length:", jsonString.length);
    } catch (error) {
      console.error("JSON.stringify 오류:", error);
      Alert.alert("오류", "데이터 직렬화 중 오류가 발생했습니다.");
      setIsSubmitting(false);
      return;
    }

    // 이미지 URL들을 cleanedData에 포함
    const finalData = {
      ...cleanedData,
      images: images || [],
    };

    console.log("최종 전송 데이터:", finalData);

    submitPost(finalData, {
      onSuccess: () => {
        clearAll(); // 성공 시 Context 데이터 초기화
        Alert.alert("성공", "게시글이 성공적으로 등록되었습니다.", [
          { text: "확인", onPress: () => router.navigate("/") },
        ]);
      },
      onError: (error) => {
        Alert.alert("오류", "게시글 등록에 실패했습니다. 다시 시도해주세요.");
      },
    });

    setIsSubmitting(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={containerStyle.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <PostCreateProgressBar
          totalScreens={3}
          currentIndex={2}
          title="부가 설명"
        />
        <View style={{ gap: 20, paddingBottom: 20 }}>
          <PostCreateField.TextArea
            title="간단한 설명"
            placeholder="작성하지 못한 이야기를 자유롭게 작성해주세요!
취미, 희망 진로, 동거 규칙에 대해 작성해주시면 좋아요."
            value={content}
            setValue={(value) => setValue("content", value)}
          />
        </View>
      </ScrollView>
      <View
        style={{
          padding: SPACING.normal,
          backgroundColor: "white",
        }}
      >
        <Button
          size="lg"
          text={isSubmitting ? "등록 중..." : "등록하기"}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
