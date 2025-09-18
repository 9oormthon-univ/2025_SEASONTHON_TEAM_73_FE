import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { FormLabel } from "./FormLabel";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  errorMessage?: string;
  textContentType?: any;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  errorMessage,
  textContentType,
}) => {
  return (
    <View style={styles.container}>
      <FormLabel text={label} />
      <TextInput
        style={[styles.input, errorMessage ? styles.inputError : null]}
        placeholder={placeholder}
        placeholderTextColor="#9D9D9F"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    position: "relative",
    height: 69,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray[40],
    backgroundColor: COLORS.white,
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
    lineHeight: 18,
    color: COLORS.black,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -6,
  },
});
