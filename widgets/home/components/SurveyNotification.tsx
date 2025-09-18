import { COLORS, FONTS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function SurveyNotification() {
  return (
    <View style={styles.surveyContainer}>
      <Text style={styles.surveyTitle}>아직 성향조사를 하지 않으셨네요.</Text>
      <View style={styles.surveyContent}>
        <Text style={styles.surveyDescription}>
          성향조사를 완료해야 룸메이트 매칭을 할 수 있어요.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/signUp/lifeRhythm")}
          style={styles.surveyButton}
        >
          <Text style={styles.surveyButtonText}>성향조사 바로가기</Text>
          <Ionicons name="arrow-forward" size={12} color={COLORS.primary[90]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  surveyContainer: {
    paddingVertical: 10,
    paddingHorizontal: SPACING.normal,
    backgroundColor: COLORS.primary[10],
    marginBottom: 20,
  },
  surveyTitle: {
    width: "100%",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: "left",
  },
  surveyContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  surveyDescription: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "SUIT Variable",
    color: "#5b5b5e",
    textAlign: "left",
  },
  surveyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  surveyButtonText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary[90],
  },
});
