import { Button, Input } from "@/shared/components";
import { containerStyle, SPACING } from "@/shared/styles";
import {
  PostCreateField,
  PostCreateProgressBar,
} from "@/widgets/post-create/components";
import { COST_DEFAULT_VALUES } from "@/widgets/post-create/constants";
import { usePostCreate } from "@/widgets/post-create/contexts";
import { useCostValidation } from "@/widgets/post-create/hooks";
import { CostFormData } from "@/widgets/post-create/types/post";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function CostScreen() {
  const { width } = Dimensions.get("screen");
  const halfInputWidth = (width - 18 * 2 - 20) / 2;
  const thirdInputWidth = (width - 18 * 2 - 10 * 2) / 3;
  const { setCost } = usePostCreate();

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
    setCost(data);
    router.push("/post-create/description");
  };

  return (
    <>
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
            currentIndex={1}
            title="비용 정보"
          />
          <View style={{ gap: 20, paddingBottom: 20 }}>
            <View style={{ gap: 10, flexDirection: "row" }}>
              <Controller
                control={control}
                name="deposit"
                rules={{ required: "보증금을 입력해주세요." }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    style={{ width: thirdInputWidth }}
                    title="보증금"
                    required
                    keyboardType="number-pad"
                    value={value ? String(value) : ""}
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
                    style={{ width: thirdInputWidth }}
                    required
                    keyboardType="number-pad"
                    value={value ? String(value) : ""}
                    onChangeText={(text) => onChange(Number(text) || 0)}
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
                    style={{ width: thirdInputWidth }}
                    required
                    keyboardType="number-pad"
                    value={value ? String(value) : ""}
                    onChangeText={(text) => onChange(Number(text) || 0)}
                    error={errors.maintenanceFee?.message}
                  />
                )}
              />
            </View>

            <PostCreateField.MultiRadio
              title="지불 구조"
              required
              isMultiSelect
              items={["보증금 분담", "월세 분담", "관리비 분담", "공과금 분담"]}
              selected={
                [
                  formData.depositShare ? 0 : null,
                  formData.rentShare ? 1 : null,
                  formData.maintenanceShare ? 2 : null,
                  formData.utilitiesShare ? 3 : null,
                ].filter((item) => item !== null) as number[]
              }
              setSelected={(selected) => {
                setValue("depositShare", selected.includes(0));
                setValue("rentShare", selected.includes(1));
                setValue("maintenanceShare", selected.includes(2));
                setValue("utilitiesShare", selected.includes(3));
              }}
            />

            <PostCreateField.DatePicker
              title="입주 가능일"
              required
              value={
                formData.availableDate ? new Date(formData.availableDate) : null
              }
              setValue={(value) =>
                setValue(
                  "availableDate",
                  value ? value.toISOString().split("T")[0] : ""
                )
              }
            />

            <View style={{ flexDirection: "row", gap: 20 }}>
              <Controller
                control={control}
                name="minStayMonths"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="최소 거주 기간"
                    suffix="개월"
                    width={halfInputWidth}
                    keyboardType="number-pad"
                    value={value ? String(value) : ""}
                    onChangeText={(text) => onChange(Number(text) || 0)}
                    error={errors.minStayMonths?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="maxStayMonths"
                render={({ field: { onChange, value } }) => (
                  <Input
                    title="최대 거주 기간"
                    suffix="개월"
                    width={halfInputWidth}
                    keyboardType="number-pad"
                    value={value ? String(value) : ""}
                    onChangeText={(text) => onChange(Number(text) || 0)}
                    error={errors.maxStayMonths?.message}
                  />
                )}
              />
            </View>
            <Controller
              control={control}
              name="preferredGender"
              render={({ field: { onChange, value } }) => (
                <PostCreateField.Radio
                  title="모집 성별"
                  items={["남자", "여자"]}
                  isMultiSelect
                  required
                  selected={
                    [
                      value.includes("MALE") ? 0 : null,
                      value.includes("FEMALE") ? 1 : null,
                    ].filter((item) => item !== null) as number[]
                  }
                  setSelected={(selected) => {
                    const newGenders: ("MALE" | "FEMALE")[] = [];
                    if (selected.includes(0)) newGenders.push("MALE");
                    if (selected.includes(1)) newGenders.push("FEMALE");
                    onChange(newGenders);
                  }}
                />
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          padding: SPACING.normal,
          backgroundColor: "white",
        }}
      >
        <Button
          size="lg"
          text="다음"
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormValid}
        />
      </View>
    </>
  );
}
