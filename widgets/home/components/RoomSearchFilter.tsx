import { COLORS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDefaultFilter } from "../contexts";

export default function RoomSearchFilter() {
  const {
    minDeposit,
    maxDeposit,
    minMonthlyCost,
    maxMonthlyCost,
    roomTypes,
    preferredGender,
    dongs,
  } = useDefaultFilter();

  const applied =
    minDeposit !== 0 ||
    maxDeposit !== 100000000 ||
    minMonthlyCost !== 0 ||
    maxMonthlyCost !== 1000000 ||
    roomTypes.length > 0 ||
    preferredGender !== null ||
    dongs.length > 0;

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[
          styles.customButton,
          applied ? styles.customButtonActive : styles.customButtonInactive,
        ]}
        onPress={() => router.push("/filter")}
        activeOpacity={0.8}
      >
        <Ionicons
          name="filter"
          size={20}
          color={applied ? COLORS.primary[90] : COLORS.gray[40]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: SPACING.xs,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.normal,
    paddingTop: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
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
