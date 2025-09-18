import { BottomSheet } from "@/shared/components";
import { Toggle } from "@/shared/components/toggle/Toggle";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { PostCreateField } from "@/widgets/post-create/components";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  getFilterDisplayValue,
  getRadioSelectedIndex,
  USER_FILTER_FIELDS,
} from "../constants/userFilter";
import { useUserFilter } from "../contexts/filterUserDefault";
import { UserDefaultFilter } from "../types";

interface UserFilterBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function UserFilterBottomSheet({
  isVisible,
  onClose,
}: UserFilterBottomSheetProps) {
  const { defaultFilter, updateFilter } = useUserFilter();

  const [localFilter, setLocalFilter] = useState<UserDefaultFilter | null>(
    defaultFilter
  );

  useEffect(() => {
    if (isVisible) {
      setLocalFilter(defaultFilter);
    }
  }, [isVisible, defaultFilter]);

  const handleApply = () => {
    console.log("필터 적용:", localFilter);
    if (localFilter) {
      updateFilter(localFilter);
    }
  };

  const handleFilterChange = (key: keyof UserDefaultFilter, value: any) => {
    console.log(`필터 변경: ${key} = ${JSON.stringify(value)}`);
    setLocalFilter((prev) => {
      let newFilter;
      if (value === undefined) {
        // undefined인 경우 해당 키를 제거
        const { [key]: removed, ...rest } = prev || {};
        newFilter = rest;
      } else {
        newFilter = {
          ...prev,
          [key]: value,
        };
      }
      console.log("현재 필터 상태:", newFilter);
      return newFilter;
    });
  };

  // Toggle 필드 렌더러
  const renderToggleField = (
    fieldKey: keyof UserDefaultFilter,
    title: string
  ) => (
    <View style={styles.selectContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <Toggle
          isOn={
            fieldKey === "smoking"
              ? localFilter?.smoking || false
              : !!(localFilter?.pet && localFilter.pet.length > 0)
          }
          onToggle={(value: boolean) => {
            if (fieldKey === "smoking") {
              // 이미 true인 상태에서 다시 누르면 해제
              if (localFilter?.smoking && value) {
                handleFilterChange("smoking", undefined);
              } else {
                handleFilterChange("smoking", value);
              }
            } else if (fieldKey === "pet") {
              // 이미 pet이 있는 상태에서 다시 누르면 해제
              if (localFilter?.pet && localFilter.pet.length > 0 && value) {
                handleFilterChange("pet", undefined);
              } else {
                handleFilterChange("pet", value ? ["dog", "cat"] : undefined);
              }
            }
          }}
        />
      </View>
    </View>
  );

  const renderRadioField = (
    fieldKey: keyof UserDefaultFilter,
    title: string,
    options: readonly { label: string; value: any }[]
  ) => (
    <View style={styles.selectContainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          {getFilterDisplayValue(localFilter, fieldKey)}
        </Text>
      </View>
      <PostCreateField.MultiRadio
        items={options.map((option) => option.label)}
        selected={[getRadioSelectedIndex(localFilter, fieldKey)]}
        setSelected={(selected) => {
          if (selected.length === 0) {
            // 아무것도 선택되지 않은 경우 필터에서 제거
            handleFilterChange(fieldKey, undefined);
          } else {
            const selectedValue = options[selected[0]]?.value;
            // 같은 값을 다시 선택한 경우 해제
            if (selectedValue === localFilter?.[fieldKey]) {
              handleFilterChange(fieldKey, undefined);
            } else {
              handleFilterChange(fieldKey, selectedValue);
            }
          }
        }}
      />
    </View>
  );

  const UserFilterContent = () => (
    <ScrollView style={{ maxHeight: 510 }} showsVerticalScrollIndicator={false}>
      {renderToggleField(
        USER_FILTER_FIELDS.SMOKING.key,
        USER_FILTER_FIELDS.SMOKING.title
      )}

      {renderRadioField(
        USER_FILTER_FIELDS.ALCOHOL_COUNT.key,
        USER_FILTER_FIELDS.ALCOHOL_COUNT.title,
        USER_FILTER_FIELDS.ALCOHOL_COUNT.options
      )}

      {/* 수면 패턴 */}
      {renderRadioField(
        USER_FILTER_FIELDS.SLEEP_LEVEL.key,
        USER_FILTER_FIELDS.SLEEP_LEVEL.title,
        USER_FILTER_FIELDS.SLEEP_LEVEL.options
      )}

      {/* 반려동물 */}
      {renderToggleField(
        USER_FILTER_FIELDS.PET.key,
        USER_FILTER_FIELDS.PET.title
      )}

      {/* 청결도 */}
      {renderRadioField(
        USER_FILTER_FIELDS.TIDINESS_LEVEL.key,
        USER_FILTER_FIELDS.TIDINESS_LEVEL.title,
        USER_FILTER_FIELDS.TIDINESS_LEVEL.options
      )}
    </ScrollView>
  );

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      showButton={true}
      buttonText="적용"
      onButtonPress={handleApply}
    >
      <UserFilterContent />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  selectContainer: {
    marginBottom: SPACING.lg,
  },
  headerWrapper: {
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
    color: COLORS.gray[50],
  },
});
