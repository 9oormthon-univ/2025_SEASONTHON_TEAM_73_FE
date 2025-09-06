import { Button } from "@/shared/components";
import {
  COLORS,
  containerStyle,
  FONT_SIZE,
  FONTS,
  SPACING,
} from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
  Toggle,
} from "@/widgets/post-create/components";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileSleepFormData {
  sleepLevel: "LOW" | "MEDIUM" | "HIGH";
  sleepHabit: "NONE" | "SNORING" | "TEETH_GRINDING";
  phoneMode: "VIBRATION" | "SILENT" | "NONE";
  earphoneUsage: "ALAWAYS" | "NIGHT_ONLY" | "NOT_CARE";
  smoking: boolean;
  hasPet: boolean;
  pet: string[];
}

const DEFAULT_VALUES: ProfileSleepFormData = {
  sleepLevel: "HIGH",
  sleepHabit: "NONE",
  phoneMode: "SILENT",
  earphoneUsage: "NIGHT_ONLY",
  smoking: false,
  hasPet: false,
  pet: [],
};

export default function ProfileSleepScreen() {
  const { basicInfo } = useLocalSearchParams();
  const [formData, setFormData] =
    useState<ProfileSleepFormData>(DEFAULT_VALUES);

  const isFormValid = true; // 모든 필드가 선택형이므로 항상 valid

  const onSubmit = () => {
    router.push({
      pathname: "/user/profile/third",
      params: {
        basicInfo: basicInfo as string,
        sleepInfo: JSON.stringify(formData),
      },
    });
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
            currentIndex={1}
            title="공동 생활"
          />
          <View style={{ gap: 20, paddingBottom: 20 }}>
            <Text style={styles.title}>소리 민감도</Text>

            <PostCreateField.MultiRadio
              title="잠귀 민감도"
              selected={[
                formData.sleepLevel === "LOW"
                  ? 0
                  : formData.sleepLevel === "MEDIUM"
                  ? 1
                  : 2,
              ]}
              setSelected={(selected) => {
                const sleepMap = ["LOW", "MEDIUM", "HIGH"] as const;
                setFormData((prev) => ({
                  ...prev,
                  sleepLevel: sleepMap[selected[0] || 0],
                }));
              }}
              items={["둔감해요", "보통이에요", "예민한 편이에요"]}
            />

            <PostCreateField.MultiRadio
              title="잠버릇"
              items={["코골이", "이갈이", "없음"]}
              selected={[
                formData.sleepHabit === "SNORING" ? 0 : -1,
                formData.sleepHabit === "TEETH_GRINDING" ? 1 : -1,
                formData.sleepHabit === "NONE" ? 2 : -1,
              ].filter((index) => index !== -1)}
              setSelected={(selected) => {
                const habitOptions = [
                  "SNORING",
                  "TEETH_GRINDING",
                  "NONE",
                ] as const;
                const selectedHabit = habitOptions[selected[0] || 2];
                setFormData((prev) => ({
                  ...prev,
                  sleepHabit: selectedHabit,
                }));
              }}
            />

            <PostCreateField.MultiRadio
              title="휴대폰 모드"
              selected={[
                formData.phoneMode === "VIBRATION"
                  ? 0
                  : formData.phoneMode === "SILENT"
                  ? 1
                  : 2,
              ]}
              setSelected={(selected) => {
                const phoneMap = ["VIBRATION", "SILENT", "NONE"] as const;
                setFormData((prev) => ({
                  ...prev,
                  phoneMode: phoneMap[selected[0] || 0],
                }));
              }}
              items={["진동 모드", "무음 모드", "상관없음"]}
            />

            <PostCreateField.MultiRadio
              title="나의 이어폰 사용 습관"
              selected={[
                formData.earphoneUsage === "ALAWAYS"
                  ? 0
                  : formData.earphoneUsage === "NIGHT_ONLY"
                  ? 1
                  : 2,
              ]}
              setSelected={(selected) => {
                const earphoneMap = [
                  "ALAWAYS",
                  "NIGHT_ONLY",
                  "NOT_CARE",
                ] as const;
                setFormData((prev) => ({
                  ...prev,
                  earphoneUsage: earphoneMap[selected[0] || 0],
                }));
              }}
              items={["항상", "밤에만", "안 써요"]}
            />

            <Text
              style={[
                styles.title,
                {
                  paddingTop: SPACING.lg,
                  borderTopWidth: 1,
                  borderTopColor: COLORS.gray[10],
                  marginTop: SPACING.md,
                },
              ]}
            >
              기타 생활 습관
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{ fontSize: FONT_SIZE.b2, fontFamily: FONTS.regular }}
              >
                흡연 여부
              </Text>
              <Toggle
                initialValue={formData.smoking}
                onToggle={(value) =>
                  setFormData((prev) => ({ ...prev, smoking: value }))
                }
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{ fontSize: FONT_SIZE.b2, fontFamily: FONTS.regular }}
              >
                키우는 반려 동물
              </Text>
              <Toggle
                initialValue={formData.hasPet}
                onToggle={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    hasPet: value,
                    pet: value ? prev.pet : [],
                  }));
                }}
              />
            </View>
          </View>
          {formData.hasPet && (
            <PostCreateField.MultiRadio
              items={["강아지", "고양이", "새", "물고기", "햄스터", "기타"]}
              selected={[
                formData.pet.includes("강아지") ? 0 : -1,
                formData.pet.includes("고양이") ? 1 : -1,
                formData.pet.includes("새") ? 2 : -1,
                formData.pet.includes("물고기") ? 3 : -1,
                formData.pet.includes("햄스터") ? 4 : -1,
                formData.pet.length === 0 ? 5 : -1,
              ].filter((index) => index !== -1)}
              setSelected={(selected) => {
                const petOptions = [
                  "강아지",
                  "고양이",
                  "새",
                  "물고기",
                  "햄스터",
                  "기타",
                ];

                const selectedPets = selected
                  .filter((index) => index < 6)
                  .map((index) => petOptions[index]);
                setFormData((prev) => ({ ...prev, pet: selectedPets }));
              }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          padding: SPACING.normal,
        }}
      >
        <Button
          size="lg"
          text="다음"
          onPress={onSubmit}
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.b1,
    fontFamily: FONTS.semiBold,
    marginBottom: SPACING.sm,
  },
});
