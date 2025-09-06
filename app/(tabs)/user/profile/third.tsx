import { Button, Input } from "@/shared/components";
import { containerStyle, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import {
  PostCreateProgressBar,
  Toggle,
} from "@/widgets/post-create/components";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
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
  const { handleSubmit } = useForm<ProfileHabitsFormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const [hasDisease, setHasDisease] = useState(false);

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
                질병 유무
              </Text>
              <Toggle
                initialValue={hasDisease}
                onToggle={(value) => setHasDisease(value)}
              />
            </View>
            {hasDisease && (
              <Input placeholder="사소한 질병이라도 알려주세요. (예 : 무좀, 알러지 등)" />
            )}
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
