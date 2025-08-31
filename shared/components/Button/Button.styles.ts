import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
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
    paddingVertical: SPACING.xs,
    width: "100%",
    minHeight: 40,
  },
  primary: {
    backgroundColor: COLORS.primary[90],
    borderWidth: 0,
    color: COLORS.white,
  },
  disabled: {
    color: COLORS.gray[30],
    backgroundColor: COLORS.gray[10],
    borderWidth: 0,
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
  textLg: {
    fontSize: FONT_SIZE.b2,
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
  disabled: styles.disabled,
} as const;

export const textSizeStyles = {
  sm: styles.textSm,
  md: styles.textMd,
  lg: styles.textLg,
} as const;
