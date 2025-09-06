import { Button } from "@/shared/components";
import { GENDER, Gender } from "@/shared/constants";
import { COLORS, FONTS, FONT_SIZE, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { memo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ROOM_TYPE } from "../constants";
import { useDefaultFilter } from "../contexts";

const DepositFilterButton = memo(
  ({
    minDeposit,
    maxDeposit,
    applied,
    onReset,
  }: {
    minDeposit: number;
    maxDeposit: number;
    applied: boolean;
    onReset: (e?: any) => void;
  }) => {
    const handlePress = (event: any) => {
      if (applied) {
        const { locationX } = event.nativeEvent;
        const buttonWidth = event.currentTarget.clientWidth || 200; // fallback width
        const resetButtonArea = 30; // 리셋 버튼 영역 (오른쪽 30px)

        if (locationX > buttonWidth - resetButtonArea) {
          // 리셋 버튼 영역 클릭
          onReset();
        } else {
          // 메인 버튼 영역 클릭
          router.push("/filter");
        }
      } else {
        router.push("/filter");
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.customButtonText,
            applied
              ? styles.customButtonTextActive
              : styles.customButtonTextInactive,
          ]}
        >
          {applied ? `${minDeposit}만원~${maxDeposit}만원` : "보증금"}
        </Text>
        {applied ? (
          <Ionicons
            name="close-circle"
            size={18}
            color={COLORS.primary[90]}
            style={styles.resetIcon}
          />
        ) : (
          <Ionicons
            name="chevron-down"
            style={styles.filterButtonIcon}
            size={18}
            color={COLORS.gray[40]}
          />
        )}
      </TouchableOpacity>
    );
  }
);

const RentFilterButton = memo(
  ({
    minMonthlyCost,
    maxMonthlyCost,
    applied,
    onReset,
  }: {
    minMonthlyCost: number;
    maxMonthlyCost: number;
    applied: boolean;
    onReset: (e?: any) => void;
  }) => {
    const handlePress = (event: any) => {
      if (applied) {
        const { locationX } = event.nativeEvent;
        const buttonWidth = event.currentTarget.clientWidth || 200;
        const resetButtonArea = 30;

        if (locationX > buttonWidth - resetButtonArea) {
          onReset();
        } else {
          router.push("/filter");
        }
      } else {
        router.push("/filter");
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.customButtonText,
            applied
              ? styles.customButtonTextActive
              : styles.customButtonTextInactive,
          ]}
        >
          {applied ? `${minMonthlyCost}만원~${maxMonthlyCost}만원` : "월세"}
        </Text>
        {applied ? (
          <Ionicons
            name="close-circle"
            size={18}
            color={COLORS.primary[90]}
            style={styles.resetIcon}
          />
        ) : (
          <Ionicons
            name="chevron-down"
            style={styles.filterButtonIcon}
            size={18}
            color={COLORS.gray[40]}
          />
        )}
      </TouchableOpacity>
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
  ({
    roomTypes,
    onReset,
  }: {
    roomTypes: string[] | null;
    onReset: (e?: any) => void;
  }) => {
    const applied = roomTypes && roomTypes.length > 0 ? true : false;
    const getDisplayText = () => {
      if (!roomTypes || roomTypes.length === 0) {
        return "방 종류";
      }

      if (roomTypes.length === 1) {
        return ROOM_TYPE[roomTypes[0] as keyof typeof ROOM_TYPE];
      }

      const additionalCount = roomTypes.length - 1;
      return `${
        ROOM_TYPE[roomTypes[0] as keyof typeof ROOM_TYPE]
      } 외 ${additionalCount}개`;
    };

    const handlePress = (event: any) => {
      if (applied) {
        const { locationX } = event.nativeEvent;
        const buttonWidth = event.currentTarget.clientWidth || 200;
        const resetButtonArea = 30;

        if (locationX > buttonWidth - resetButtonArea) {
          onReset();
        } else {
          router.push("/filter");
        }
      } else {
        router.push("/filter");
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.customButtonText,
            applied
              ? styles.customButtonTextActive
              : styles.customButtonTextInactive,
          ]}
        >
          {getDisplayText()}
        </Text>
        {applied ? (
          <Ionicons
            name="close-circle"
            size={18}
            color={COLORS.primary[90]}
            style={styles.resetIcon}
          />
        ) : (
          <Ionicons
            name="chevron-down"
            style={styles.filterButtonIcon}
            size={18}
            color={COLORS.gray[40]}
          />
        )}
      </TouchableOpacity>
    );
  }
);

