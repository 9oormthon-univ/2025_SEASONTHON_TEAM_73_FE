import { Button } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileSleepFormData {
  sleepLevel: "LOW" | "MEDIUM" | "HIGH";
  sleepHabit: ("NONE" | "SNORING" | "TEETH_GRINDING")[];
  phoneMode: "VIBRATION" | "SILENT" | "NONE";
  earphoneUsage: "ALAWAYS" | "NIGHT_ONLY" | "NOT_CARE";
}

const DEFAULT_VALUES: ProfileSleepFormData = {
  sleepLevel: "HIGH",
  sleepHabit: ["NONE"],
  phoneMode: "SILENT",
  earphoneUsage: "NIGHT_ONLY",
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
            title="수면 및 소음"
          />
          <View style={{ gap: 20, paddingBottom: 20 }}>
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
                formData.sleepHabit.includes("SNORING") ? 0 : -1,
                formData.sleepHabit.includes("TEETH_GRINDING") ? 1 : -1,
                formData.sleepHabit.includes("NONE") ? 2 : -1,
              ].filter((index) => index !== -1)}
              setSelected={(selected) => {
                const habitOptions = [
                  "NONE",
                  "SNORING",
                  "TEETH_GRINDING",
                ] as const;
                if (selected.includes(0)) {
                  setFormData((prev) => ({ ...prev, sleepHabit: ["NONE"] }));
                } else {
                  const selectedHabits = selected
                    .map((index) => habitOptions[index])
                    .filter(Boolean);
                  setFormData((prev) => ({
                    ...prev,
                    sleepHabit:
                      selectedHabits.length > 0 ? selectedHabits : ["NONE"],
                  }));
                }
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
          text="다음"
          onPress={onSubmit}
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
}
