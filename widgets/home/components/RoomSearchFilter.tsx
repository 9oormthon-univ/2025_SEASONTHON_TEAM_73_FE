import { Button } from "@/shared/components";
import { COLORS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GENDER, ROOM_TYPE } from "../constants";
import { useDefaultFilter } from "../contexts";
import type { PriceRange } from "../types";

const DepositFilterButton = memo(
  ({ deposit, applied }: { deposit: PriceRange; applied: boolean }) => {
    return (
      <Button
        text={applied ? `${deposit.min}만원~${deposit.max}만원` : "보증금"}
        size="sm"
        variant={applied ? "outlineActive" : "outline"}
        onPress={() => router.push("/filter")}
        icon={
          <Ionicons
            name="chevron-down"
            style={styles.filterButtonIcon}
            size={18}
            color={COLORS.gray[40]}
          />
        }
      />
    );
  }
);

const RentFilterButton = memo(
  ({ rent, applied }: { rent: PriceRange; applied: boolean }) => {
    return (
      <Button
        text={applied ? `${rent.min}만원~${rent.max}만원` : "월세"}
        size="sm"
        variant={applied ? "outlineActive" : "outline"}
        onPress={() => router.push("/filter")}
        icon={
          <Ionicons
            name="chevron-down"
            style={styles.filterButtonIcon}
            size={18}
            color={COLORS.gray[40]}
          />
        }
      />
    );
  }
);

/**
 * 나중에 백엔드 보고 타입 정의 및 기능 구현
 */
const RegionFilterButton = memo(() => (
  <Button
    text="지역"
    size="sm"
    variant="outline"
    onPress={() => router.push("/region")}
    icon={
      <Ionicons
        name="chevron-down"
        style={styles.filterButtonIcon}
        size={18}
        color={COLORS.gray[40]}
      />
    }
  />
));

const RoomTypeFilterButton = memo(
  ({ roomType }: { roomType: number[] | null }) => {
    const getDisplayText = () => {
      if (!roomType || roomType.length === 0) {
        return "방 종류";
      }

      if (roomType.length === 1) {
        return ROOM_TYPE[roomType[0]];
      }

      const additionalCount = roomType.length - 1;
      return `${ROOM_TYPE[roomType[0]]} 외 ${additionalCount}개`;
    };

    return (
      <Button
        text={getDisplayText()}
        size="sm"
        variant={roomType && roomType.length > 0 ? "outlineActive" : "outline"}
        onPress={() => router.push("/filter")}
        icon={
          <Ionicons
            name="chevron-down"
            style={styles.filterButtonIcon}
            size={18}
            color={COLORS.gray[40]}
          />
        }
      />
    );
  }
);

const GenderFilterButton = memo(({ gender }: { gender: number[] | null }) => {
  const buttonText =
    gender && gender.length === 1
      ? `${GENDER[gender[0]]}`
      : gender && gender.length === 2
      ? GENDER.join(", ")
      : "성별";
  return (
    <Button
      text={buttonText}
      size="sm"
      variant={gender && gender.length > 0 ? "outlineActive" : "outline"}
      onPress={() => router.push("/filter")}
      icon={
        <Ionicons
          name="chevron-down"
          style={styles.filterButtonIcon}
          size={18}
          color={COLORS.gray[40]}
        />
      }
    />
  );
});

DepositFilterButton.displayName = "DepositFilterButton";
RentFilterButton.displayName = "RentFilterButton";
RegionFilterButton.displayName = "RegionFilterButton";
RoomTypeFilterButton.displayName = "RoomTypeFilterButton";
GenderFilterButton.displayName = "GenderFilterButton";

export default function RoomSearchFilter() {
  const { applied, deposit, rent, roomType, gender } = useDefaultFilter();

  return (
    <ScrollView
      contentContainerStyle={styles.filterContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterScrollView}
    >
      <DepositFilterButton deposit={deposit} applied={applied} />
      <RentFilterButton rent={rent} applied={applied} />
      <RegionFilterButton />
      <RoomTypeFilterButton roomType={roomType} />
      <GenderFilterButton gender={gender} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterScrollView: {
    maxHeight: 48,
    boxShadow: `0 2px 4px 0 rgba(0, 0, 0, 0.05)`,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.normal,
  },
  filterButtonIcon: {
    marginTop: 2,
  },
});
