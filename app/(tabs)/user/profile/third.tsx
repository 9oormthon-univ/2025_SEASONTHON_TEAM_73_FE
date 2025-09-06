import { Button } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileHabitsFormData {
  smoking: boolean;
  pet: any[];
}

const DEFAULT_VALUES: ProfileHabitsFormData = {
  smoking: false,
  pet: [],
};

export default function ProfileHabitsScreen() {
  const { basicInfo, sleepInfo } = useLocalSearchParams();
  const { handleSubmit, setValue, watch } = useForm<ProfileHabitsFormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const formData = watch();
  const isFormValid = true; // 모든 필드가 선택형이므로 항상 valid

  const onSubmit = (data: ProfileHabitsFormData) => {
    router.push({
      pathname: "/user/profile/fourth",
      params: {
        basicInfo: basicInfo as string,
        sleepInfo: sleepInfo as string,
        habitsInfo: JSON.stringify(data),
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
            currentIndex={2}
            title="기타 정보"
          />
          <View style={{ gap: 20, paddingBottom: 20 }}>
            <PostCreateField.Radio
              title="흡연"
              required
              selected={[formData.smoking ? 0 : 1]}
              setSelected={(selected) =>
                setValue("smoking", (selected[0] || 0) === 0)
              }
              items={["흡연", "비흡연"]}
            />

            <PostCreateField.MultiRadio
              title="반려동물"
              description="키우고 있는 반려동물을 선택해주세요 (중복 선택 가능)"
              items={[
                "강아지",
                "고양이",
                "새",
                "물고기",
                "햄스터",
                "기타",
                "없음",
              ]}
              selected={[
                formData.pet.includes("강아지") ? 0 : -1,
                formData.pet.includes("고양이") ? 1 : -1,
                formData.pet.includes("새") ? 2 : -1,
                formData.pet.includes("물고기") ? 3 : -1,
                formData.pet.includes("햄스터") ? 4 : -1,
                formData.pet.includes("기타") ? 5 : -1,
                formData.pet.length === 0 ? 6 : -1,
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
                if (selected.includes(6)) {
                  setValue("pet", []);
                } else {
                  const selectedPets = selected
                    .filter((index) => index < 6)
                    .map((index) => petOptions[index]);
                  setValue("pet", selectedPets);
                }
              }}
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
