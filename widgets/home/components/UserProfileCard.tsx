import { Skeleton } from "@/shared/components";
import { COLORS, FONT_SIZE, FONTS, RADIUS } from "@/shared/styles";
import type { RecommendUser } from "@/widgets/home/api";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UserProfileCardProps extends RecommendUser {
  onPress: () => void;
}

export function UserProfileCard({
  nickname,
  profileImageUrl,
  matchScore,
  gender,
  age,
  smoking,
  onPress,
}: UserProfileCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.userProfileCard}>
      <Text style={styles.userProfileCardTitle}>
        나와 {matchScore}% 잘 맞아요!
      </Text>
      <View style={styles.userProfileInfoWrapper}>
        <Image
          source={
            profileImageUrl || require("@/assets/images/profile-default.png")
          }
          style={styles.userProfileCardImage}
        />
        <View>
          <Text style={styles.userProfileCardName}>{nickname}</Text>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {[gender, age, smoking].map((item, index) => (
              <React.Fragment key={index + item.toString()}>
                <Text
                  style={{
                    fontSize: FONT_SIZE.c1,
                    fontFamily: FONTS.regular,
                    color: COLORS.gray[50],
                  }}
                >
                  {item}
                </Text>
                {index !== [gender, age, smoking].length - 1 && (
                  <View style={{ justifyContent: "center" }}>
                    <View
                      style={{
                        width: 3,
                        height: 3,
                        backgroundColor: COLORS.gray[50],
                        borderRadius: 100,
                      }}
                    />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function RecommendSkeleton() {
  return (
    <View style={styles.recommendSkeletonContainer}>
      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index} style={styles.userProfileCard}>
          <Skeleton width={120} height={16} style={{ marginBottom: 17 }} />
          <View style={styles.userProfileInfoWrapper}>
            <Skeleton width={56} height={56} style={{ borderRadius: 28 }} />
            <View style={{ gap: 8 }}>
              <Skeleton width={80} height={16} />
              <Skeleton width={100} height={12} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  userProfileCard: {
    width: 200,
    padding: 20,
    borderRadius: RADIUS.xs,
    gap: 17,
    borderWidth: 1,
    borderColor: COLORS.gray[10],
    shadowColor: "#00000033",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userProfileCardTitle: {
    color: COLORS.primary[90],
    fontSize: FONT_SIZE.b1,
    fontFamily: FONTS.bold,
  },
  userProfileInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  userProfileCardImage: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
  userProfileCardName: {
    fontSize: FONT_SIZE.b2,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: "left",
  },
  recommendSkeletonContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
