import { Button } from "@/shared/components";
import { COLORS, FONT_SIZE, FONTS, RADIUS, SPACING } from "@/shared/styles";
import type { RecommendUser } from "@/widgets/home/api";
import { router } from "expo-router";
import React from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";

interface UserDetailModalProps {
  visible: boolean;
  selectedUser: RecommendUser | null;
  onClose: () => void;
}

export function UserDetailModal({
  visible,
  selectedUser,
  onClose,
}: UserDetailModalProps) {
  return (
    <Modal
      onTouchCancel={onClose}
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            나와 {selectedUser?.matchScore}% 잘 맞아요!
          </Text>
          <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
            <View style={{ width: 62, height: 62, borderRadius: 100 }}>
              <Image
                source={
                  selectedUser?.profileImageUrl ||
                  require("@/assets/images/profile-default.png")
                }
                style={styles.userProfileCardImage}
              />
            </View>

            <View style={{ gap: 4 }}>
              <Text style={{ fontFamily: FONTS.bold, fontSize: FONT_SIZE.b2 }}>
                {selectedUser?.nickname}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: FONT_SIZE.c1,
                  color: COLORS.gray[50],
                }}
              >
                {selectedUser?.gender} {selectedUser?.age}{" "}
                {selectedUser?.smoking}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 40 }}>
            <Text>냄새 민감도</Text>
            <Text>정보 없음</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 40 }}>
            <Text>소음 민감도</Text>
            <Text>정보 없음</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 40 }}>
            <Text>청결도</Text>
            <Text>정보 없음</Text>
          </View>
          <View
            style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}
          >
            <Button
              text="닫기"
              variant="outline"
              size="lg"
              style={{
                width: (350 - SPACING.normal * 2) / 2,
              }}
              onPress={onClose}
            />
            <Button
              text="프로필 보러가기"
              size="lg"
              style={{ width: (350 - SPACING.normal * 2) / 2 }}
              onPress={() => {
                onClose();
                router.push(`/userDetail?userId=${selectedUser?.userId}`);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.normal,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.sm,
    padding: 20,
    gap: 20,
    width: 357,
  },
  modalTitle: {
    fontSize: FONT_SIZE.b1,
    fontFamily: FONTS.bold,
    color: COLORS.primary[90],
  },
  userProfileCardImage: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
});
