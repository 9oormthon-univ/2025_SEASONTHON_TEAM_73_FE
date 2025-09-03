import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: SPACING.xxs,
    borderRadius: 20,
  },
  md: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    minHeight: 40,
    borderRadius: 100,
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
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[40],
    color: COLORS.black,
  },
  outlineActive: {
    backgroundColor: COLORS.primary[10],
    borderColor: COLORS.primary[90],
    color: COLORS.primary[90],
    borderWidth: 1,
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
    fontSize: FONT_SIZE.c1,
    lineHeight: 18,
    includeFontPadding: false,
  },
  textMd: {
    fontSize: FONT_SIZE.b2,
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
  outline: styles.outline,
  outlineActive: styles.outlineActive,
} as const;

export const textSizeStyles = {
  sm: styles.textSm,
  md: styles.textMd,
  lg: styles.textLg,
} as const;
