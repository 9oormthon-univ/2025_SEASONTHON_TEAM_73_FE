import { FONTS, SPACING } from "@/shared/styles";
import { getRoomText } from "@/widgets/home/constants";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActionCard } from "./ActionCard";

interface WelcomeSectionProps {
  isRoom: boolean;
}

export function WelcomeSection({ isRoom }: WelcomeSectionProps) {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>{getRoomText(isRoom)}</Text>
      <View style={styles.actionCards}>
        <ActionCard
          onPress={() => router.push("/rooms")}
          image={require("@/assets/images/home-home.png")}
          title={`Sharer의${"\n"}집 보러가기`}
        />
        <ActionCard
          onPress={() => router.push("/user-search")}
          image={require("@/assets/images/home-people.png")}
          title={`Joiner의${"\n"}프로필 보러가기`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    paddingHorizontal: SPACING.normal,
    paddingTop: SPACING.xl,
  },
  welcomeTitle: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: FONTS.semiBold,
    color: "#17171b",
    textAlign: "left",
    marginBottom: SPACING.lg,
  },
  actionCards: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
});
