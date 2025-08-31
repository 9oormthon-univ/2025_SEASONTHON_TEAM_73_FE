import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
import {
  type DimensionValue,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  title?: string;
  description?: string;
  descriptionDirection?: "left" | "right";
  required?: boolean;
  width?: DimensionValue;
}

export default function Input({
  title,
  description,
  descriptionDirection = "left",
  required,
  width,
  ...rest
}: InputProps) {
  const styles = StyleSheet.create({
    wrapper: { gap: 10, width: width || "100%" },
    title: { fontSize: FONT_SIZE.b2, fontFamily: FONTS.regular },
    required: { color: COLORS.error },
    description: {
      fontSize: FONT_SIZE.c1,
      fontFamily: FONTS.regular,
      textAlign: descriptionDirection,
    },
    input: {
      paddingVertical: 10,
      paddingHorizontal: SPACING.md,
      borderWidth: 1,
      borderColor: COLORS.gray[40],
      borderRadius: RADIUS.xs,
      fontSize: FONT_SIZE.b2,
      fontFamily: FONTS.regular,
    },
  });

  return (
    <View style={styles.wrapper}>
      {title && (
        <Text style={styles.title}>
          {title} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.gray[40]}
        {...rest}
      />
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

function Title({ ...rest }: TextInputProps) {
  const styles = StyleSheet.create({
    input: {
      fontSize: FONT_SIZE.h2,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray[40],
    },
  });
  return (
    <TextInput
      style={styles.input}
      placeholder="제목을 입력하세요."
      placeholderTextColor={COLORS.gray[40]}
      {...rest}
    />
  );
}

Input.Title = Title;
