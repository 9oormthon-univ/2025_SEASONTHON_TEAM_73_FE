import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import type { RecommendUser } from "@/widgets/home/api/submitRecommendUser";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RecommendUserItemProps {
  recommendUser: RecommendUser;
}

export function RecommendUserItem({ recommendUser }: RecommendUserItemProps) {
  const { user, matchScore, reason } = recommendUser;
  const { id, nickname, profileImageUrl, gender, age, smoking } = user;
  const smokingText = smoking ? "흡연" : "비흡연";

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/userDetail/${id}`);
      }}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.userInfo}>
        <Image
          style={styles.profileImage}
          source={
            profileImageUrl
              ? { uri: profileImageUrl }
              : require("@/assets/images/profile-default.png")
          }
        />
        <View style={styles.userDetails}>
          <View style={styles.nameContainer}>
            <Text style={styles.nickname}>{nickname}</Text>
            <View style={styles.matchScoreBadge}>
              <Text style={styles.matchScoreText}>{matchScore}%</Text>
            </View>
          </View>
          <Text style={styles.userInfo}>
            {gender} • {age}세 • {smokingText}
          </Text>
          <Text style={styles.reason} numberOfLines={2}>
            {reason}
          </Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray[40]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: SPACING.md,
  },
  userDetails: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  nickname: {
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginRight: SPACING.xs,
  },
  matchScoreBadge: {
    backgroundColor: COLORS.primary[10],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  matchScoreText: {
    fontSize: FONT_SIZE.c2,
    fontFamily: FONTS.bold,
    color: COLORS.primary[90],
  },
  userInfo: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
    color: COLORS.gray[50],
    marginBottom: 4,
  },
  reason: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
    color: COLORS.gray[60],
    lineHeight: 16,
  },
  actionContainer: {
    paddingLeft: SPACING.sm,
  },
});
