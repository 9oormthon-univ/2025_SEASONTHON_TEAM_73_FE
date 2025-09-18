import { Button } from "@/shared/components";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EmptyRecommendUsersStateProps {
  isRoom: boolean;
}

export function EmptyRecommendUsersState({
  isRoom,
}: EmptyRecommendUsersStateProps) {
  return (
    <View style={styles.emptyRecommendContainer}>
      <Ionicons name="people-outline" size={48} color={COLORS.gray[30]} />
      <Text style={styles.emptyStateTitle}>
        아직 추천 {isRoom ? "Joiner" : "Sharer"}가 없어요
      </Text>
      <Text style={styles.emptyStateDescription}>
        성향조사를 완료하면 맞춤 추천을 받을 수 있어요
      </Text>
      <Button
        size="md"
        text="사용자 둘러보기"
        onPress={() => router.push("/user-search")}
      />
    </View>
  );
}

export function EmptyFavoriteUsersState() {
  return (
    <View style={styles.emptyStateContainer}>
      <Ionicons name="heart-outline" size={48} color={COLORS.gray[30]} />
      <Text style={styles.emptyStateTitle}>아직 찜한 사용자가 없어요</Text>
      <Text style={styles.emptyStateDescription}>
        마음에 드는 룸메이트를 찾아서 찜해보세요
      </Text>
      <Button
        size="md"
        text="사용자 둘러보기"
        onPress={() => router.push("/user-search")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.normal,
  },
  emptyRecommendContainer: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.normal,
  },
  emptyStateTitle: {
    fontSize: FONT_SIZE.b1,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  emptyStateDescription: {
    fontSize: FONT_SIZE.c1,
    lineHeight: 18,
    fontFamily: FONTS.regular,
    color: COLORS.gray[50],
    textAlign: "center",
    marginBottom: SPACING.md,
  },
});
