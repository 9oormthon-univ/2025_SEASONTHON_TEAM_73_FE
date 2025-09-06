import { Button, Input } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import { ROOM_TYPE } from "@/widgets/home/constants";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { ROOM_INFO_DEFAULT_VALUES } from "@/widgets/post-create/constants";
import { usePostCreate } from "@/widgets/post-create/contexts";
import { useRoomInfoValidation } from "@/widgets/post-create/hooks";
import type { RoomInfoFormData } from "@/widgets/post-create/types";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoomInfoScreen() {
  const { width } = Dimensions.get("screen");
  const halfInputWidth = (width - 20 * 3) / 2;
  const { setRoomInfo } = usePostCreate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RoomInfoFormData>({
    defaultValues: ROOM_INFO_DEFAULT_VALUES,
  });

  const formData = watch();
  const { isFormValid } = useRoomInfoValidation(formData);

  const onSubmit = (data: RoomInfoFormData) => {
    setRoomInfo(data);
    router.push("/post-create/cost");
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
            totalScreens={3}
            currentIndex={0}
            title="기본 정보"
          />
          <View style={{ gap: 20, paddingBottom: 20 }}>
            <Controller
              control={control}
              name="title"
              rules={{ required: "제목을 입력해주세요." }}
              render={({ field: { onChange, value } }) => (
                <Input.Title
                  value={value}
                  onChangeText={onChange}
                  error={errors.title?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="location"
              rules={{ required: "주소를 입력해주세요." }}
              render={({ field: { onChange, value } }) => (
                <Input
                  title="주소"
                  required
                  placeholder="집 주소를 입력하세요."
                  value={value}
                  onChangeText={onChange}
                  error={errors.location?.message}
                />
              )}
            />

            <PostCreateField.PhotoPicker
              title="사진"
              required={true}
              images={formData.images}
              setImages={(images) => setValue("images", images)}
              maxCount={10}
            />

            <PostCreateField.MultiRadio
              title="방 종류"
              required
              items={["원룸", "투룸", "오피스텔", "빌라", "아파트"]}
              selected={[
                formData.roomType === "ONE_ROOM"
                  ? 0
                  : formData.roomType === "TWO_ROOM"
                  ? 1
                  : formData.roomType === "OFFICETEL"
                  ? 2
                  : formData.roomType === "VILLA"
                  ? 3
                  : formData.roomType === "APARTMENT"
                  ? 4
                  : 0,
              ]}
              setSelected={(selected) => {
                const index = selected[0] || 0;
                const roomTypeKey =
                  index === 0
                    ? "ONE_ROOM"
                    : index === 1
                    ? "TWO_ROOM"
                    : index === 2
                    ? "OFFICETEL"
                    : index === 3
                    ? "VILLA"
                    : index === 4
                    ? "APARTMENT"
                    : "ONE_ROOM";
                setValue("roomType", roomTypeKey as keyof typeof ROOM_TYPE);
              }}
            />

            <Controller
              control={control}
              name="areaSize"
              rules={{ required: "전용 면적을 입력해주세요." }}
              render={({ field: { onChange, value } }) => (
                <Input
                  title="전용 면적"
                  required
                  placeholder="전용 면적을 입력해주세요"
                  suffix="m²"
                  keyboardType="number-pad"
                  value={value?.toString() || ""}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    onChange(numericValue ? parseFloat(numericValue) : 0);
                  }}
                  error={errors.areaSize?.message}
                />
              )}
            />

            <View style={{ flexDirection: "row", gap: 20 }}>
              <Controller
                control={control}
                name="floor"
                rules={{ required: "현재 층을 입력해주세요." }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="현재 층"
                    suffix="층"
                    width={halfInputWidth}
                    required
                    keyboardType="number-pad"
                    value={value?.toString() || ""}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9]/g, "");
                      onChange(numericValue ? parseInt(numericValue) : 0);
                    }}
                    error={errors.floor?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="buildingFloor"
                rules={{ required: "건물 전체 층을 입력해주세요." }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="건물 전체 층"
                    suffix="층"
                    width={halfInputWidth}
                    required
                    keyboardType="number-pad"
                    value={value?.toString() || ""}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9]/g, "");
                      onChange(numericValue ? parseInt(numericValue) : 0);
                    }}
                    error={errors.buildingFloor?.message}
                  />
                )}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 20 }}>
              <Controller
                control={control}
                name="roomCount"
                rules={{ required: "방 개수를 입력해주세요." }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="방 개수"
                    suffix="개"
                    width={halfInputWidth}
                    required
                    keyboardType="number-pad"
                    value={value?.toString() || ""}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9]/g, "");
                      onChange(numericValue ? parseInt(numericValue) : 0);
                    }}
                    error={errors.roomCount?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="washroomCount"
                rules={{ required: "화장실 개수를 입력해주세요." }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="화장실 개수"
                    suffix="개"
                    width={halfInputWidth}
                    required
                    keyboardType="number-pad"
                    value={value?.toString() || ""}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9]/g, "");
                      onChange(numericValue ? parseInt(numericValue) : 0);
                    }}
                    error={errors.washroomCount?.message}
                  />
                )}
              />
            </View>

            <PostCreateField.Radio
              title="엘리베이터"
              required
              selected={[formData.hasElevator ? 0 : 1]}
              setSelected={(selected) =>
                setValue("hasElevator", (selected[0] || 0) === 0)
              }
              items={["있음", "없음"]}
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
