import React from "react";
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { buttonStyles, sizeStyles, textSizeStyles, variantStyles } from "./Button.styles";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  textSize?: keyof typeof textSizeStyles;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = "primary",
  size = "md",
  textSize = size,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        buttonStyles.base,
        sizeStyles[size],
        variantStyles[variant],
        disabled && buttonStyles.disabled,
        fullWidth && { width: "100%" },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >

      <Text
        style={[
          buttonStyles.textBase,
          textSizeStyles[textSize],
          disabled && buttonStyles.disabledText,
          textStyle,
        ]}
      >
        {text}
      </Text>

    </TouchableOpacity>
  );
};
