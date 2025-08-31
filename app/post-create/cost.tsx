import { Button, Input } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";

export default function CostScreen() {
  const { width } = Dimensions.get("screen");
  const halfInputWidth = (width - 20 * 3) / 2;

  const [rentType, setRentType] = useState<number[]>([]);
  const [minStay, setMinStay] = useState<Date | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={containerStyle.wrapper}>
        <PostCreateProgressBar
          totalScreens={3}
          currentIndex={1}
          title="비용 정보"
        />
        <View style={{ gap: 20 }}>
          <Input
            title="보증금"
            required
            placeholder="보증금을 입력해주세요."
            description="(단위: 만 원)"
            keyboardType="number-pad"
          />
          <Input
            title="월세"
            required
            placeholder="월세를 입력해주세요."
            description="(단위: 만 원)"
            keyboardType="number-pad"
          />
          <Input
            title="관리비"
            required
            placeholder="관리비를 입력해주세요."
            description="(단위: 만 원)"
            keyboardType="number-pad"
          />
          <PostCreateField.MultiRadio
            title="지불 구조"
            required
            isMultiSelect
            items={["보증금 분담", "월세 분담", "관리비 분담", "공과금 분담"]}
            selected={rentType}
            setSelected={setRentType}
          />
          <PostCreateField.DatePicker
            title="입주 가능일"
            required
            value={minStay}
            setValue={setMinStay}
          />
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Input
              title="최소 거주 기간"
              description="(단위: 개월)"
              placeholder="3"
              width={halfInputWidth}
              keyboardType="number-pad"
            />
            <Input
              title="최대 거주 기간"
              description="(단위: 개월)"
              placeholder="2"
              width={halfInputWidth}
              keyboardType="number-pad"
            />
          </View>
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
          onPress={() => router.push("/post-create/description")}
        />
      </View>
    </View>
  );
}
