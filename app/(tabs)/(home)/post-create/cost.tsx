import { Button, Input } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { COST_DEFAULT_VALUES } from "@/widgets/post-create/constants";
import { useCostValidation } from "@/widgets/post-create/hooks";
import { CostFormData } from "@/widgets/post-create/types/post";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, ScrollView, View } from "react-native";

export default function CostScreen() {
  const { width } = Dimensions.get("screen");
  const halfInputWidth = (width - 20 * 3) / 2;

  const params = useLocalSearchParams();
  const roomInfo = params.roomInfo
    ? JSON.parse(params.roomInfo as string)
    : null;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CostFormData>({
    defaultValues: COST_DEFAULT_VALUES,
  });

  const formData = watch();
  const { isFormValid } = useCostValidation(formData);

  const onSubmit = (data: CostFormData) => {
    console.log(data);
    console.log("이전 화면 데이터", roomInfo);

    router.push({
      pathname: "/post-create/description",
      params: {
        roomInfo: JSON.stringify(roomInfo),
        cost: JSON.stringify(data),
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={containerStyle.wrapper}>
        <PostCreateProgressBar
          totalScreens={3}
          currentIndex={1}
          title="비용 정보"
        />
        <View style={{ gap: 20 }}>
          <Controller
            control={control}
            name="deposit"
            rules={{ required: "보증금을 입력해주세요." }}
            render={({ field: { onChange, value } }) => (
              <Input
                title="보증금"
                required
                placeholder="보증금을 입력해주세요."
                description="(단위: 만 원)"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                error={errors.deposit?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="monthlyRent"
            rules={{ required: "월세를 입력해주세요." }}
            render={({ field: { onChange, value } }) => (
              <Input
                title="월세"
                required
                placeholder="월세를 입력해주세요."
                description="(단위: 만 원)"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                error={errors.monthlyRent?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="maintenanceFee"
            rules={{ required: "관리비를 입력해주세요." }}
            render={({ field: { onChange, value } }) => (
              <Input
                title="관리비"
                required
                placeholder="관리비를 입력해주세요."
                description="(단위: 만 원)"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                error={errors.maintenanceFee?.message}
              />
            )}
          />

          <PostCreateField.MultiRadio
            title="지불 구조"
            required
            isMultiSelect
            items={["보증금 분담", "월세 분담", "관리비 분담", "공과금 분담"]}
            selected={formData.paymentStructure}
            setSelected={(selected) => setValue("paymentStructure", selected)}
          />

          <PostCreateField.DatePicker
            title="입주 가능일"
            required
            value={formData.moveInDate}
            setValue={(value) => setValue("moveInDate", value)}
          />

          <View style={{ flexDirection: "row", gap: 20 }}>
            <Controller
              control={control}
              name="minStayPeriod"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="최소 거주 기간"
                  description="(단위: 개월)"
                  placeholder="3"
                  width={halfInputWidth}
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  error={errors.minStayPeriod?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="maxStayPeriod"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="최대 거주 기간"
                  description="(단위: 개월)"
                  placeholder="2"
                  width={halfInputWidth}
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  error={errors.maxStayPeriod?.message}
                />
              )}
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
          text="다음"
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormValid}
        />
      </View>
    </View>
  );
}
