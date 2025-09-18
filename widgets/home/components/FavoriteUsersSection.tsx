import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import type { UserProfile } from "@/shared/types";
import { UserListItem } from "@/widgets/home/components";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EmptyFavoriteUsersState } from "./EmptyStates";

interface FavoriteUsersSectionProps {
  likedUsers?: UserProfile[];
  isFetching: boolean;
}

export function FavoriteUsersSection({
  likedUsers,
  isFetching,
}: FavoriteUsersSectionProps) {
  return (
    <View style={{ marginTop: 28 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>내가 찜한 사용자</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => router.push("/users")}
        >
          <Text style={styles.moreButtonText}>더보기</Text>
          <Ionicons
            name="chevron-forward"
            size={12}
            color={COLORS.gray[40]}
            style={styles.moreButtonIcon}
          />
        </TouchableOpacity>
      </View>
      <View>
        {isFetching ? (
          <UserListItem.Skeleton />
        ) : likedUsers && likedUsers.length > 0 ? (
          likedUsers.map((user, index) => (
            <UserListItem key={`user-${user.id}-${index}`} user={user} />
          ))
        ) : (
          <EmptyFavoriteUsersState />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.normal,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.b1,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: "#17171b",
    textAlign: "left",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreButtonText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONTS.medium,
    color: COLORS.gray[40],
  },
  moreButtonIcon: {
    marginTop: 2,
  },
});
