import { Button } from "@/shared/components";
import { COLORS, SPACING } from "@/shared/styles";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
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
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["84%"], []);

  const { defaultFilter, updateFilter } = useUserFilter();

  const [localFilter, setLocalFilter] = useState<UserDefaultFilter | null>(
    defaultFilter
  );

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
      setLocalFilter(defaultFilter);
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isVisible, defaultFilter]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const handleApply = () => {
    if (localFilter) {
      updateFilter(localFilter);
    }
    onClose();
  };

  const handleFilterChange = (key: keyof UserDefaultFilter, value: any) => {
    setLocalFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const FilterContent = () => (
    <View style={styles.content}>
      {/* 흡연 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="흡연"
            variant={localFilter?.smoking ? "primary" : "outline"}
            onPress={() => handleFilterChange("smoking", !localFilter?.smoking)}
          />
        </View>
      </View>

      {/* 음주 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="음주 (주 1-3회)"
            variant={
              localFilter?.alcoholCount === "ONE_TO_THREE"
                ? "primary"
                : "outline"
            }
            onPress={() =>
              handleFilterChange(
                "alcoholCount",
                localFilter?.alcoholCount === "ONE_TO_THREE"
                  ? undefined
                  : "ONE_TO_THREE"
              )
            }
          />
        </View>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="음주 (주 4회 이상)"
            variant={
              localFilter?.alcoholCount === "MORE_THAN_FOUR"
                ? "primary"
                : "outline"
            }
            onPress={() =>
              handleFilterChange(
                "alcoholCount",
                localFilter?.alcoholCount === "MORE_THAN_FOUR"
                  ? undefined
                  : "MORE_THAN_FOUR"
              )
            }
          />
        </View>
      </View>

      {/* 수면 패턴 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="수면 패턴 (낮음)"
            variant={localFilter?.sleepLevel === "LOW" ? "primary" : "outline"}
            onPress={() =>
              handleFilterChange(
                "sleepLevel",
                localFilter?.sleepLevel === "LOW" ? undefined : "LOW"
              )
            }
          />
        </View>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="수면 패턴 (보통)"
            variant={
              localFilter?.sleepLevel === "MEDIUM" ? "primary" : "outline"
            }
            onPress={() =>
              handleFilterChange(
                "sleepLevel",
                localFilter?.sleepLevel === "MEDIUM" ? undefined : "MEDIUM"
              )
            }
          />
        </View>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="수면 패턴 (높음)"
            variant={localFilter?.sleepLevel === "HIGH" ? "primary" : "outline"}
            onPress={() =>
              handleFilterChange(
                "sleepLevel",
                localFilter?.sleepLevel === "HIGH" ? undefined : "HIGH"
              )
            }
          />
        </View>
      </View>

      {/* 반려동물 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="반려동물 있음"
            variant={
              localFilter?.pet && localFilter.pet.length > 0
                ? "primary"
                : "outline"
            }
            onPress={() =>
              handleFilterChange(
                "pet",
                localFilter?.pet && localFilter.pet.length > 0
                  ? []
                  : ["dog", "cat"]
              )
            }
          />
        </View>
      </View>

      {/* 청결도 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="청결도 (낮음)"
            variant={
              localFilter?.tidinessLevel === "LOW" ? "primary" : "outline"
            }
            onPress={() =>
              handleFilterChange(
                "tidinessLevel",
                localFilter?.tidinessLevel === "LOW" ? undefined : "LOW"
              )
            }
          />
        </View>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="청결도 (보통)"
            variant={
              localFilter?.tidinessLevel === "MEDIUM" ? "primary" : "outline"
            }
            onPress={() =>
              handleFilterChange(
                "tidinessLevel",
                localFilter?.tidinessLevel === "MEDIUM" ? undefined : "MEDIUM"
              )
            }
          />
        </View>
        <View style={styles.sectionHeader}>
          <Button
            size="sm"
            text="청결도 (높음)"
            variant={
              localFilter?.tidinessLevel === "HIGH" ? "primary" : "outline"
            }
            onPress={() =>
              handleFilterChange(
                "tidinessLevel",
                localFilter?.tidinessLevel === "HIGH" ? undefined : "HIGH"
              )
            }
          />
        </View>
      </View>
    </View>
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      onDismiss={onClose}
    >
      <BottomSheetView style={styles.contentContainer}>
        <FilterContent />

        <View style={styles.buttonWrapper}>
          <Button size="lg" text="적용" onPress={handleApply} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handleIndicator: {
    backgroundColor: COLORS.gray[30],
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.normal,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    marginBottom: SPACING.sm,
  },
  buttonWrapper: {
    paddingVertical: SPACING.md,
  },
});
