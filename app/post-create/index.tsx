import { Button, Input } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { ROOM_INFO_DEFAULT_VALUES } from "@/widgets/post-create/constants";
import { useRoomInfoValidation } from "@/widgets/post-create/hooks";
import { RoomInfoFormData } from "@/widgets/post-create/types/post";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, ScrollView, View } from "react-native";

export default function RoomInfoScreen() {
  const { width } = Dimensions.get("screen");
  const halfInputWidth = (width - 20 * 3) / 2;

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
    console.log(data);
    router.push({
      pathname: "/post-create/cost",
      params: { roomInfo: JSON.stringify(data) },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={containerStyle.wrapper}>
        <PostCreateProgressBar
          totalScreens={3}
          currentIndex={0}
          title="기본 정보"
        />
        <View style={{ gap: 20 }}>
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
            name="address"
            rules={{ required: "주소를 입력해주세요." }}
            render={({ field: { onChange, value } }) => (
              <Input
                title="주소"
                required
                placeholder="집 주소를 입력하세요."
                value={value}
                onChangeText={onChange}
                error={errors.address?.message}
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
            selected={formData.roomType}
            setSelected={(selected) => setValue("roomType", selected)}
          />

          <Controller
            control={control}
            name="area"
            rules={{ required: "전용 면적을 입력해주세요." }}
            render={({ field: { onChange, value } }) => (
              <Input
                title="전용 면적"
                required
                placeholder="전용 면적을 입력해주세요."
                description="(단위: m²)"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                error={errors.area?.message}
              />
            )}
          />

          <View style={{ flexDirection: "row", gap: 20 }}>
            <Controller
              control={control}
              name="currentFloor"
              rules={{ required: "현재 층을 입력해주세요." }}
              render={({ field: { onChange, value } }) => (
                <Input
                  title="현재 층"
                  placeholder="2"
                  width={halfInputWidth}
                  required
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  error={errors.currentFloor?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="totalFloors"
              rules={{ required: "건물 전체 층을 입력해주세요." }}
              render={({ field: { onChange, value } }) => (
                <Input
                  title="건물 전체 층"
                  placeholder="4"
                  width={halfInputWidth}
                  required
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  error={errors.totalFloors?.message}
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
                  placeholder="3"
                  width={halfInputWidth}
                  required
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  error={errors.roomCount?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="bathroomCount"
              rules={{ required: "화장실 개수를 입력해주세요." }}
              render={({ field: { onChange, value } }) => (
                <Input
                  title="화장실 개수"
                  placeholder="2"
                  width={halfInputWidth}
                  required
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  error={errors.bathroomCount?.message}
                />
              )}
            />
          </View>

          <PostCreateField.Radio
            title="난방 구조"
            required
            selected={formData.heatingType}
            setSelected={(selected) => setValue("heatingType", selected)}
            items={["중앙난방", "개별난방"]}
          />

          <PostCreateField.Radio
            title="엘리베이터"
            required
            selected={formData.hasElevator}
            setSelected={(selected) => setValue("hasElevator", selected)}
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
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormValid}
        />
      </View>
    </View>
  );
}
