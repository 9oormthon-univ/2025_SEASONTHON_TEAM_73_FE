import { COLORS, FONTS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EmptyStatusProps {
  title: string;
  description: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

export const EmptyStatus: React.FC<EmptyStatusProps> = ({
  title,
  description,
  icon = "help-circle-outline",
  iconSize = 48,
  iconColor = COLORS.gray[30],
}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.gray[70],
    textAlign: "center",
    marginBottom: SPACING.xs,
    fontFamily: FONTS.medium,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray[50],
    textAlign: "center",
    fontFamily: FONTS.regular,
  },
});
