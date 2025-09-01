import { Button } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { DESCRIPTION_DEFAULT_VALUES } from "@/widgets/post-create/constants";
import { useDescriptionValidation } from "@/widgets/post-create/hooks";
import { DescriptionFormData } from "@/widgets/post-create/types/post";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

export default function DescriptionScreen() {
  const params = useLocalSearchParams();
  const roomInfo = params.roomInfo
    ? JSON.parse(params.roomInfo as string)
    : null;
  const cost = params.cost ? JSON.parse(params.cost as string) : null;

  const { handleSubmit, setValue, watch } = useForm<DescriptionFormData>({
    defaultValues: DESCRIPTION_DEFAULT_VALUES,
  });

  const formData = watch();
  const { isFormValid } = useDescriptionValidation(formData);

  const onSubmit = (data: DescriptionFormData) => {
    console.log(data);
    console.log("전체 데이터", {
      roomInfo,
      cost,
      description: data,
    });
    router.navigate("/");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={containerStyle.wrapper}>
        <PostCreateProgressBar
          totalScreens={3}
          currentIndex={2}
          title="부가 설명"
        />
        <View style={{ gap: 20 }}>
          <PostCreateField.Radio
            title="모집 성별"
            description="중복 선택 가능"
            isMultiSelect
            required
            items={["남성", "여성"]}
            selected={formData.gender}
            setSelected={(selected) => setValue("gender", selected)}
          />

          <PostCreateField.TextArea
            title="간단한 설명"
            placeholder="작성하지 못한 이야기를 자유롭게 작성해주세요!
취미, 희망 진로, 동거 규칙에 대해 작성해주시면 좋아요."
            value={formData.description}
            setValue={(value) => setValue("description", value)}
          />
        </View>
      </ScrollView>
      <View
        style={{
          padding: SPACING.normal,
        }}
      >
        <Button
          size="lg"
          title="다음"
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormValid}
        />
      </View>
    </View>
  );
}
