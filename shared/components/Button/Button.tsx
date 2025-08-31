import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import {
  buttonStyles,
  sizeStyles,
  textSizeStyles,
  variantStyles,
} from "./Button.styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  textSize?: keyof typeof textSizeStyles;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  icon?: string | number;
  iconPosition?: "left" | "right";
  iconSize?: number;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  textSize = size,
  disabled = false,
  style,
  icon,
  iconPosition = "left",
  iconSize,
}: ButtonProps) {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  const buttonStyle = [
    buttonStyles.base,
    sizeStyles[size],
    variantStyles[variant],
    disabled && buttonStyles.disabled,
    style,
  ];

  const textStyle = [
    buttonStyles.textBase,
    { color: variantStyles[variant].color },
    textSizeStyles[textSize ?? size],
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
