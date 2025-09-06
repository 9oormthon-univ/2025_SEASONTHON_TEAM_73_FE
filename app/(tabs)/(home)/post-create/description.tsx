import { Button } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { DESCRIPTION_DEFAULT_VALUES } from "@/widgets/post-create/constants";
import type {
  CostFormData,
  DescriptionFormData,
  RoomInfoFormData,
} from "@/widgets/post-create/types/post";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useSubmitPost } from "../../../../widgets/post-create/api";

export default function DescriptionScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useLocalSearchParams();
  const roomInfo: RoomInfoFormData | null = params.roomInfo
    ? JSON.parse(params.roomInfo as string)
    : null;
  const cost: CostFormData = params.cost
    ? JSON.parse(params.cost as string)
    : null;

  const { handleSubmit, setValue, watch } = useForm<DescriptionFormData>({
    defaultValues: DESCRIPTION_DEFAULT_VALUES,
  });

  const { content } = watch();

  const { mutate: submitPost } = useSubmitPost();

  const onSubmit = async (data: DescriptionFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const { images, ...roomInfoWithoutImages } = roomInfo || {};

    const sanitizedRoomInfo = {
      ...roomInfoWithoutImages,
      areaSize: (roomInfoWithoutImages as any)?.areaSize ?? 0,
      floor: (roomInfoWithoutImages as any)?.floor ?? 1,
      buildingFloor: (roomInfoWithoutImages as any)?.buildingFloor ?? 1,
      roomCount: (roomInfoWithoutImages as any)?.roomCount ?? 1,
      washroomCount: (roomInfoWithoutImages as any)?.washroomCount ?? 1,
    };

    const sanitizedCost = {
      ...cost,
      deposit: cost?.deposit ?? 0,
      monthlyRent: cost?.monthlyRent ?? 0,
      maintenanceFee: cost?.maintenanceFee ?? 0,
      minStayMonths: cost?.minStayMonths ?? 1,
      maxStayMonths: cost?.maxStayMonths ?? 12,
    };

    const combinedData = {
      ...sanitizedRoomInfo,
      ...sanitizedCost,
      ...data,
    };

    const submitData = new FormData();

    // JSON 데이터를 문자열로 추가
    submitData.append("data", JSON.stringify(combinedData));

    if (images && images.length > 0) {
      images.forEach((image, index) => {
        submitData.append("imageFiles", {
          uri: image,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        } as any);
      });
    }

    console.log("submitData", submitData);

    submitPost(submitData, {
      onSuccess: () => {
        Alert.alert("성공", "게시글이 성공적으로 등록되었습니다.", [
          { text: "확인", onPress: () => router.navigate("/") },
        ]);
      },
      onError: (error) => {
        Alert.alert("오류", "게시글 등록에 실패했습니다. 다시 시도해주세요.");
      },
    });

    setIsSubmitting(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={containerStyle.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <PostCreateProgressBar
          totalScreens={3}
          currentIndex={2}
          title="부가 설명"
        />
        <View style={{ gap: 20, paddingBottom: 20 }}>
          <PostCreateField.TextArea
            title="간단한 설명"
            placeholder="작성하지 못한 이야기를 자유롭게 작성해주세요!
취미, 희망 진로, 동거 규칙에 대해 작성해주시면 좋아요."
            value={content}
            setValue={(value) => setValue("content", value)}
          />
        </View>
      </ScrollView>
      <View
        style={{
          padding: SPACING.normal,
          backgroundColor: "white",
        }}
      >
        <Button
          size="lg"
          text={isSubmitting ? "등록 중..." : "등록하기"}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
