import { Skeleton } from "@/shared/components";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { UserProfile } from "@/shared/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UserListItemProps {
  user: UserProfile;
}

export default function UserListItem({ user }: UserListItemProps) {
  const {
    id,
    nickname,
    userProfileImage,
    gender,
    age,
    smoking,
    verified,
    certified,
    boosted,
  } = user;
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
            userProfileImage
              ? { uri: userProfileImage }
              : require("@/assets/images/profile-default.png")
          }
        />
        <View style={styles.userDetails}>
          <View style={styles.nameContainer}>
            <Text style={styles.nickname}>{nickname}</Text>
            {verified && (
              <View style={styles.badge}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={COLORS.primary[90]}
                />
              </View>
            )}
            {certified && (
              <View style={styles.badge}>
                <Ionicons
                  name="shield-checkmark"
                  size={16}
                  color={COLORS.primary[90]}
                />
              </View>
            )}
            {boosted && (
              <View style={styles.badge}>
                <Ionicons name="flash" size={16} color={COLORS.primary[90]} />
              </View>
            )}
          </View>
          <View style={styles.tagsContainer}>
            {[gender, `${age}세`, smokingText].map((item, index) => (
              <React.Fragment key={index + item.toString()}>
                <Text style={styles.tagText}>{item}</Text>
                {index !== [gender, `${age}세`, smokingText].length - 1 && (
                  <View style={styles.dotContainer}>
                    <View style={styles.dot} />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="heart-outline" size={24} color={COLORS.gray[50]} />
      </TouchableOpacity>
    </TouchableOpacity>
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
    borderRadius: 24,
  },
  userDetails: {
    height: 44,
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  nickname: {
    fontSize: FONT_SIZE.b1,
    lineHeight: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  badge: {
    marginLeft: 2,
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
