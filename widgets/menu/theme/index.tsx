import React from "react";
import {
  DimensionValue,
  Text as RNText,
  TextProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

interface BoxProps extends ViewProps {
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  width?: DimensionValue;
  height?: DimensionValue;
  position?: "absolute" | "relative";
  backgroundColor?: string;
  gap?: number;
  children?: React.ReactNode;
}

interface CustomTextProps extends TextProps {
  variant?: "tabRoute" | "default";
  children?: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({
  flexDirection,
  justifyContent,
  alignItems,
  width,
  height,
  position,
  backgroundColor,
  gap,
  style,
  children,
  ...props
}) => {
  const boxStyle: ViewStyle = {
    flexDirection,
    justifyContent,
    alignItems,
    width,
    height,
    position,
    backgroundColor,
    gap,
    ...((style as ViewStyle) || {}),
  };

  return (
    <View style={boxStyle} {...props}>
      {children}
    </View>
  );
};

export const Text: React.FC<CustomTextProps> = ({
  variant,
  children,
  style,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "tabRoute":
        return {
          fontSize: 12,
          color: "#333",
          textAlign: "center" as const,
          marginTop: 4,
        };
      default:
        return {};
    }
  };

  const textStyle = [getVariantStyle(), style];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};
