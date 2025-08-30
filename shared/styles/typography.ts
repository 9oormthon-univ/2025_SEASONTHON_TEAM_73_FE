import { Platform } from "react-native";

export const FONTS = {
  regular: Platform.select({
    ios: "SUIT-Regular",
    android: "SUIT-Regular",
    default: "SUIT-Regular",
  }),
  medium: Platform.select({
    ios: "SUIT-Medium",
    android: "SUIT-Medium",
    default: "SUIT-Medium",
  }),
  semiBold: Platform.select({
    ios: "SUIT-SemiBold",
    android: "SUIT-SemiBold",
    default: "SUIT-SemiBold",
  }),
  bold: Platform.select({
    ios: "SUIT-Bold",
    android: "SUIT-Bold",
    default: "SUIT-Bold",
  }),
  light: Platform.select({
    ios: "SUIT-Light",
    android: "SUIT-Light",
    default: "SUIT-Light",
  }),
  thin: Platform.select({
    ios: "SUIT-Thin",
    android: "SUIT-Thin",
    default: "SUIT-Thin",
  }),
  extraLight: Platform.select({
    ios: "SUIT-ExtraLight",
    android: "SUIT-ExtraLight",
    default: "SUIT-ExtraLight",
  }),
  extraBold: Platform.select({
    ios: "SUIT-ExtraBold",
    android: "SUIT-ExtraBold",
    default: "SUIT-ExtraBold",
  }),
  heavy: Platform.select({
    ios: "SUIT-Heavy",
    android: "SUIT-Heavy",
    default: "SUIT-Heavy",
  }),
};

export const FONT_SIZE = {
  h1: 28,
  h2: 24,
  b1: 16,
  b2: 14,
  c1: 12,
};

export const TEXT_STYLE = {
  title: {
    fontSize: FONT_SIZE.h1,
    fontFamily: FONTS.semiBold,
    includeFontPadding: false,
  },
};
