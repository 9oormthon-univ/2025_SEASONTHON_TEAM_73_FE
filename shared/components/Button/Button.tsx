import React, { ReactNode } from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import {
  buttonStyles,
  sizeStyles,
  textSizeStyles,
  variantStyles,
} from "./Button.styles";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  textSize?: keyof typeof textSizeStyles;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = "primary",
  size = "md",
  textSize = size,
  disabled = false,
  icon,
  style,
  fullWidth = false,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onPress?.();
    }
  };

  return (
    <TouchableOpacity
      style={[
        buttonStyles.base,
        sizeStyles[size],
        variantStyles[variant],
        disabled && buttonStyles.disabled,
        fullWidth && { width: "100%" },
        style,
        icon ? { flexDirection: "row", gap: 8 } : {},
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          buttonStyles.textBase,
          textSizeStyles[textSize ?? size],
          { color: variantStyles[variant].color },
        ]}
      >
        {text}
      </Text>
      {icon && icon}
    </TouchableOpacity>
  );
};
