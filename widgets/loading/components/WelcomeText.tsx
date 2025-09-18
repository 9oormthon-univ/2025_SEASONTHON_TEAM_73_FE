import { FONT_SIZE } from "@/shared/styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WelcomeText() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>마음에 꼭 맞는 룸메이트를</Text>
        <Text style={styles.text}>찾을 준비가 되었나요?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    color: "#6F6F6F",
    fontSize: FONT_SIZE.b1,
    lineHeight: 24,
    letterSpacing: -0.4,
    fontFamily: "Noto Sans KR",
    fontWeight: "400",
    textAlign: "center",
  },
});
