import { Button } from "@/shared/components";
import { COLORS, containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] =
    useState<ProfileFinalFormData>(DEFAULT_VALUES);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleButtonPress = (buttonLabel: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(buttonLabel)) {
        return prev.filter((value) => value !== buttonLabel);
      } else if (prev.length < 3) {
        return [...prev, buttonLabel];
      }
      return prev;
    });
  };

  const handleSubmit = async () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
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
      setIsModal(false);
      Alert.alert("오류", "프로필 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
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
      <Modal
        visible={isModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModal(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => setIsModal(false)}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 12,
              padding: SPACING.normal,
              alignItems: "center",
              flexWrap: "wrap",
              maxWidth: 357,
              flexDirection: "row",
              gap: 10,
            }}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontWeight: "700",
                  fontFamily: "SUIT Variable",
                  color: "#17171b",
                  textAlign: "left",
                }}
              >
                당신에게 가장 중요한 생활 기준을 알려주세요.
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 18,
                  fontFamily: "SUIT Variable",
                  color: "#878789",
                  textAlign: "left",
                }}
              >
                해당 기준과 일치하는 사용자를 추천해드려요.
              </Text>
            </View>
            <View style={{ width: "100%", height: 12 }} />

            {BUTTONS.map((button) => (
              <TouchableOpacity
                key={button.label}
                style={{
                  borderColor: "#cbcbcb",
                  borderWidth: 1,
                  padding: 8,
                  paddingHorizontal: 16,
                  borderRadius: 100,
                  backgroundColor: selectedValues.includes(button.label)
                    ? COLORS.primary[90]
                    : "#FFFFFF",
                }}
                onPress={() => handleButtonPress(button.label)}
              >
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    fontWeight: "500",
                    fontFamily: "SUIT Variable",
                    color: selectedValues.includes(button.label)
                      ? COLORS.white
                      : COLORS.gray[20],
                    textAlign: "left",
                  }}
                >
                  {button.label}
                </Text>
              </TouchableOpacity>
            ))}
            <View style={{ width: "100%", height: 18 }} />

            <Button
              text={
                selectedValues.length !== 3
                  ? `(${selectedValues.length}/3) 완료`
                  : "완료"
              }
              onPress={handleCloseModal}
              size="lg"
              variant={selectedValues.length !== 3 ? "disabled" : "primary"}
              disabled={selectedValues.length !== 3}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const BUTTONS = [
  { label: "주 식사 방식", value: "cookingCount" },
  { label: "음식 냄새 민감도", value: "smellLevel" },
  { label: "주 음주 횟수", value: "alcoholCount" },
  { label: "사용 식기", value: "dishShare" },
  { label: "정리정돈 성향", value: "tidinessLevel" },
  { label: "화장실 청결 민감도", value: "bathroomCleaningLevel" },
  { label: "잠귀 민감도", value: "sleepLevel" },
  { label: "잠버릇", value: "sleepHabit" },
  { label: "평소 휴대폰 모드", value: "phoneMode" },
  { label: "이어폰 사용 습관", value: "earphoneUsage" },
  { label: "흡연여부", value: "smoking" },
  { label: "반려동물", value: "pet" },
];
