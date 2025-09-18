import { renderMultiRadio, renderToggle } from "@/shared/utils";
import { ScrollView } from "react-native";
import {
  getFilterDisplayValue,
  getRadioSelectedIndices,
  USER_FILTER_FIELDS,
} from "../constants/userFilter";
import { UserDefaultFilter } from "../types";

interface PreferenceTabProps {
  userFilter: UserDefaultFilter | null;
  onFilterChange: (key: string, value: any) => void;
}

export default function PreferenceTab({
  userFilter,
  onFilterChange,
}: PreferenceTabProps) {
  const renderToggleField = (
    fieldKey: keyof UserDefaultFilter,
    title: string
  ) => {
    const isOn =
      fieldKey === "smoking"
        ? userFilter?.smoking || false
        : !!(userFilter?.pet && userFilter.pet.length > 0);

    const handleToggle = (value: boolean) => {
      if (fieldKey === "smoking") {
        if (isOn && value) {
          onFilterChange(fieldKey, undefined);
        } else {
          onFilterChange(fieldKey, value);
        }
      } else if (fieldKey === "pet") {
        if (isOn && value) {
          onFilterChange(fieldKey, undefined);
        } else {
          onFilterChange(fieldKey, value ? ["강아지"] : undefined);
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
    const description = getFilterDisplayValue(userFilter, fieldKey);
    const items = options.map((option) => option.label);
    const selected = getRadioSelectedIndices(userFilter, fieldKey);

    const handleSelectionChange = (selected: number[]) => {
      if (selected.length === 0) {
        onFilterChange(fieldKey, undefined);
      } else {
        // 선택된 인덱스들을 ENUM 값으로 변환
        const selectedValues = selected
          .map((index) => options[index]?.value)
          .filter((value) => value !== undefined);

        onFilterChange(fieldKey, selectedValues);
      }
    };

    return renderMultiRadio(
      title,
      description,
      items,
      selected,
      handleSelectionChange,
      true
    );
  };

  return (
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
}
