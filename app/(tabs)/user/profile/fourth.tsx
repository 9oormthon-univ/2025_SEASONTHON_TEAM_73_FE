import { Button } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileFinalFormData {
  disease: string;
  introduce: string;
}

const DEFAULT_VALUES: ProfileFinalFormData = {
  disease: "",
  introduce: "",
};

export default function ProfileFinalScreen() {
  const { basicInfo, sleepInfo, habitsInfo } = useLocalSearchParams();
  const [formData, setFormData] =
    useState<ProfileFinalFormData>(DEFAULT_VALUES);

  const isFormValid = formData.introduce.trim() !== "";

  const handleSubmit = async () => {
    try {
      // 모든 폼 데이터를 수집
      const basic = JSON.parse(basicInfo as string);
      const sleep = JSON.parse(sleepInfo as string);
      const habits = JSON.parse(habitsInfo as string);

      const completeProfileData = {
        ...basic,
        ...sleep,
        ...habits,
        ...formData,
      };

      console.log("Complete Profile Data:", completeProfileData);

      // 여기서 API 호출로 프로필 데이터를 서버에 저장
      // await submitProfile(completeProfileData);

      Alert.alert("프로필 설정 완료", "프로필이 성공적으로 저장되었습니다.", [
        {
          text: "확인",
          onPress: () => {
            // 프로필 설정 완료 후 메인 화면으로 이동
            router.replace("/user");
          },
        },
      ]);
    } catch (error) {
      console.error("Profile save error:", error);
      Alert.alert("오류", "프로필 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          style={containerStyle.wrapper}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <PostCreateProgressBar
            totalScreens={4}
            currentIndex={3}
            title="추가 정보"
          />
          <View style={{ gap: 20, paddingBottom: 20 }}>
            <PostCreateField.TextArea
              title="질병 및 건강 상태"
              description="알러지나 특별한 건강 상태가 있다면 작성해주세요 (선택사항)"
              value={formData.disease}
              setValue={(value) =>
                setFormData((prev) => ({ ...prev, disease: value }))
              }
              placeholder="없음 또는 구체적인 내용을 작성해주세요"
              multiline
              numberOfLines={3}
            />

            <PostCreateField.TextArea
              title="자기소개"
              description="자신을 소개하고 어떤 룸메이트를 찾고 있는지 작성해주세요"
              required
              value={formData.introduce}
              setValue={(value) =>
                setFormData((prev) => ({ ...prev, introduce: value }))
              }
              placeholder="안녕하세요! 저는 깔끔하고 배려심 많은 룸메이트를 찾고 있습니다. 함께 즐겁게 생활할 수 있는 분을 만나고 싶어요..."
              multiline
              numberOfLines={8}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          padding: SPACING.normal,
        }}
      >
        <Button
          size="lg"
          text="프로필 완성"
          onPress={handleSubmit}
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
}
