import { Skeleton } from "@/shared/components";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { LikedUser } from "@/shared/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function UserListItem({
  nickname,
  gender,
  age,
  smoking,
}: LikedUser) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.profileImage}
          source={require("@/assets/images/profile-default.png")}
        />
        <View style={styles.userDetails}>
          <Text style={styles.nickname}>{nickname}</Text>
          <View style={styles.tagsContainer}>
            {[gender, age, smoking].map((item, index) => (
              <React.Fragment key={index + item.toString()}>
                <Text style={styles.tagText}>{item}</Text>
                {index !== [gender, age, smoking].length - 1 && (
                  <View style={styles.dotContainer}>
                    <View style={styles.dot} />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
      <Ionicons name="heart" size={24} color={COLORS.primary[90]} />
    </View>
  );
}

function FavoriteUsersSkeleton() {
  return (
    <View>
      {[1, 2, 3].map((index) => (
        <View
          key={index}
          style={{
            paddingHorizontal: SPACING.normal,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.gray[10],
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Skeleton width={48} height={48} radius={24} />
            <View
              style={{ height: 44, justifyContent: "space-between", gap: 8 }}
            >
              <Skeleton width={80} height={16} />
              <Skeleton width={120} height={12} />
            </View>
          </View>
          <Skeleton width={24} height={24} radius={12} />
        </View>
      ))}
    </View>
  );
}

UserListItem.Skeleton = FavoriteUsersSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.normal,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  profileImage: {
    width: 48,
    height: 48,
  },
  userDetails: {
    height: 44,
    justifyContent: "space-between",
  },
  nickname: {
    fontSize: FONT_SIZE.b1,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 6,
  },
  tagText: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.regular,
    color: COLORS.gray[50],
  },
  dotContainer: {
    justifyContent: "center",
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: COLORS.gray[50],
    borderRadius: 100,
  },
});
