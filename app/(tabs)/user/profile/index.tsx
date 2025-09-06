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
} from "@/widgets/post-create/components";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileBasicFormData {
  cookingCount: "ORDER" | "COOK";
  smellLevel: "LOW" | "MEDIUM" | "HIGH";
  alcoholCount: "ZERO" | "ONE_TO_THREE" | "MORE_THAN_FOUR";
  dishShare: "SHARE" | "PERSONAL";
  tidinessLevel: "LOW" | "MEDIUM" | "HIGH";
  bathroomCleaningLevel: "LOW" | "MEDIUM" | "HIGH";
}

const DEFAULT_VALUES: ProfileBasicFormData = {
  cookingCount: "ORDER",
  smellLevel: "HIGH",
  alcoholCount: "ZERO",
  dishShare: "SHARE",
  tidinessLevel: "LOW",
  bathroomCleaningLevel: "HIGH",
};

export default function ProfileBasicScreen() {
  const { handleSubmit, setValue, watch } = useForm<ProfileBasicFormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const formData = watch();
  const isFormValid = true; // 모든 필드가 선택형이므로 항상 valid

  const onSubmit = (data: ProfileBasicFormData) => {
    router.push({
      pathname: "/user/profile/second",
      params: { basicInfo: JSON.stringify(data) },
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
            currentIndex={0}
            title="생활 루틴"
          />
          <View style={{ gap: 20, paddingBottom: 20 }}>
            <Text style={styles.title}>식사 습관</Text>
            <PostCreateField.MultiRadio
              title="주 식사 방식"
              selected={[formData.cookingCount === "COOK" ? 0 : 1]}
              setSelected={(selected) => {
                const cookingMap = ["COOK", "ORDER"] as const;
                setValue("cookingCount", cookingMap[selected[0] || 0]);
              }}
              items={["주로 해 먹어요", "주로 외식/배달음식 먹어요"]}
            />

            <PostCreateField.MultiRadio
              title="음식 냄새 민감도"
              selected={[
                formData.smellLevel === "LOW"
                  ? 0
                  : formData.smellLevel === "MEDIUM"
                  ? 1
                  : 2,
              ]}
              setSelected={(selected) => {
                const smellMap = ["LOW", "MEDIUM", "HIGH"] as const;
                setValue("smellLevel", smellMap[selected[0] || 0]);
              }}
              items={["둔감해요", "보통이에요", "예민한 편이에요"]}
            />

            <PostCreateField.MultiRadio
              title="주 음주 횟수"
              selected={[
                formData.alcoholCount === "ZERO"
                  ? 0
                  : formData.alcoholCount === "ONE_TO_THREE"
                  ? 1
                  : 2,
              ]}
              setSelected={(selected) => {
                const alcoholMap = [
                  "ZERO",
                  "ONE_TO_THREE",
                  "MORE_THAN_FOUR",
                ] as const;
                setValue("alcoholCount", alcoholMap[selected[0] || 0]);
              }}
              items={["0회", "1-3회", "4회 이상"]}
            />

            <PostCreateField.MultiRadio
              title="사용 식기"
              selected={[formData.dishShare === "PERSONAL" ? 0 : 1]}
              setSelected={(selected) =>
                setValue(
                  "dishShare",
                  (selected[0] || 0) === 0 ? "PERSONAL" : "SHARE"
                )
              }
              items={["개인 식기", "공용 식기"]}
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
              청소 습관
            </Text>

            <PostCreateField.MultiRadio
              title="정리정돈 성향"
              selected={[
                formData.tidinessLevel === "HIGH"
                  ? 0
                  : formData.tidinessLevel === "MEDIUM"
                  ? 1
                  : 2,
              ]}
              setSelected={(selected) => {
                const tidinessMap = ["HIGH", "MEDIUM", "LOW"] as const;
                setValue("tidinessLevel", tidinessMap[selected[0] || 0]);
              }}
              items={[
                "항상 제자리에 둬요",
                "대체로 정돈되어 있어요",
                "어지르는 편이에요",
              ]}
            />

            <PostCreateField.MultiRadio
              title="화장실 청소 민감도"
              selected={[
                formData.bathroomCleaningLevel === "LOW"
                  ? 0
                  : formData.bathroomCleaningLevel === "MEDIUM"
                  ? 1
                  : 2,
              ]}
              setSelected={(selected) => {
                const bathroomMap = ["LOW", "MEDIUM", "HIGH"] as const;
                setValue(
                  "bathroomCleaningLevel",
                  bathroomMap[selected[0] || 0]
                );
              }}
              items={["둔감해요", "보통이에요", "예민한 편이에요"]}
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
          onPress={handleSubmit(onSubmit)}
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
