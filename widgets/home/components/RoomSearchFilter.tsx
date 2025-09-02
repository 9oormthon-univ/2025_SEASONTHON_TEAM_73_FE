import { Button } from "@/shared/components";
import { COLORS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function RoomSearchFilter() {
  const onFilterPress = () => {
    router.push("/filter");
  };

  const onRegionPress = () => {
    router.push("/region");
  };

  const filterButtons = useMemo(
    () => [
      { text: "보증금", onPress: onFilterPress },
      { text: "월세", onPress: onFilterPress },
      { text: "지역", onPress: onRegionPress },
      { text: "방 유형", onPress: onFilterPress },
      { text: "성별", onPress: onFilterPress },
    ],
    []
  );

  return (
    <ScrollView
      contentContainerStyle={styles.filterContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterScrollView}
    >
      {filterButtons.map((button, index) => (
        <Button
          key={index}
          text={button.text}
          size="sm"
          variant="outline"
          onPress={button.onPress}
          icon={
            <Ionicons
              name="chevron-down"
              style={styles.filterButtonIcon}
              size={18}
              color={COLORS.gray[40]}
            />
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterScrollView: {
    maxHeight: 48,
    boxShadow: `0 2px 4px 0 rgba(0, 0, 0, 0.05)`,
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
