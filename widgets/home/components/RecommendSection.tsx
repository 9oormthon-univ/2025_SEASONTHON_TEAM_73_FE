import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import type { RecommendUser } from "@/widgets/home/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EmptyRecommendUsersState } from "./EmptyStates";
import { RecommendSkeleton, UserProfileCard } from "./UserProfileCard";

interface RecommendSectionProps {
  isRoom: boolean;
  userName: string;
  recommendedUsers?: RecommendUser[];
  isFetching: boolean;
  setIsModalVisible: (visible: boolean) => void;
  setSelectedUser: (user: RecommendUser) => void;
}

export function RecommendSection({
  isRoom,
  userName,
  recommendedUsers,
  isFetching,
  setIsModalVisible,
  setSelectedUser,
}: RecommendSectionProps) {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            추천 {isRoom ? "Joiner" : "Sharer"}
          </Text>
          <Text style={styles.sectionDescription}>
            {userName}님과 잘 맞을 것 같은 {isRoom ? "Joiner" : "Sharer"}를
            찾아왔어요.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => router.push("/users?type=recommend")}
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.userProfileCardWrapper}
        contentContainerStyle={{ gap: 16, flexDirection: "row" }}
      >
        {isFetching ? (
          <RecommendSkeleton />
        ) : recommendedUsers && recommendedUsers.length > 0 ? (
          recommendedUsers.map((user, index) => (
            <UserProfileCard
              key={`recommend-${user.userId}-${index}`}
              {...user}
              onPress={() => {
                setSelectedUser(user);
                setIsModalVisible(true);
                console.log(user);
              }}
            />
          ))
        ) : (
          <View style={{ width: "100%", justifyContent: "center" }}>
            <EmptyRecommendUsersState isRoom={isRoom} />
          </View>
        )}
      </ScrollView>
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
  sectionDescription: {
    fontSize: FONT_SIZE.c1,
    lineHeight: 18,
    fontFamily: FONTS.regular,
    color: COLORS.gray[50],
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
  userProfileCardWrapper: {
    paddingHorizontal: SPACING.normal,
  },
});
