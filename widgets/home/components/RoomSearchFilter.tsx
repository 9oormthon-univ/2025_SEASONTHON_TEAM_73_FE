import { COLORS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { useDefaultFilter } from "../contexts";
import FilterBottomSheet from "./FilterBottomSheet";

interface RoomSearchFilterProps {
  scrollY?: Animated.Value;
  isHeaderVisible?: boolean;
}

export default function RoomSearchFilter({
  scrollY,
  isHeaderVisible = true,
}: RoomSearchFilterProps) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const { roomTypes, preferredGender, dongs, userFilter } = useDefaultFilter();

  const applied =
    roomTypes.length > 0 ||
    preferredGender.length > 0 ||
    dongs.length > 0 ||
    (userFilter && Object.keys(userFilter).length > 0);

  const handleFilterPress = () => {
    setIsFilterVisible(true);
  };

  const handleFilterClose = () => {
    setIsFilterVisible(false);
  };

  const animatedStyle = scrollY
    ? {
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [0, 80],
              outputRange: [60, 0],
              extrapolate: "clamp",
            }),
          },
        ],
      }
    : { top: 60 };

  return (
    <>
      <Animated.View style={[styles.filterContainer, animatedStyle]}>
        <TouchableOpacity
          style={[
            styles.customButton,
            applied ? styles.customButtonActive : styles.customButtonInactive,
          ]}
          onPress={handleFilterPress}
          activeOpacity={0.8}
        >
          <Ionicons
            name="filter"
            size={20}
            color={applied ? COLORS.primary[90] : COLORS.gray[40]}
          />
        </TouchableOpacity>
      </Animated.View>

      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={handleFilterClose}
      />
    </>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: SPACING.xs,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.normal,
    paddingTop: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
    backgroundColor: "#fff",
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
  resetIcon: {
    marginTop: 2,
  },
});
