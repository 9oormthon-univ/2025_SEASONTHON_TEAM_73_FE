import { Button, Input } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";

export default function RoomInfoScreen() {
  const { width } = Dimensions.get("screen");
  const halfInputWidth = (width - 20 * 3) / 2;

  const [heatingType, setHeatingType] = useState<number[]>([]);
  const [hasEV, setHasEV] = useState<number[]>([]);
  const [tradeType, setTradeType] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={containerStyle.wrapper}>
        <PostCreateProgressBar
          totalScreens={3}
          currentIndex={0}
          title="기본 정보"
        />
        <View style={{ gap: 20 }}>
          <Input.Title />
          <Input title="주소" required placeholder="집 주소를 입력하세요." />
          <PostCreateField.PhotoPicker
            title="사진"
            required={true}
            images={images}
            setImages={setImages}
            maxCount={10}
          />
          <PostCreateField.MultiRadio
            title="방 종류"
            required
            items={["원룸", "투룸", "오피스텔", "빌라", "아파트"]}
            selected={tradeType}
            setSelected={setTradeType}
          />
          <Input
            title="전용 면적"
            required
            placeholder="전용 면적을 입력해주세요."
            description="(단위: m²)"
            keyboardType="number-pad"
          />
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Input
              title="현재 층"
              placeholder="2"
              width={halfInputWidth}
              required
              keyboardType="number-pad"
            />
            <Input
              title="건물 전체 층"
              placeholder="4"
              width={halfInputWidth}
              required
              keyboardType="number-pad"
            />
          </View>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Input
              title="방 개수"
              placeholder="3"
              width={halfInputWidth}
              required
              keyboardType="number-pad"
            />
            <Input
              title="화장실 개수"
              placeholder="2"
              width={halfInputWidth}
              required
              keyboardType="number-pad"
            />
          </View>
          <PostCreateField.Radio
            title="난방 구조"
            required
            selected={heatingType}
            setSelected={setHeatingType}
            items={["중앙난방", "개별난방"]}
          />
          <PostCreateField.Radio
            title="엘리베이터"
            required
            selected={hasEV}
            setSelected={setHasEV}
            items={["있음", "없음"]}
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
          onPress={() => router.push("/post-create/cost")}
        />
      </View>
    </View>
  );
}
