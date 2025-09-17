import { useLikeStore } from "@/shared/store/likeStore";
import { COLORS, FONT_SIZE } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UserProfileSectionProps {
  userId: number;
  name: string;
  gender: string;
  age: number;
  description: string;
  avatarUri: string;
  smoking?: string;
}

export const UserDetailProfileSection: React.FC<UserProfileSectionProps> = ({
  userId,
  name,
  gender,
  age,
  description,
  avatarUri,
  smoking,
}) => {
  const { likedUsers, toggleLike } = useLikeStore();
  const isLiked = likedUsers[userId] ?? false;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileContent}>
          <View style={styles.userInfoRow}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />

            <View style={styles.userDetails}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.genderAge}>
                {gender}성・{age}세・{smoking}
              </Text>
            </View>

            {/* 좋아요 버튼 */}
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => toggleLike(userId)}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={28}
                color={isLiked ? COLORS.primary[100] : "#878789"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.white,
    width: "100%",
  },
  profileContainer: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  profileContent: {
    width: "100%",
  },
  userInfoRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray[5],
  },
  userDetails: {
    flex: 1,
    marginLeft: 12,
  },
  likeButton: {
    padding: 6,
  },
  name: {
    color: COLORS.black,
    fontSize: FONT_SIZE.b1,
    fontWeight: "700",
    marginBottom: 4,
  },
  genderAge: {
    color: COLORS.gray[50],
    fontSize: FONT_SIZE.c1,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  description: {
    color: COLORS.black,
    fontSize: FONT_SIZE.b2,
  },
});
