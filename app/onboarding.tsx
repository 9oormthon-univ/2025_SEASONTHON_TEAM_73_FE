import { Button } from "@/shared/components/Button/Button";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/signUp" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>
          다양한 조건을 바탕으로{"\n"}
          룸메이트를 찾아요
        </Text>
      </View>
      <Image
        source={require("@/assets/images/home-home.png")}
        style={{ width: 268, height: 300 }}
      />
      <View style={styles.buttonContainer}>
        <Button text="로그인" onPress={handleLogin} size="lg" />
        <Button text="회원가입" onPress={handleSignUp} size="lg" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xl,
  },
  headerSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: FONT_SIZE.h2,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    color: COLORS.black,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.normal,
    width: "100%",
    gap: SPACING.xs,
  },
});
