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
  error?: string;
}

export default function Input({
  title,
  description,
  descriptionDirection = "left",
  required,
  width,
  error,
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
      borderColor: error ? COLORS.error : COLORS.gray[40],
      borderRadius: RADIUS.xs,
      fontSize: FONT_SIZE.b2,
      fontFamily: FONTS.regular,
    },
    errorText: {
      fontSize: FONT_SIZE.c1,
      fontFamily: FONTS.regular,
      color: COLORS.error,
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
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function Title({ error, ...rest }: TextInputProps & { error?: string }) {
  const styles = StyleSheet.create({
    input: {
      fontSize: FONT_SIZE.h2,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: error ? COLORS.error : COLORS.gray[40],
    },
    errorText: {
      fontSize: FONT_SIZE.c1,
      fontFamily: FONTS.regular,
      color: COLORS.error,
      marginTop: 5,
    },
  });
  return (
    <View style={{ gap: 5 }}>
      <TextInput
        style={styles.input}
        placeholder="제목을 입력하세요."
        placeholderTextColor={COLORS.gray[40]}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

Input.Title = Title;
