import { UploadIcon } from "@/shared/components/icon/UploadIcon";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FileSelectorProps {
  placeholder: string;
  onPress?: () => void;
}

export const FileSelector: React.FC<FileSelectorProps> = ({
  placeholder,
  onPress,
}) => {
  const isDisabled = !onPress;

  return (
    <TouchableOpacity
      style={[styles.container, isDisabled && styles.disabledContainer]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      <View style={styles.textContainer}>
        <Text
          style={[styles.placeholderText, isDisabled && styles.disabledText]}
        >
          {placeholder}
        </Text>
      </View>
      <UploadIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9D9D9F",
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#FCFCFC",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
  },
  placeholderText: {
    color: "#9D9D9F",
    fontSize: 14,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  disabledText: {
    color: "#B0B0B0",
  },
});
