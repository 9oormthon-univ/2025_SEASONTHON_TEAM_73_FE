import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DescriptionSectionProps {
  title: string;
  subtitle: string;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: SPACING.normal,
    paddingVertical: 20,
  },
  title: {
    color: COLORS.black,
    fontSize: FONT_SIZE.b1,
    fontFamily: FONTS.regular,
    includeFontPadding: false,
  },
  subtitle: {
    color: COLORS.gray[50],
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
    includeFontPadding: false,
  },
});
