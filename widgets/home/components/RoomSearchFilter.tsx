import { Button } from "@/shared/components";
import { SPACING } from "@/shared/styles";
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
      contentContainerStyle={{
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
    >
      {filterButtons.map((button, index) => (
        <Button
          key={index}
          text={button.text}
          size="sm"
          variant="outline"
          onPress={button.onPress}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: SPACING.normal,
    maxHeight: 48,
    boxShadow: `0 2px 4px 0 rgba(0, 0, 0, 0.05)`,
  },
});
