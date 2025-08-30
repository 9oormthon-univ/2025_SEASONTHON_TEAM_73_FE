import { COLORS, FONTS, RADIUS, SPACING } from "@/shared/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  sm: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    minHeight: 32,
  },
  md: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minHeight: 44,
  },
  lg: {
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm,
    width: "100%",
    minHeight: 52,
  },
  primary: {
    backgroundColor: COLORS.primary[90],
    borderWidth: 0,
    color: COLORS.white,
  },
  textBase: {
    fontFamily: FONTS.medium,
    textAlign: "center",
  },
  textSm: {
    fontSize: 14,
    lineHeight: 20,
  },
  textMd: {
    fontSize: 16,
    lineHeight: 24,
  },
  textAuth: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: FONTS.semiBold,
  },
  textLg: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: FONTS.semiBold,
  },
});

export const buttonStyles = styles;

export const sizeStyles = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as const;

export const variantStyles = {
  primary: styles.primary,
} as const;

export const textSizeStyles = {
  sm: styles.textSm,
  md: styles.textMd,
  lg: styles.textLg,
} as const;
