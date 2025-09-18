import { COLORS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export function Header() {
  return (
    <View style={styles.header}>
      <Image source={require("@/assets/icons/logo.png")} style={styles.logo} />
      <TouchableOpacity onPress={() => router.push("/post-create")}>
        <Ionicons name="add-outline" size={30} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
  },
  logo: {
    width: 44,
    height: 30,
  },
});
