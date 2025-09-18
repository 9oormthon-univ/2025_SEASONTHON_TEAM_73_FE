import { COLORS, FONTS, RADIUS, SPACING } from "@/shared/styles";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ActionCardProps {
  image: any;
  title: string;
  onPress: () => void;
}

export function ActionCard({ image, title, onPress }: ActionCardProps) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <Image source={image} style={styles.actionCardImage} />
      <Text style={styles.actionCardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionCard: {
    flex: 1,
    borderColor: COLORS.gray[40],
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
  },
  actionCardImage: {
    width: 81,
    height: 70,
  },
  actionCardText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
});
