import { Button } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function DescriptionScreen() {
  const [gender, setGender] = useState<number[]>([]);
  const [description, setDescription] = useState<string>("");

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
            selected={gender}
            setSelected={setGender}
          />
          <PostCreateField.TextArea
            title="간단한 설명"
            placeholder="작성하지 못한 이야기를 자유롭게 작성해주세요!
취미, 희망 진로, 동거 규칙에 대해 작성해주시면 좋아요."
            value={description}
            setValue={setDescription}
          />
        </View>
      </ScrollView>
      <View
        style={{
          padding: SPACING.normal,
        }}
      >
        <Button size="lg" title="다음" onPress={() => router.navigate("/")} />
      </View>
    </View>
  );
}
