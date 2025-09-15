import { useLikeStore } from "@/shared/store/likeStore";
import { COLORS } from "@/shared/styles";
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
  smoking?: boolean;
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
                {gender}성・{age}세・{smoking ? "흡연" : "비흡연"}
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
    borderBottomColor: "#F2F2F2",
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
    backgroundColor: "#F2F2F2",
  },
  userDetails: {
    flex: 1,
    marginLeft: 12,
  },
  likeButton: {
    padding: 6,
  },
  name: {
    color: "#17171B",
    fontSize: 16,
    fontWeight: "700",
  },
  genderAge: {
    color: "#878789",
    fontSize: 12,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  description: {
    color: "#17171B",
    fontSize: 14,
    lineHeight: 21,
  },
});
