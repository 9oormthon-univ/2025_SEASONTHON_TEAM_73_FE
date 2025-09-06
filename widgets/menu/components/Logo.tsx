import { COLORS } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ROUTES } from "../constants";

const Logo: React.FC = () => {
  return (
    <TouchableOpacity
      style={styles.logoContainer}
      onPress={() => router.push(ROUTES.C as Href)}
    >
      <Ionicons name="add" size={30} color={COLORS.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary[90],
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 1000,
  },
});

export default Logo;
