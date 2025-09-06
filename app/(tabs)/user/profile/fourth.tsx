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

  const handleSubmit = async () => {
    try {
      // 모든 폼 데이터를 수집
      const basic = JSON.parse(basicInfo as string);
      const sleep = JSON.parse(sleepInfo as string);
      const habits = JSON.parse(habitsInfo as string);

      // pet 배열을 쉼표로 구분된 문자열로 변환
      const petString =
        sleep.pet && sleep.pet.length > 0 ? sleep.pet.join(", ") : "";

      const completeProfileData = {
        ...basic,
        ...sleep,
        ...habits,
        ...formData,
        pet: petString ? [petString] : [], // JSON 형태에 맞게 조정
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
              title="소개글"
              value={formData.introduce}
              setValue={(value) =>
                setFormData((prev) => ({ ...prev, introduce: value }))
              }
              placeholder="카테고리에서 선택하지 못한 특이사항 또는 취미나 관심 진로에 대해 적어주시면 더 좋은 룸메이트를 찾는게 도움이 돼요."
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
        <Button size="lg" text="프로필 완성" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}
