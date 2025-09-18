import { BottomSheet } from "@/shared/components";
import { renderMultiRadio, renderToggle } from "@/shared/utils";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
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

  const renderToggleField = (
    fieldKey: keyof UserDefaultFilter,
    title: string
  ) => {
    const isOn =
      fieldKey === "smoking"
        ? localFilter?.smoking || false
        : !!(localFilter?.pet && localFilter.pet.length > 0);

    const handleToggle = (value: boolean) => {
      if (fieldKey === "smoking") {
        if (localFilter?.smoking && value) {
          handleFilterChange("smoking", undefined);
        } else {
          handleFilterChange("smoking", value);
        }
      } else if (fieldKey === "pet") {
        if (localFilter?.pet && localFilter.pet.length > 0 && value) {
          handleFilterChange("pet", undefined);
        } else {
          handleFilterChange("pet", value ? ["dog", "cat"] : undefined);
        }
      }
    };

    return renderToggle(title, isOn, handleToggle);
  };

  const renderRadioField = (
    fieldKey: keyof UserDefaultFilter,
    title: string,
    options: readonly { label: string; value: any }[]
  ) => {
    const description = getFilterDisplayValue(localFilter, fieldKey);
    const items = options.map((option) => option.label);
    const selected = [getRadioSelectedIndex(localFilter, fieldKey)];

    const handleSelectionChange = (selected: number[]) => {
      if (selected.length === 0) {
        handleFilterChange(fieldKey, undefined);
      } else {
        const selectedValue = options[selected[0]]?.value;
        if (selectedValue === localFilter?.[fieldKey]) {
          handleFilterChange(fieldKey, undefined);
        } else {
          handleFilterChange(fieldKey, selectedValue);
        }
      }
    };

    return renderMultiRadio(
      title,
      description,
      items,
      selected,
      handleSelectionChange,
      false
    );
  };

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

      {renderRadioField(
        USER_FILTER_FIELDS.SLEEP_LEVEL.key,
        USER_FILTER_FIELDS.SLEEP_LEVEL.title,
        USER_FILTER_FIELDS.SLEEP_LEVEL.options
      )}

      {renderToggleField(
        USER_FILTER_FIELDS.PET.key,
        USER_FILTER_FIELDS.PET.title
      )}

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
      contentPadding={false}
    >
      <UserFilterContent />
    </BottomSheet>
  );
}
