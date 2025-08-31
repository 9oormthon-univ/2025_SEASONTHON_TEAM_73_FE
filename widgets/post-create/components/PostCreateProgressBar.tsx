import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface PostCreateProgressBarProps {
  totalScreens: number;
  currentIndex: number;
  title: string;
}

export default function PostCreateProgressBar({
  totalScreens,
  currentIndex,
  title,
}: PostCreateProgressBarProps) {
  const { width } = Dimensions.get("screen");
  const totalItems = useMemo(
    () => Array.from({ length: totalScreens }),
    [totalScreens]
  );
  const styles = StyleSheet.create({
    wrapper: {
      width: "100%",
      paddingBottom: SPACING.normal,
    },
    progressContainer: { gap: SPACING.sm, flexDirection: "row" },
    progressSection: {
      width:
        (width - 2 * SPACING.normal - SPACING.sm * (totalScreens - 1)) /
        totalScreens,
      gap: SPACING.xs,
    },
    progressItem: {
      width: "100%",
      height: SPACING.xxs,
      backgroundColor: COLORS.gray[10],
      borderRadius: 10,
    },
    progressTitleContainer: {
      paddingHorizontal: SPACING.xs,
      alignItems: "center",
    },
    progressTitle: {
      backgroundColor: COLORS.primary[90],
      fontFamily: FONTS.bold,
      fontSize: FONT_SIZE.c1,
      color: COLORS.white,
      width: "100%",
      textAlign: "center",
      paddingVertical: 6,
      borderRadius: RADIUS.xs,
    },
    triangleUp: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderLeftWidth: 6,
      borderRightWidth: 6,
      borderBottomWidth: 10,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: COLORS.primary[90],
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.progressContainer}>
        {totalItems.map((_, index) => (
          <View key={index} style={styles.progressSection}>
            <View
              style={{
                ...styles.progressItem,
                backgroundColor:
                  index <= currentIndex ? COLORS.primary[90] : COLORS.gray[10],
              }}
            />
            {currentIndex === index && (
              <View style={styles.progressTitleContainer}>
                <View style={styles.triangleUp} />
                <Text style={styles.progressTitle}>{title}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
