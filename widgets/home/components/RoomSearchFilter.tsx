import { GENDER, Gender } from "@/shared/constants";
import { COLORS, FONTS, FONT_SIZE, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { memo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FILTER_DEFAULT, ROOM_TYPE } from "../constants";
import { useDefaultFilter } from "../contexts";

const DepositFilterButton = memo(
  ({
    minDeposit,
    maxDeposit,
    onReset,
  }: {
    minDeposit: number;
    maxDeposit: number;
    onReset: (e?: any) => void;
  }) => {
    const [buttonWidth, setButtonWidth] = useState(200);
    const applied =
      minDeposit !== FILTER_DEFAULT.minDeposit ||
      maxDeposit !== FILTER_DEFAULT.maxDeposit;

    const handlePress = (event: any) => {
      if (applied) {
        const { locationX } = event.nativeEvent;
        const resetButtonArea = 150;

        if (locationX > buttonWidth - resetButtonArea) {
          onReset();
        } else {
          router.push("/filter");
        }
      } else {
        router.push("/filter");
      }
    };

    const handleLayout = (event: any) => {
      const { width } = event.nativeEvent.layout;
      setButtonWidth(width);
    };

    return (
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={handlePress}
        onLayout={handleLayout}
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
    onReset,
  }: {
    minMonthlyCost: number;
    maxMonthlyCost: number;
    onReset: (e?: any) => void;
  }) => {
    const [buttonWidth, setButtonWidth] = useState(200);
    const applied =
      minMonthlyCost !== FILTER_DEFAULT.minMonthlyCost ||
      maxMonthlyCost !== FILTER_DEFAULT.maxMonthlyCost;

    const handlePress = (event: any) => {
      if (applied) {
        const { locationX } = event.nativeEvent;
        const resetButtonArea = 150;

        if (locationX > buttonWidth - resetButtonArea) {
          onReset();
        } else {
          router.push("/filter");
        }
      } else {
        router.push("/filter");
      }
    };

    const handleLayout = (event: any) => {
      const { width } = event.nativeEvent.layout;
      setButtonWidth(width);
    };

    return (
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={handlePress}
        onLayout={handleLayout}
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

const RegionFilterButton = memo(
  ({ dongs, onReset }: { dongs: string[]; onReset: (e?: any) => void }) => {
    const [buttonWidth, setButtonWidth] = useState(200);
    const applied = dongs && dongs.length > 0;

    const getDisplayText = () => {
      if (!dongs || dongs.length === 0) {
        return "지역";
      }

      if (dongs.length === 1) {
        return dongs[0];
      }

      const additionalCount = dongs.length - 1;
      return `${dongs[0]} 외 ${additionalCount}개`;
    };

    const handlePress = (event: any) => {
      if (applied) {
        const { locationX } = event.nativeEvent;
        const resetButtonArea = 150;

        if (locationX > buttonWidth - resetButtonArea) {
          onReset();
        } else {
          router.push("/region");
        }
      } else {
        router.push("/region");
      }
    };

    const handleLayout = (event: any) => {
      const { width } = event.nativeEvent.layout;
      setButtonWidth(width);
    };

    return (
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={handlePress}
        onLayout={handleLayout}
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

const RoomTypeFilterButton = memo(
  ({
    roomTypes,
    onReset,
  }: {
    roomTypes: string[] | null;
    onReset: (e?: any) => void;
  }) => {
    const [buttonWidth, setButtonWidth] = useState(200);
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
        const resetButtonArea = 150;

        if (locationX > buttonWidth - resetButtonArea) {
          onReset();
        } else {
          router.push("/filter");
        }
      } else {
        router.push("/filter");
      }
    };

    const handleLayout = (event: any) => {
      const { width } = event.nativeEvent.layout;
      setButtonWidth(width);
    };

    return (
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={handlePress}
        onLayout={handleLayout}
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
    const [buttonWidth, setButtonWidth] = useState(200);
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
        const resetButtonArea = 150;

        if (locationX > buttonWidth - resetButtonArea) {
          onReset();
        } else {
          router.push("/filter");
        }
      } else {
        router.push("/filter");
      }
    };

    const handleLayout = (event: any) => {
      const { width } = event.nativeEvent.layout;
      setButtonWidth(width);
    };

    return (
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={handlePress}
        onLayout={handleLayout}
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
    minDeposit,
    maxDeposit,
    minMonthlyCost,
    maxMonthlyCost,
    roomTypes,
    preferredGender,
    dongs,
    resetDepositRange,
    resetRentRange,
    resetRoomTypes,
    resetGender,
    resetDongs,
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
        onReset={resetDepositRange}
      />
      <RentFilterButton
        minMonthlyCost={minMonthlyCost}
        maxMonthlyCost={maxMonthlyCost}
        onReset={resetRentRange}
      />
      <RegionFilterButton dongs={dongs} onReset={resetDongs} />
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