const GenderFilterButton = memo(
  ({
    preferredGender,
    onReset,
  }: {
    preferredGender: Gender[];
    onReset: (e?: any) => void;
  }) => {
    const applied = preferredGender.length > 0;
    const buttonText =
      preferredGender.length === 1
        ? `${GENDER[preferredGender[0]]}`
        : preferredGender.length === 2
        ? `${GENDER[preferredGender[0]]}, ${GENDER[preferredGender[1]]}`
        : "성별";

    const handlePress = (event: any) => {
      if (applied) {
        const { locationX } = event.nativeEvent;
        const buttonWidth = event.currentTarget.clientWidth || 200;
        const resetButtonArea = 30;

        if (locationX > buttonWidth - resetButtonArea) {
          onReset();
        } else {
          router.push("/filter");
        }
      } else {
        router.push("/filter");
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.customButtonText,
            applied
              ? styles.customButtonTextActive
              : styles.customButtonTextInactive,
          ]}
        >
          {buttonText}
        </Text>
        {applied ? (
          <Ionicons
            name="close-circle"
            size={18}
            color={COLORS.primary[90]}
            style={styles.resetIcon}
          />
        ) : (
          <Ionicons
            name="chevron-down"
            style={styles.filterButtonIcon}
            size={18}
            color={COLORS.gray[40]}
          />
        )}
      </TouchableOpacity>
    );
  }
);

DepositFilterButton.displayName = "DepositFilterButton";
RentFilterButton.displayName = "RentFilterButton";
RegionFilterButton.displayName = "RegionFilterButton";
RoomTypeFilterButton.displayName = "RoomTypeFilterButton";
GenderFilterButton.displayName = "GenderFilterButton";

export default function RoomSearchFilter() {
  const {
    applied,
    minDeposit,
    maxDeposit,
    minMonthlyCost,
    maxMonthlyCost,
    roomTypes,
    preferredGender,
    resetDepositRange,
    resetRentRange,
    resetRoomTypes,
    resetGender,
  } = useDefaultFilter();

  return (
    <ScrollView
      contentContainerStyle={styles.filterContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterScrollView}
    >
      <DepositFilterButton
        minDeposit={minDeposit}
        maxDeposit={maxDeposit}
        applied={applied}
        onReset={resetDepositRange}
      />
      <RentFilterButton
        minMonthlyCost={minMonthlyCost}
        maxMonthlyCost={maxMonthlyCost}
        applied={applied}
        onReset={resetRentRange}
      />
      <RegionFilterButton />
      <RoomTypeFilterButton roomTypes={roomTypes} onReset={resetRoomTypes} />
      <GenderFilterButton
        preferredGender={preferredGender}
        onReset={resetGender}
      />
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
  customButton: {
    paddingHorizontal: 12,
    paddingVertical: SPACING.xxs,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    position: "relative",
  },
  customButtonInactive: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[40],
  },
  customButtonActive: {
    backgroundColor: COLORS.primary[10],
    borderColor: COLORS.primary[90],
    borderWidth: 1,
  },
  customButtonText: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZE.c1,
    lineHeight: 18,
    includeFontPadding: false,
  },
  customButtonTextInactive: {
    color: COLORS.black,
  },
  customButtonTextActive: {
    color: COLORS.primary[90],
  },
  resetIcon: {
    marginTop: 2,
  },
});
